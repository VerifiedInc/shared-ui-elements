import { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export type Address = {
  line1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export function useAutoFill({
  inputRef,
  handlePrefill,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  handlePrefill: (address: Address) => void;
}): any {
  const buildAddress = (place: any): Address => {
    const address: Address = {
      line1: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    };

    // Get each component of the address from the place details,
    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number': {
          address.line1 = `${component.long_name} ${address.line1}`;
          break;
        }

        case 'route': {
          address.line1 += component.short_name;
          break;
        }

        case 'postal_code': {
          address.zipCode = `${component.long_name}${address.zipCode}`;
          break;
        }

        case 'postal_code_suffix': {
          address.zipCode = `${address.zipCode}-${component.long_name}`;
          break;
        }

        case 'locality':
          address.city = component.long_name;
          break;

        case 'administrative_area_level_1': {
          address.state = component.short_name;
          break;
        }

        case 'country':
          address.country = component.short_name;
          break;
      }
    }

    return address;
  };

  useEffect(() => {
    if (!inputRef.current) return;

    console.log(inputRef.current);

    const loader = new Loader({
      apiKey: 'AIzaSyBWsfG2Ggi07ZQT-njpwqFh4yU3ZI0p5r0',
      version: 'weekly',
    });
    loader.importLibrary('places').then((library) => {
      const autocomplete = new library.Autocomplete(inputRef.current, {
        componentRestrictions: { country: ['us', 'ca'] },
        fields: ['address_components'],
        types: ['address'],
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        handlePrefill(buildAddress(place));
      });
    });
  }, []);
}
