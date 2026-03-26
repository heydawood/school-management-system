// utils/toast.ts
import { toast as sonnerToast } from 'sonner';

export const customToast = {
  success: (message: string) =>
    sonnerToast.success(message, {
      style: { background: '#d1fadf', color: '#027a48', border: 'none' },
    }),

  error: (message: string) =>
    sonnerToast.error(message, {
      style: { background: '#fee2e2', color: '#b91c1c', border: 'none' },
    }),

  warning: (message: string) =>
    sonnerToast(message, {
      style: { background: '#fef9c3', color: '#92400e', border: 'none' },
    }),

  info: (message: string) =>
    sonnerToast(message, {
      style: { background: '#dbeafe', color: '#1e40af', border: 'none' },
    }),
};
