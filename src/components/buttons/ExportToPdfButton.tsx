import React, { useCallback } from 'react';
import { PictureAsPdf } from '@mui/icons-material';
import { CircularProgress, IconButton, IconButtonProps } from '@mui/material';

/**
 * A button that exports the content of a target element to a PDF file.
 * Uses html-to-image + jsPDF instead of html2canvas for CSP compliance
 * (html2canvas clones the DOM into an iframe, which violates nonce-based CSP).
 *
 * @param {string} targetId - The ID of the target element to export. Without the # symbol.
 * @param {string} filename - The name of the file to export. Without the .pdf extension.
 * @param {IconButtonProps} buttonProps - The props to pass to the button.
 */

export interface ExportToPdfButtonProps extends IconButtonProps {
  targetId: string | React.RefObject<HTMLElement>;
  filename?: string;
  children?: React.ReactNode;
  resolution?: number;
}

export const ExportToPdfButton: React.FC<ExportToPdfButtonProps> = ({
  targetId,
  filename = 'file',
  resolution,
  sx,
  ...buttonProps
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGeneratePdf = useCallback(() => {
    setIsGenerating(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        void (async () => {
          try {
            const element =
              typeof targetId === 'string'
                ? document.getElementById(targetId)
                : targetId?.current;

            if (!element) {
              setIsGenerating(false);
              return;
            }

            const pixelRatio = resolution ?? 2;

            // Dynamically import to avoid blocking the main thread
            const [{ toPng }, { jsPDF }] = await Promise.all([
              import('html-to-image'),
              import('jspdf'),
            ]);

            // Expand capture area to include overflowing content (e.g. chart axis labels)
            const rect = element.getBoundingClientRect();
            const overflow = 20;
            const dataUrl = await toPng(element, {
              pixelRatio,
              width: rect.width + overflow * 2,
              height: rect.height + overflow * 2,
              style: {
                margin: `${overflow}px`,
              },
            });

            // Create an image to get dimensions
            const img = new Image();
            img.src = dataUrl;
            await new Promise<void>((resolve) => {
              img.onload = () => resolve();
            });

            const margin = 10;
            // Scale image to fit PDF page with margins
            const pdfWidth = img.width / pixelRatio;
            const pdfHeight = img.height / pixelRatio;
            const orientation = pdfWidth > pdfHeight ? 'landscape' : 'portrait';
            // eslint-disable-next-line new-cap
            const pdf = new jsPDF({
              orientation,
              unit: 'px',
              format: [pdfWidth + margin * 2, pdfHeight + margin * 2],
            });

            pdf.addImage(dataUrl, 'PNG', margin, margin, pdfWidth, pdfHeight);
            pdf.save(`${filename}.pdf`);
          } catch (error) {
            console.error('Failed to generate PDF:', error);
          } finally {
            setIsGenerating(false);
          }
        })();
      }, 600); // Small delay to ensure UI updates first, otherwise it blocks the loading animation
    });
  }, [filename, targetId, resolution]);

  return (
    <span>
      <IconButton
        onClick={handleGeneratePdf}
        disabled={isGenerating}
        sx={{
          m: '0 !important',
          ...sx,
        }}
        {...buttonProps}
      >
        {isGenerating ? (
          <CircularProgress size={24} />
        ) : buttonProps.children ? (
          buttonProps.children
        ) : (
          <PictureAsPdf />
        )}
      </IconButton>
    </span>
  );
};
