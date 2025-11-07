import { useEffect, useRef, type ReactNode } from 'react';
import { styled, VisuallyHidden } from '../../styled-system/jsx';
import { IconButton } from './IconButton';
import { Icon } from './Icon';

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

const StyledDialog = styled('dialog', {
  base: {
    position: 'fixed',
    top: '10vh',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
    padding: 0,
    backgroundColor: 'uiBackground',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'lightBorder',
    borderRadius: 'xlarge',
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
    <StyledDialog
      ref={dialogRef}
      id={id}
      aria-labelledby={`${id}-label`}
      width={width}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      closedby="any"
    >
      {showCloseButton && (
        <IconButton
          label="Close"
          onClick={onClose}
          css={{
            position: 'absolute',
            top: 'm',
            right: 'm',
            zIndex: 1,
          }}
        >
          <Icon icon="xmark" size={20} />
        </IconButton>
      )}
      <VisuallyHidden as="h1" id={`${id}-label`}>
        {label}
      </VisuallyHidden>
      {children}
    </StyledDialog>
  );
}
