'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Status } from "@/redux/modules/non-persist/alert-dialog/@types";
import { alertDialogSelector, closeDialog } from "@/redux/modules/non-persist/alert-dialog/alertDialogSlice";
import { useDispatch, useSelector } from "react-redux";

const AlertTextVariants = {
    'success': 'text-green-500',
    'error': 'text-red-500',
    'warning': 'text-yellow-500',
    'info': 'text-blue-500',
    'pending': 'text-green-500',
};

const AlertBgVariants = {
    'success': 'bg-green-500',
    'error': 'bg-red-500',
    'warning': 'bg-yellow-500',
    'info': 'bg-blue-500',
    'pending': 'bg-green-500',
};

export default function AlertDialogModal() {
    const dialogModal = useSelector(alertDialogSelector);
    const dispatch = useDispatch();

    //countdown
    if (dialogModal.open && dialogModal.countDown) {
        setTimeout(() => {
            dispatch(closeDialog());
            if (dialogModal.onConfirm) {
                dialogModal.onConfirm();
            }
        }, dialogModal.countDown);
    }

    return (
        <AlertDialog open={dialogModal.open} onOpenChange={(open) => { !open && dispatch(closeDialog()); }}>

            {
                dialogModal.status !== 'pending' ? (
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                <div className={`w-full h-full flex ${dialogModal.cancelText ? 'justify-start' : 'justify-center'} items-center gap-4`}>
                                    <span className={`text-lg font-semibold ${AlertTextVariants[dialogModal.status as Status]}`}>
                                        {dialogModal.title}
                                    </span>
                                </div>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className={`w-full h-full flex ${dialogModal.cancelText ? 'justify-start' : 'justify-center'} items-center gap-4`}>
                                    <span className={`text-muted-foreground`}>
                                        {dialogModal.content}
                                    </span>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <div className={`flex ${dialogModal.cancelText ? 'justify-end' : 'justify-center'} items-center w-full gap-4`}>
                                {
                                    dialogModal.cancelText && <AlertDialogCancel className="hover:bg-red-500 hover:text-white">{dialogModal.cancelText}</AlertDialogCancel>
                                }
                                {
                                    dialogModal.confirmText && <AlertDialogAction className={`text-white ${AlertBgVariants[dialogModal.status as Status]}`} onClick={dialogModal.onConfirm}>{dialogModal.confirmText}</AlertDialogAction>

                                }
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                ) : (
                    <AlertDialogContent className="flex flex-col justify-center items-center">
                        <AlertDialogHeader>
                            <div className="loader m-auto" />
                            <AlertDialogTitle>
                                <div className={`w-full h-full flex ${dialogModal.cancelText ? 'justify-start' : 'justify-center'} items-center gap-4`}>
                                    <span className={`text-lg font-semibold ${AlertTextVariants[dialogModal.status as Status]}`}>
                                        {dialogModal.title}
                                    </span>
                                </div>
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                )
            }
        </AlertDialog>

    );
}