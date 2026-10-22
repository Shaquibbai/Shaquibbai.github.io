import React, { useEffect, useRef } from 'react';

export interface SheetOptions {
  kind: 'letter' | 'plate' | 'note' | 'drawer' | 'box' | 'screen' | 'folder' | 'binder' | 'blueprint' | 'report' | 'notebook' | 'floppy';
  cover?: string | null;
  stamp?: string | null;
  html: string;
  onClose?: () => void;
  onAction?: (action: string) => void;
}

interface SheetModalProps {
  sheet: SheetOptions | null;
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
  onAction?: (action: string) => void;
  onProjectSelect?: (projectId: string) => void;
}

export const SheetModal: React.FC<SheetModalProps> = ({
  sheet,
  isOpen,
  isClosing,
  onClose,
  onAction,
  onProjectSelect
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isClosing) {
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus({ preventScroll: true });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isClosing]);

  if (!isOpen || !sheet) return null;

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-close]')) {
      onClose();
      return;
    }

    const projBtn = target.closest('[data-proj]') as HTMLElement | null;
    if (projBtn) {
      const projId = projBtn.dataset.proj;
      if (projId && onProjectSelect) {
        onProjectSelect(projId);
        return;
      }
    }

    const actBtn = target.closest('[data-act]') as HTMLElement | null;
    if (actBtn) {
      const act = actBtn.dataset.act;
      if (act && onAction) {
        onAction(act);
      }
    }
  };

  const isBinder = sheet.kind === 'binder';

  return (
    <div
      id="sheet"
      className={isClosing ? 'closing' : ''}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shT"
      onClick={handleContainerClick}
    >
      <div className="shScrim" data-close="1" />
      <div className={`shStage ${isBinder ? 'bind' : ''}`} ref={stageRef}>
        <div className="paper" data-kind={sheet.kind}>
          <button
            type="button"
            className="shClose"
            data-close="1"
            aria-label="Close"
            ref={closeBtnRef}
          >
            Close <kbd>Esc</kbd>
          </button>

          {sheet.cover !== undefined && sheet.cover !== null && (
            <div className="cover" data-t={sheet.cover} aria-hidden="true" />
          )}

          {sheet.stamp && (
            <div className="stamp" aria-hidden="true">
              {sheet.stamp}
            </div>
          )}

          <div
            className="shBody"
            dangerouslySetInnerHTML={{ __html: sheet.html }}
          />
        </div>
      </div>
    </div>
  );
};
