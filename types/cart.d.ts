// interface Cart {
//   id: number;
//   items: { commodity: Commodity; id: number; quantity: number }[];
//   totalAmount: string;
// }

type CartCreate = {
  cart: {
    id: string;
    checkoutUrl: string;
  };
};
