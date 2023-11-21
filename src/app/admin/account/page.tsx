"use client";

import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import Universal from "@/types/universal";
import useAccount from "@/states/public/account";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import useAuth from "@/states/auth";
import { useRouter } from "next/navigation";
import "./style.scss";

const AccountPage = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<Universal>({
    mode: "onTouched",
  });
  const router = useRouter();

  const { logout } = useAuth();

  const { loading, getUser, updateAccount } = useAccount();

  useEffect(() => {
    getUser(reset);
  }, [getUser, reset]);

  const submit = async (values: Universal) => {
    updateAccount(values, reset);
  };

  return (
    <div className="container">
      <div className="accountPage">
        <div className="formBox">
          {loading ? (
            "Yuklanyapti..."
          ) : (
            <Fragment>
              <div className="user-info">
                <form onSubmit={handleSubmit(submit)} className="accountForm">
                  <h2>Ma'lumotlar</h2>
                  <div className="inputBox">
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "This field must not be empty!",
                      })}
                      style={{
                        borderBottom: `3px solid ${
                          errors.firstName ? "red" : "black"
                        }`,
                      }}
                    />
                    {errors.firstName ? (
                      <p style={{ color: "red" }}>
                        {errors.firstName?.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      {...register("lastName", {
                        required: "This field must not be empty!",
                      })}
                      style={{
                        borderBottom: `3px solid ${
                          errors.lastName ? "red" : "black"
                        }`,
                      }}
                    />
                    {errors.lastName ? (
                      <p style={{ color: "red" }}>{errors.lastName?.message}</p>
                    ) : null}
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      {...register("username", {
                        required: "This field must not be empty!",
                      })}
                      style={{
                        borderBottom: `3px solid ${
                          errors.username ? "red" : "black"
                        }`,
                      }}
                    />
                    {errors.username ? (
                      <p style={{ color: "red" }}>{errors.username?.message}</p>
                    ) : null}
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      {...register("phoneNumber", {
                        required: "This field must not be empty!",
                      })}
                      style={{
                        borderBottom: `3px solid ${
                          errors.phoneNumber ? "red" : "black"
                        }`,
                      }}
                    />
                    {errors.phoneNumber ? (
                      <p style={{ color: "red" }}>
                        {errors.phoneNumber?.message}
                      </p>
                    ) : null}
                  </div>
                  <button type="submit">Submit</button>
                </form>
                <div className="changePassword">
                  <div>
                    <h2>Password</h2>
                    <ChangePasswordForm />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
