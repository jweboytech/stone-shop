interface Order {
  cardBrand: string;
  cardLast: string;
  createAt: string;
  deliveryMethod: string;
  email: string;
  id: number;
  metadata: Cart;
  orderId: string;
  status: 'PAYMENT_SUCCEEDED';
  totalAmount: string;
  updateAt: string;
  shipping: {
    id: number;
    name: string;
    phone: string;
    address: {
      city: string;
      country: string;
      id: number;
      line1: string;
      line2: string;
      postalCode: string;
      state: string;
    };
  };
}
