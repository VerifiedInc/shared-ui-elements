type QRCodeHookOptions = {
    size: number;
    imageSize: number;
    data: string;
    fill?: string;
};
export declare function useQRCode(hookOptions: QRCodeHookOptions): string;
export {};
