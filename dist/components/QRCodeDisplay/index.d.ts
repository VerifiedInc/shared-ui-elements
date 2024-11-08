export interface QRCodeDisplayProps {
    data: string;
    asset?: string;
    svgSize?: number;
    logoSize?: number;
    fill?: string;
}
export declare function QRCodeDisplay({ data, asset, svgSize, logoSize, fill, }: QRCodeDisplayProps): import("react").JSX.Element;
