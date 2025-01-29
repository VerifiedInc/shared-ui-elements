import { useMutation } from '@tanstack/react-query';

type Request = { zipcode: string };

type Response = {
  state: string;
  city: string;
  country: string;
  zipcode: string;
};

export function useZipCodeLookup() {
  return useMutation<Response, Error, Request>({
    mutationKey: ['zipcode-lookup'],
    mutationFn: async function handleMutation({ zipcode }: any) {
      const formData = new FormData();
      formData.set('zipcode', zipcode);

      // TODO - add api route to handle the address lookup.
      const response = await fetch('/api/address-lookup', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.data as Response;
    },
  });
}
