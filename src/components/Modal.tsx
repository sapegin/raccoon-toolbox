import { type ReactNode, useEffect, useRef } from 'react';
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
    <dialog
      ref={dialogRef}
      id={id}
      aria-labelledby={`${id}-label`}
      closedby="any"
      className="
        fixed top-[10vh] left-1/2 m-0 -translate-x-1/2 overflow-hidden
        rounded-dialog border-0 bg-text-background
        bg-[linear-gradient(to_bottom,oklch(from_var(--color-ui-background)_calc(l+0.15)_c_h),var(--color-ui-background))]
        p-px shadow-[0_0_1rem_#0002]
        backdrop:bg-[#0006]
      "
      style={{ width, maxWidth, maxHeight }}
    >
      <div className="rounded-dialog-inner bg-ui-background">
        {showCloseButton && (
          <IconButton
            label="Close"
            onClick={onClose}
            className="absolute top-2 right-2 z-1"
          >
            <Icon icon="xmark" className="size-5.5" />
          </IconButton>
        )}
        <h1 className="sr-only" id={`${id}-label`}>
          {label}
        </h1>
        {children}
      </div>
    </dialog>
  );
}
