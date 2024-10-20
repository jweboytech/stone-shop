interface User {
  firstName: string;
  id: number;
  lastName: string;
  token: string;
  email: string;
  defaultAddress: Address;
}

interface Address {
  city: string;
  country: string;
  createAt: string;
  id: number;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
  updateAt: string;
}
