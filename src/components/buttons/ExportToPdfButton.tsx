import { PictureAsPdf } from '@mui/icons-material';
import { CircularProgress, IconButton, IconButtonProps } from '@mui/material';
import React, { useCallback } from 'react';

/**
 * A button that exports the content of a target element to a PDF file.
 *
 * @param {string} targetId - The ID of the target element to export. Without the # symbol.
 * @param {string} filename - The name of the file to export. Without the .pdf extension.
 * @param {IconButtonProps} buttonProps - The props to pass to the button.
 */

export interface ExportToPdfButtonProps extends IconButtonProps {
  targetId: string | React.RefObject<HTMLElement>;
  filename?: string;
  children?: React.ReactNode;
}

export const ExportToPdfButton: React.FC<ExportToPdfButtonProps> = ({
  targetId,
  filename = 'file',
  sx,
  ...buttonProps
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGeneratePdf = useCallback(() => {
    // Set loading state
    setIsGenerating(true);
    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          // Dynamically import the PDF generator to prevent it from blocking the main thread
          void import('react-to-pdf')
            .then(async (module) => {
              const generatePDF = module.default;
              // The function needs a function that returns the element, not the element itself
              await generatePDF(
                () =>
                  typeof targetId === 'string'
                    ? document.getElementById(targetId)
                    : (targetId as any),
                {
                  filename: `${filename}.pdf`,
                  page: { margin: 10 },
                },
              );
            })
            .finally(() => {
              setIsGenerating(false);
              console.log('updated pdf');
            });
        } catch (error) {
          setIsGenerating(false);
        }
      }, 600); // Small delay to ensure UI updates first, otherwise it blocks the loading animation
    });
  }, [filename, targetId]);

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
