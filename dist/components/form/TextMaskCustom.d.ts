export type ChangeEvent = (event: {
    target: {
        name: string;
        value: string;
    };
}, nativeEvent?: InputEvent) => void;
interface TextMaskCustomProps {
    onChange: ChangeEvent;
    name: string;
    mask: string;
    definitions?: Record<string, RegExp>;
    useOnComplete?: boolean;
}
export declare const TextMaskCustom: import('react').ForwardRefExoticComponent<TextMaskCustomProps & import('react').RefAttributes<HTMLInputElement>>;
export {};
