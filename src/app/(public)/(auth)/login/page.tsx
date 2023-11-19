import PublicLoginForm from "@/components/sections/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon | Login",
  description: "Amazon website Login side",
};

const Login = () => {
  return <PublicLoginForm />;
};

export default Login;
