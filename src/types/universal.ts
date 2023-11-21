interface Universal {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
  map: (func: object) => void;
}

export default Universal;
