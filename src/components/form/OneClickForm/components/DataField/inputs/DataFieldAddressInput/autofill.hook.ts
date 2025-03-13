import { useState, useRef } from 'react';

import { wrapPromise } from '../../../../../../../utils';

import { useOneClickFormOptions } from '../../../../contexts/one-click-form-options.context';

import { Address, PlaceAddressComponent, PlaceSuggestion } from './types';

type AutoFillHookReturn = {
  handleAutoComplete: (value: string) => Promise<void>;
  fetchPlace: (placeId: string) => Promise<PlaceAddressComponent[] | null>;
  buildAddress: (placeComponents: PlaceAddressComponent[]) => Address;
  suggestions: PlaceSuggestion[];
  isPending: boolean;
};

export function useAutoFill(): AutoFillHookReturn {
  const oneClickFormOptions = useOneClickFormOptions();
  const { googlePlacesAutocompletePlaces, googlePlacesGetPlace } =
    oneClickFormOptions.options.servicePaths ?? {};
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isPending, setIsPending] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const buildAddress = (placeComponents: PlaceAddressComponent[]): Address => {
    const address: Address = {
      line1: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    };

    // Get each component of the address from the place details,
    for (const component of placeComponents ?? []) {
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

        case 'sublocality_level_1':
        case 'sublocality':
          // Only set city from sublocality if locality hasn't already set it
          if (!address.city) {
            address.city = component.longText ?? '';
          }
          break;

        case 'neighborhood':
          // Use neighborhood as a last resort if no locality or sublocality
          if (!address.city) {
            address.city = component.longText ?? '';
          }
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
    if (!googlePlacesAutocompletePlaces) return;

    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsPending(true);

    try {
      const response = await fetch(googlePlacesAutocompletePlaces, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: value }),
        signal: abortController.signal,
      });

      // If the request was aborted, don't proceed
      if (abortController.signal.aborted) {
        return;
      }

      if (!response.ok) {
        setIsPending(false);
        return;
      }

      const [result, error] = await wrapPromise<PlaceSuggestion[]>(
        response.json(),
      );

      // Check again if aborted after the json parsing
      if (abortController.signal.aborted) {
        return;
      }

      if (!error) {
        setSuggestions(result);
      }
    } catch (error) {
      // If the error is due to abortion, we can silently ignore it
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      // Otherwise, handle other errors
      console.error('Failed to fetch address suggestions:', error);
    } finally {
      // Only clear isPending if this is still the most recent request
      if (abortControllerRef.current === abortController) {
        setIsPending(false);
      }
    }
  };

  const fetchPlace = async (
    placeId: string,
  ): Promise<PlaceAddressComponent[] | null> => {
    if (!googlePlacesGetPlace) return null;

    const response = await fetch(googlePlacesGetPlace, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: placeId }),
    });

    if (!response.ok) {
      return null;
    }

    const [result, error] = await wrapPromise(response.json());

    if (!error) {
      return result;
    }

    return null;
  };

  return {
    handleAutoComplete,
    fetchPlace,
    buildAddress,
    suggestions,
    isPending,
  };
}
