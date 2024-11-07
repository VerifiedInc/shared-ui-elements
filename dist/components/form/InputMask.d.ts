import { ChangeEventHandler, ReactNode } from 'react';
interface Selection {
    start: string;
    end: string;
}
interface State {
    value: string;
    selection: Selection;
}
interface BeforeMaskedStateChangeOptions {
    previousState: State;
    currentState: State;
    nextState: State;
}
interface InputMaskProps {
    children: ReactNode;
    mask: string | Array<RegExp | string>;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur?: ChangeEventHandler<HTMLInputElement>;
    beforeMaskedStateChange?: (options: BeforeMaskedStateChangeOptions) => void;
    maskPlaceholder?: string | null;
    alwaysShowMask?: boolean;
    disabled?: boolean;
}
export declare function InputMask(props: Readonly<InputMaskProps>): React.JSX.Element;
export {};
