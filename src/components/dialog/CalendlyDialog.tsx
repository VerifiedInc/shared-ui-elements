import { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { PersistentDialog } from './PersistentDialog';
export interface CalendlyDialogRef {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  isOpen: boolean;
}

interface CalendlyDialogProps {
  calendlyUrl: string;
}

export const CalendlyDialogComponent = forwardRef<
  CalendlyDialogRef,
  CalendlyDialogProps
>(({ calendlyUrl }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsOpen(true);
    },
    hide: () => {
      setIsOpen(false);
    },
    toggle: () => {
      setIsOpen(!isOpen);
    },
    isOpen,
  }));

  return (
    <PersistentDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <iframe
        src={calendlyUrl}
        style={{
          height: '800px',
          width: '500px',
          maxWidth: '90vw',
          maxHeight: '85vh',
          border: 'none',
          borderRadius: '5px',
        }}
      />
    </PersistentDialog>
  );
});

CalendlyDialogComponent.displayName = 'CalendlyDialog';

export const CalendlyDialog = memo(CalendlyDialogComponent);
