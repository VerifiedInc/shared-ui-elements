import { useEffect, useMemo, useRef, useState } from 'react';
import QRCodeStyling, { FileExtension, Options } from 'qr-code-styling';

export type StyledQRCodeOptions = {
  className?: string;
  options?: Options;
};

/**
 * Custom hook for generating styled QR codes.
 * @param options - Options for the QR code.
 * @param className - Optional className for the QR code component.
 * @returns
 */
export function useStyledQRCode({ options, className }: StyledQRCodeOptions) {
  function buildOptions(options?: Options): Options {
    return {
      width: options?.width ?? 300,
      height: options?.height ?? 300,
      type: options?.type ?? 'svg',
      data: options?.data,
      image: options?.image,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
        ...options?.qrOptions,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 20,
        ...options?.imageOptions,
      },
      dotsOptions: {
        color: '#000000',
        type: 'square',
        ...options?.dotsOptions,
      },
      cornersSquareOptions: options?.cornersSquareOptions,
      cornersDotOptions: options?.cornersDotOptions,
      backgroundOptions: {
        color: '#ffffff',
        ...options?.backgroundOptions,
      },
    };
  }

  const [qrCodeOptions] = useState<Options>(buildOptions(options));
  const [qrCode] = useState(new QRCodeStyling(qrCodeOptions));
  const ref = useRef<HTMLDivElement>(null);

  // Memoize the component to prevent unnecessary re-renders
  const Component = useMemo(() => {
    const QRComponent = () => <div className={className} ref={ref} />;
    return QRComponent;
  }, [className]);

  // Get raw data of the QR code
  const getRawData = async (extension: FileExtension) => {
    return await qrCode.getRawData(extension);
  };

  // Download the QR code
  const download = async (name: string, extension: FileExtension) => {
    await qrCode.download({ name, extension });
  };

  // Append QR code to the ref
  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  // Update QR code when options change
  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(buildOptions(options));
  }, [qrCode, options]);

  return { Component, getRawData, download };
}
