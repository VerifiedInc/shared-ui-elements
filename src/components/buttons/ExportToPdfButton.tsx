import { PictureAsPdf } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import generatePDF, { Margin } from 'react-to-pdf';

/**
 * A button that exports the content of a target element to a PDF file.
 *
 * @param {string} targetId - The ID of the target element to export. Without the # symbol.
 * @param {string} filename - The name of the file to export. Without the .pdf extension.
 * @param {ButtonProps} buttonProps - The props to pass to the button.
 */

export interface ExportToPdfButtonProps extends ButtonProps {
  targetId: string;
  filename?: string;
  children: React.ReactNode;
}

export const ExportToPdfButton: React.FC<ExportToPdfButtonProps> = ({
  targetId,
  filename = 'file',
  ...buttonProps
}) => {
  const getTargetElement = () => document.getElementById(targetId);

  return (
    <Button
      onClick={() => {
        void generatePDF(getTargetElement, {
          filename: `${filename}.pdf`,
          page: { margin: Margin.MEDIUM },
        });
      }}
      startIcon={<PictureAsPdf />}
      {...buttonProps}
    >
      {buttonProps.children}
    </Button>
  );
};
