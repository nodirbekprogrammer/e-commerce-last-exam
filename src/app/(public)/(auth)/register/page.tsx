import PublicRegisterForm from "@/components/sections/register/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon | Register",
  description: "Amazon website Register side",
};

const Register = () => {
  return (
    <PublicRegisterForm/>
  );
};

export default Register;
