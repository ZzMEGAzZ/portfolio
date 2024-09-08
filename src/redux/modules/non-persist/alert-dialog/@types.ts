export type Status = 'success' | 'error' | 'warning' | 'info' | 'pending';

export interface DialogModal {
    open: boolean;
    title: string;
    content: string;
    status: Status;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    countDown?: 3000 | 5000 | 10000 | number;
}