import { useMemo } from 'react';

import * as QRCode from 'qrcode';

type QRCodeHookOptions = {
  size: number;
  imageSize: number;
  data: string;
  fill?: string;
};

export function useQRCode(hookOptions: QRCodeHookOptions) {
  const qrcode = useMemo(
    () => QRCode.create(hookOptions.data),
    [hookOptions.data],
  );

  // Data array of 1s and 0s
  const dataArray = qrcode.modules.data;

  return useMemo(() => {
    // Size of each square in the grid
    const squareSize = hookOptions.size / Math.sqrt(dataArray.length);

    // Create an SVG element
    let svg = `<svg viewBox="0 0 ${hookOptions.size} ${hookOptions.size}" xmlns="http://www.w3.org/2000/svg">`;

    // Define the logo size and position
    const imageSize = hookOptions.imageSize;
    const logoX = (hookOptions.size - imageSize) / 2;
    const logoY = (hookOptions.size - imageSize) / 2;

    // Loop through the data array and draw rectangles based on the values
    for (let i = 0; i < dataArray.length; i++) {
      // Get position to draw the circle
      const x = (i % Math.sqrt(dataArray.length)) * squareSize;
      const y = Math.floor(i / Math.sqrt(dataArray.length)) * squareSize;
      // Calculate the radius
      const radius = squareSize / 2;

      // Check if the current position should be painted black
      const shouldPaint = dataArray[i] === 1;

      // Check if the current position is within the logo area
      const isLogoArea =
        x + squareSize >= logoX &&
        x < logoX + imageSize &&
        y + squareSize >= logoY &&
        y < logoY + imageSize;

      // No need to paint white, this will improve performance a lot.
      if (!shouldPaint || isLogoArea) continue;

      // Create a rounded rectangle element and append to svg string
      svg += `<rect x="${x}" y="${y}" width="${squareSize}" height="${squareSize}" rx="${radius}" ry="${radius}" fill='${hookOptions.fill || '#000000'}' />`;
    }

    svg += '</svg>';

    return svg;
  }, [dataArray, hookOptions]);
}
