interface CountrySelectorProps {
    value: string;
    onChange: (value: string) => void;
    shouldShowOnlyNorthAmericanCountries?: boolean;
}
/**
 * Component that renders and allows to manage the desired phone country format.
 * @constructor
 */
export default function CountrySelector({ shouldShowOnlyNorthAmericanCountries, ...props }: Readonly<CountrySelectorProps>): React.JSX.Element;
export {};
