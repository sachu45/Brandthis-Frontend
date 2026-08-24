import type { MouseEvent, ReactNode } from 'react';

interface ModalOverlayProps {
  onClose: () => void;
  cardClassName?: string;
  children: ReactNode;
}

/**
 * Dimmed backdrop plus centred card. Clicking the backdrop itself closes the
 * modal; clicks inside the card do not bubble out to it.
 */
export function ModalOverlay({
  onClose,
  cardClassName = 'modal-card',
  children,
}: ModalOverlayProps) {
  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={cardClassName}>{children}</div>
    </div>
  );
}
