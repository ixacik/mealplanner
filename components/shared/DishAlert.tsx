"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DishAlertProps = {
  functionToCall: (params: any) => void;
  paramForFunction: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DishAlert = ({
  functionToCall,
  paramForFunction,
  open,
  onOpenChange,
}: DishAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Changing your plan will clear your shopping list state.
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              localStorage.clear();
              functionToCall(paramForFunction);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DishAlert;
