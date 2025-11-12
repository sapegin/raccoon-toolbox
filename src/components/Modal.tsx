import { type ReactNode, useEffect, useRef } from 'react';
import { Box, styled, VisuallyHidden } from '../../styled-system/jsx';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

interface ModalProps {
  id: string;
  label: string;
  isOpen: boolean;
  children: ReactNode;
  showCloseButton?: boolean;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
  dialogRef?: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}

const StyledBox = styled('dialog', {
  base: {
    position: 'fixed',
    top: '10vh',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
    padding: 1,
    border: 0,
    backgroundColor: 'uiBackground',
    backgroundImage:
      'linear-gradient(to bottom, oklch(from var(--colors-ui-background) calc(l + 0.15) c h), var(--colors-ui-background))',
    borderRadius: 'dialog',
    boxShadow: '0 0 1rem #0002',
    overflow: 'hidden',
    _backdrop: {
      backgroundColor: '#0006',
    },
  },
});

export function Modal({
  id,
  label,
  isOpen,
  onClose,
  children,
  showCloseButton = false,
  width = '90%',
  maxWidth = '600px',
  maxHeight = '80vh',
  dialogRef: externalDialogRef,
}: ModalProps) {
  const internalDialogRef = useRef<HTMLDialogElement>(null);
  const dialogRef = externalDialogRef ?? internalDialogRef;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) {
      return;
    }

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) {
      return;
    }

    const handleClose = () => {
      if (dialog.open === false) {
        onClose();
      }
    };

    dialog.addEventListener('close', handleClose);

    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  return (
    <StyledBox
      ref={dialogRef}
      id={id}
      aria-labelledby={`${id}-label`}
      width={width}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      closedby="any"
    >
      <Box bgColor="uiBackground" borderRadius="dialogInner">
        {showCloseButton && (
          <IconButton
            label="Close"
            onClick={onClose}
            css={{
              position: 'absolute',
              top: 's',
              right: 's',
              zIndex: 1,
            }}
          >
            <Icon icon="xmark" size={24} />
          </IconButton>
        )}
        <VisuallyHidden as="h1" id={`${id}-label`}>
          {label}
        </VisuallyHidden>
        {children}
      </Box>
    </StyledBox>
  );
}
