import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import { wrapPromise } from '../../../../../../../utils';

import { useOneClickFormOptions } from '../../../../contexts/one-click-form-options.context';

export type Address = {
  line1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country: string;
};

export function useAutoFill(): {
  handleAutoComplete: (value: string) => Promise<void>;
  buildAddress: (place: google.maps.places.Place) => Address;
  suggestions: google.maps.places.AutocompleteSuggestion[];
  isPending: boolean;
} {
  const oneClickFormOptions = useOneClickFormOptions();
  const [library, setLibrary] = useState<google.maps.PlacesLibrary>();
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);
  const [isPending, setIsPending] = useState(false);

  const buildAddress = (place: google.maps.places.Place): Address => {
    const address: Address = {
      line1: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    };

    // Get each component of the address from the place details,
    for (const component of place?.addressComponents ?? []) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number': {
          address.line1 = `${component.longText} ${address.line1}`;
          break;
        }

        case 'route': {
          if (!address.line1) {
            address.line1 = '';
          }
          address.line1 += component.shortText;
          break;
        }

        case 'postal_code': {
          address.zipCode = `${component.longText}${address.zipCode}`;
          break;
        }

        case 'postal_code_suffix': {
          address.zipCode = `${address.zipCode}-${component.longText}`;
          break;
        }

        case 'locality':
          address.city = component.longText ?? '';
          break;

        case 'administrative_area_level_1': {
          // Ensure the state is a 2-letter code complying with ISO 3166-2
          if (component.shortText && component.shortText.length === 2) {
            address.state = component.shortText;
          }
          break;
        }

        case 'country':
          address.country = component.shortText ?? 'US';
          break;
      }
    }

    return address;
  };

  const handleAutoComplete = async (value: string): Promise<void> => {
    if (!library) return;

    const { AutocompleteSessionToken, AutocompleteSuggestion } = library;

    // Add an initial request body.
    const request: google.maps.places.AutocompleteRequest = {
      input: value,
      language: 'en-US',
      includedRegionCodes: ['us'],
      region: 'us',
    };

    // Create a session token.
    const token = new AutocompleteSessionToken();
    // Add the token to the request.
    request.sessionToken = token;

    setIsPending(true);

    // Fetch autocomplete suggestions.
    const promise =
      AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
    const [result, error] = await wrapPromise(promise);

    if (!error) {
      setSuggestions(result.suggestions);
    }

    setIsPending(false);
  };

  // Initialize the Google Maps API
  useEffect(() => {
    if (!oneClickFormOptions.options.apiKeys.googlePlacesApiKey) return;

    const loader = new Loader({
      apiKey: oneClickFormOptions.options.apiKeys.googlePlacesApiKey,
      version: 'weekly',
    });

    const init = async (): Promise<void> => {
      const library = await loader.importLibrary('places');
      setLibrary(library);
    };

    init().catch(console.error);
  }, []);

  return { handleAutoComplete, buildAddress, suggestions, isPending };
}
