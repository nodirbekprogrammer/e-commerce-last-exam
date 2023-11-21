"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./style.scss";
import LoadingButton from "@mui/lab/LoadingButton";

import useAuth from "@/states/public/auth";
import { useRouter } from "next/navigation";
import { request } from "@/server/request";
import Cookies from "js-cookie";
import ROLES from "@/types/roles";
import { toast } from "react-toastify";
import { TOKEN, USER_DATA } from "@/constants";

const PublicLoginForm = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const userData = {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      };
      console.log(userData);

      const {
        data: { accesstoken, user },
      } = await request.post(`auth/login`, userData);
      setIsAuthenticated(user);
      
      localStorage.setItem(USER_DATA, JSON.stringify(user));
      Cookies.set(TOKEN, accesstoken);
      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;
      if (user.role === ROLES.ADMIN) {
        toast.success("Tizimga admin sifatida kirildi!");
        router.push("/admin");
      } else {
        router.push("/");
        toast.success(
          "Qadrli mijoz, tizimga kirish muvaffaqiyatli amalga oshirildi!"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login__main">
        <h2>Log In</h2>
        <form onSubmit={login} className="login__form">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <LoadingButton
            size="large"
            loading={loading}
            variant="contained"
            type="submit"
            sx={{ width: "100%", marginTop: "20px" }}
          >
            <span>Login</span>
          </LoadingButton>
        </form>
        <p>
          No have an account yet? <Link href="/register">Register</Link>
        </p>
      </div>
    </section>
  );
};

export default PublicLoginForm;
