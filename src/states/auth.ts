import { request } from "@/server/request";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { create } from "zustand";
import Cookies from "js-cookie";
import { TOKEN, ROLE } from "@/constants";
import { toast } from "react-toastify";
import UniversalData from "@/types/universalData";

interface initialState {
  loading: boolean;
  total: number;
  allData: UniversalData[];
  payLoading: boolean;
  isAuth: boolean;
  role: string | null;
  getAllData: () => void;
  login: (values: object, router: AppRouterInstance) => void;
  signUp: (values: object, router: AppRouterInstance) => void;
  logout: (router: AppRouterInstance) => void;
}

const useAuth = create<initialState>()((set, get) => ({
  loading: false,
  total: 0,
  allData: [],
  payLoading: false,
  isAuth: Boolean(Cookies.get(TOKEN)),
  role: Cookies.get(ROLE) || null,
  login: async (values, router) => {
    try {
      set({ loading: true });
      const {
        data: {
          user: { role },
          accesstoken,
        },
      } = await request.post("auth/login", values);

      Cookies.set(ROLE, role);
      Cookies.set(TOKEN, accesstoken);

      set({ isAuth: true, role });

      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;

      if (role === 0) {
        router.push("/");
        toast.success("Successfully logged in!");
      } else {
        router.push("/admin");
        toast.success("Successfully logged in!");
      }
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (values, router) => {
    try {
      set({ loading: true });
      const {
        data: {
          user: { role },
          accesstoken,
        },
      } = await request.post("auth/register", values);

      Cookies.set(ROLE, role);
      Cookies.set(TOKEN, accesstoken);

      set({ isAuth: true, role });

      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;

      router.push("/");
      toast.success("Successfully registered!");
    } finally {
      set({ loading: false });
    }
  },
  logout: (router) => {
    Cookies.remove(ROLE);
    Cookies.remove(TOKEN);

    set({ isAuth: false, role: null });

    router.push("/");
  },
  getAllData: async () => {
    const { isAuth } = get();
    if (isAuth) {
      try {
        set({ payLoading: true });
        const { data } = await request.get("auth/payments");
        set({ allData: data, total: data.length });
      } finally {
        set({ payLoading: false });
      }
    }
  },
}));

export default useAuth;
