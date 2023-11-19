"use client";

import Link from "next/link";
import "./style.scss";
import Image from "next/image";
import { request } from "@/server/request";
import Cookies from "js-cookie";
import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";

import useAuth from "@/states/auth";
import { USER_DATA, USER_TOKEN } from "@/constants";
import { useRouter } from "next/navigation";
import ROLES from "@/types/roles";

import loginBackground from "@/assets/images/login.png";

const PublicLoginForm = () => {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const userData = {
        username: data.get("username"),
        password: data.get("password"),
      };

      const {
        data: { accesstoken, user },
      } = await request.post("auth/login", userData);
      toast.success("You are logged in !");
      setIsAuthenticated(user);
      localStorage.setItem(USER_DATA, JSON.stringify(user));
      Cookies.set(USER_TOKEN, accesstoken);
      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;
      if (user.role === ROLES.ADMIN) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="login-page">
      <div className="login__main">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit} className="login__form">
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
          <button type="submit" className="login__btn">
            Login
          </button>
        </form>
        <p>
          No have an account yet? <Link href="/register">Register</Link>
        </p>
      </div>
    </section>
  );
};

export default PublicLoginForm;
