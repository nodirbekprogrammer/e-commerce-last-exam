import { UseFormReset } from "react-hook-form";

import { create } from "zustand";

import { request } from "@/server/request";
import { toast } from "react-toastify";
import Universal from "@/types/universal";

interface initialStateTypes {
  user: Universal;
  loading: boolean;
  passwordLoad: boolean;
  getUser: (reset: UseFormReset<Universal>) => void;
  updateAccount: (values: object, reset: UseFormReset<Universal>) => void;
  updatePassword: (values: object, reset: UseFormReset<Universal>) => void;
}

const useAccount = create<initialStateTypes>()((set, get) => {
  const setState = (newState: object) => {
    return set((state) => ({ ...state, ...newState }));
  };

  return {
    user: {} as Universal,
    loading: false,
    passwordLoad: false,
    getUser: async (reset) => {
      try {
        setState({ loading: true });
        const { data } = await request.get<Universal>("auth/me");
        setState({
          user: data,
        });
        console.log(data);
        
        reset(data);
      } finally {
        setState({ loading: false });
      }
    },
    updateAccount: async (values, reset) => {
      try {
        setState({ loading: true });
        await request.put("auth/update", values);
        toast.success("Changes successfully saved!");
        get().getUser(reset);
      } finally {
        setState({ loading: false });
      }
    },
    updatePassword: async (values, reset) => {
      try {
        setState({ passwordLoad: true });
        await request.put("auth/password", values);
        toast.success("Passwrd successfully changes!");
        reset({ username: "", currentPassword: "", newPassword: "" });
      } finally {
        setState({ passwordLoad: false });
      }
    },
  };
});

export default useAccount;
