import { ResponsiveDialog } from "@/components/common/responsive-dialog";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";
interface UseConfirmProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const useConfirm = ({
  title,
  description,
  children,
}: UseConfirmProps): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveDialog
        title={title}
        description={description}
        open={promise !== null}
        onOpenChange={handleClose}
      >
        <div className="w-full">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base">{description}</p>
            {children}
          </div>
          <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-center lg:justify-end">
            <Button
              onClick={handleCancel}
              variant={"outline"}
              className="lg:w-auto w-full"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="w-full lg:w-auto">
              Confirm
            </Button>
          </div>
        </div>
      </ResponsiveDialog>
    );
  };
  return [ConfirmationDialog, confirm];
};
