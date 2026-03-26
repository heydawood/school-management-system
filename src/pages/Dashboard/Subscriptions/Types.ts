export interface SubscriptionItem {
  itemId: string;
  itemName: string;
  isActive: boolean;
}
export interface GetSubscriptions {
  planId: number;
  planName: string;
  price: string;
  isActive: boolean;
  items: SubscriptionItem[];
}
