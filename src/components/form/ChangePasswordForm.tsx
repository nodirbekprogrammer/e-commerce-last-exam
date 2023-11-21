import { useForm } from "react-hook-form";
import Universal from "@/types/universal";
import useAccount from "@/states/public/account";

const ChangePasswordForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<Universal>({
    mode: "onTouched",
  });

  const { updatePassword, passwordLoad } = useAccount();

  const submit = async (values: Universal) => {
    updatePassword(values, reset);
  };

  const password = watch("currentPassword");

  return (
    <div>
      {passwordLoad ? (
        "Yuklanmoqda..."
      ) : (
        <form onSubmit={handleSubmit(submit)} className="accountForm">
          <div className="inputBox">
            <input
              type="password"
              {...register("currentPassword", {
                required: "Please enter the current password!",
                minLength: {
                  value: 5,
                  message: "Password`s minimal length must be 5",
                },
              })}
              placeholder="Current password"
              style={{
                borderBottom: `3px solid ${
                  errors.currentPassword ? "red" : "black"
                }`,
              }}
            />
            {errors.currentPassword ? (
              <p style={{ color: "red" }}>{errors.currentPassword?.message}</p>
            ) : null}
          </div>

          <div className="inputBox">
            <input
              type="password"
              {...register("newPassword", {
                required: "Please enter the new password!",
                minLength: {
                  value: 5,
                  message: "Password`s minimal length must be 5",
                },
                validate: (value) =>
                  value !== password || "The passwords must not be same!",
              })}
              placeholder="New password"
              style={{
                borderBottom: `3px solid ${
                  errors.newPassword ? "red" : "black"
                }`,
              }}
            />
            {errors.newPassword ? (
              <p style={{ color: "red" }}>{errors.newPassword?.message}</p>
            ) : null}
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ChangePasswordForm;
