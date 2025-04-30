import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Portal } from '@mui/material';
import React, { useEffect, useRef } from 'react';

/**
 * A dialog that mounts regardless of the modal state.
 * It handles escape key and phone back button presses.
 *
 * This component is useful for scenarios where you need to load in the background, e.g. rendering an iframe.
 *
 * @param isOpen - Whether the dialog is open.
 * @param setIsOpen - Function to set the dialog state.
 * @param children - The content of the dialog.
 * @param hasCloseButton - Whether to show a close button.
 */
export const PersistentDialog = ({
  isOpen,
  setIsOpen,
  children,
  hasCloseButton = true,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  hasCloseButton?: boolean;
}) => {
  // identify escape key or phone back button press and close modal
  useEffect(() => {
    // Handle keyboard Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Handle phone back button
    const handlePopState = () => {
      if (isOpen) {
        // Prevent default back behavior if modal is open
        window.history.pushState(null, '', window.location.pathname);
        setIsOpen(false);
      }
    };

    // Add state to history when modal opens
    if (isOpen) {
      window.history.pushState(null, '', window.location.pathname);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen]);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the click is outside the content
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <Portal>
      {/* Modal is always mounted, but is hidden when not open */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 1000,
        }}
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          console.log(e);
          if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hasCloseButton && (
            <IconButton
              aria-label='close'
              onClick={() => setIsOpen(false)}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                },
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
          <div
            ref={contentRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
