export type Option = {
  title: string;
  value: string;
};

export type Address = {
  line1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country: string;
};

export type PlaceAddressComponent = {
  types: string[];
  longText: string;
  shortText: string;
  languageCode: string;
};

export type PlaceSuggestion = {
  placePrediction: {
    text: {
      text: string;
    };
    place: string;
  };
};
