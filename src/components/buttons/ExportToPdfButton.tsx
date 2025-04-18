import { PictureAsPdf } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import React from 'react';
import generatePDF, { Margin } from 'react-to-pdf';

/**
 * A button that exports the content of a target element to a PDF file.
 *
 * @param {string} targetId - The ID of the target element to export. Without the # symbol.
 * @param {string} filename - The name of the file to export. Without the .pdf extension.
 * @param {ButtonProps} buttonProps - The props to pass to the button.
 */

export interface ExportToPdfButtonProps extends IconButtonProps {
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
    <IconButton
      onClick={() => {
        void generatePDF(getTargetElement, {
          filename: `${filename}.pdf`,
          page: { margin: Margin.MEDIUM },
        });
      }}
      {...buttonProps}
    >
      {buttonProps.children ? buttonProps.children : <PictureAsPdf />}
    </IconButton>
  );
};
