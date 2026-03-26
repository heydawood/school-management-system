export interface PaymentUser {
  userId: string;
  name: string;
  phone: string;
  phoneCountryCode: string;
}
export interface GetPaymentTypes {
  userPaymentId: number;
  transactionId: string;
  paidAmount: string;
  paymentDate: Date;
  paymentStatus: 'PAID' | 'FAILED';
  receiptUrl: string;
  planName: string;
  user: PaymentUser;
}

export interface PaymentDetailResponse {
  user: User;
  transactionDetails: TransactionDetails;
  subscriptionDetails: SubscriptionDetails;
}

export interface User {
  name: string;
  email: any;
  phoneCountryCode: string;
  phone: string;
  country: string;
  startDate: string;
  endDate: string;
}

export interface TransactionDetails {
  transactionId: string;
  paymentDate: string;
  amount: string;
  currency: any;
  status: string;
  systemError: any;
}

export interface SubscriptionDetails {
  planName: string;
  paymentGateWay: string;
}

export interface PaymentPlans {
  planId: number;
  planName: string;
}
