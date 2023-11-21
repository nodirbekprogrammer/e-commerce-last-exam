interface UniversalData {
  _id: string;
  title: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: { _id: string; name: string };
  createdAt: string;
  sold: number;
  newQuantity: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  comment: string;
  userId: string;
  status: string;
  cart: Array<object>;
  image: {
    url: string | undefined;
    public_id: string;
  };
}

export default UniversalData;
