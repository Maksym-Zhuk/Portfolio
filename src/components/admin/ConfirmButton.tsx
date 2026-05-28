'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from '@/components/ui/button';

type ConfirmButtonProps = {
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  children: React.ReactNode;
} & Pick<React.ComponentProps<'button'>, 'className' | 'disabled' | 'aria-label'> &
  VariantProps<typeof buttonVariants>;

export function ConfirmButton({
  onConfirm,
  title,
  description,
  confirmLabel = 'Delete',
  children,
  variant = 'ghost',
  size,
  ...buttonProps
}: ConfirmButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" variant={variant} size={size} {...buttonProps} onClick={() => setOpen(true)}>
        {children}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono">{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
            >
              {confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
