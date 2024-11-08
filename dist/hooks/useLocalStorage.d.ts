export declare function useLocalStorage(key: string): {
    set: (value: any) => void;
    get: () => any;
    remove: () => void;
};
