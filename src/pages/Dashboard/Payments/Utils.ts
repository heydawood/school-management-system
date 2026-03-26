export const getPaymentStatusBadge = (status: 'PAID' | 'FAILED') => {
  const statusMap: Record<string, string> = {
    PAID: 'bg-primary-25 text-primary-800 hover:bg-primary-50',
    FAILED: 'bg-error-25 text-error-800 hover:bg-error-50',
  };

  const baseClasses = "inline-flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:rounded-full";

  const dotMap: Record<string, string> = {
    PAID: 'before:bg-primary-800',
    FAILED: 'before:bg-error-800',
  };

  return `${baseClasses} ${statusMap[status]} ${dotMap[status]}`;
};
