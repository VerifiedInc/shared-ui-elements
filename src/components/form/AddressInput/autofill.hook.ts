import { useState, useRef } from 'react';

import { wrapPromise } from '../../../utils';

import { useAddressInputContext } from './context';

import { Address, PlaceAddressComponent, PlaceSuggestion } from './types';

type AutoFillHookReturn = {
  handleAutoComplete: (value: string) => Promise<void>;
  fetchPlace: (
    placeId: string,
    signal?: AbortSignal,
  ) => Promise<PlaceAddressComponent[] | null>;
  buildAddress: (placeComponents: PlaceAddressComponent[]) => Address;
  suggestions: PlaceSuggestion[];
  isPending: boolean;
};

export function useAutoFill(): AutoFillHookReturn {
  const { googlePlacesAutocompletePlaces, googlePlacesGetPlace } =
    useAddressInputContext();
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
      if (!googlePlacesAutocompletePlaces) {
        setIsPending(false);
        return;
      }

      const [result, autoCompleteError] = await wrapPromise(
        googlePlacesAutocompletePlaces(value, abortController.signal),
      );

      // If the request was aborted, don't proceed
      if (abortController.signal.aborted) {
        return;
      }

      if (!result || autoCompleteError) {
        setIsPending(false);
        return;
      }

      // Add type validation before casting
      if (Array.isArray(result)) {
        setSuggestions(result as PlaceSuggestion[]);
      } else {
        // Bad implementation, return empty array
        setSuggestions([]);
      }
    } catch (error) {
      // If the error is due to abortion, we can silently ignore it
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
    } finally {
      // Only clear isPending if this is still the most recent request
      if (abortControllerRef.current === abortController) {
        setIsPending(false);
      }
    }
  };

  const fetchPlace = async (
    placeId: string,
    signal?: AbortSignal,
  ): Promise<PlaceAddressComponent[] | null> => {
    if (!googlePlacesGetPlace) return null;

    const [result, getPlaceError] = await wrapPromise(
      googlePlacesGetPlace(placeId, signal),
    );

    if (getPlaceError) {
      return null;
    }

    // Add type validation before casting
    if (result && Array.isArray(result)) {
      return result as PlaceAddressComponent[];
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
