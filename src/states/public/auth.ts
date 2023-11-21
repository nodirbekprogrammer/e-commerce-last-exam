import { create } from "zustand";
import Cookies from "js-cookie";
import { TOKEN, ROLE, USER_DATA } from "@/constants";
import { UserType } from "@/types/user";

// interface AuthStates {
//   isAuth: boolean;
//   role: string | null;
//   loading: boolean;
//   login: (values: object, router: AppRouterInstance) => void;
//   signUp: (values: object, router: AppRouterInstance) => void;
//   logout: (router: AppRouterInstance) => void;
// }

// const useAuth = create<AuthStates>()((set, get) => ({
//   loading: false,
//   isAuth: Boolean(Cookies.get(TOKEN)),
//   role: Cookies.get(ROLE) || null,
//   login: async (values, router) => {
//     try {
//       set({ loading: true });
//       const {
//         data: { user, accesstoken },
//       } = await request.post("auth/login", values);

//       Cookies.set(ROLE, user?.role);
//       Cookies.set(TOKEN, accesstoken);

//       set({ isAuth: true });

//       request.defaults.headers.Authorization = `Bearer ${accesstoken}`;

//       if (user?.role === 0) {
//         router.push("/");
//         toast.success("Qadrli mijoz, tizimga muvaffaqiyatli kirdingiz!");
//       } else {
//         router.push("/admin");
//         toast.success("Tizimga admin sifatida kirildi!");
//       }
//     } finally {
//       set({ loading: false });
//       // window.location.reload();
//     }
//   },
//   signUp: async (values, router) => {
//     try {
//       set({ loading: true });
//       const {
//         data: {
//           user: { role },
//           accesstoken,
//         },
//       } = await request.post("auth/register", values);

//       Cookies.set(ROLE, role);
//       Cookies.set(TOKEN, accesstoken);

//       set({ isAuth: true, role });

//       request.defaults.headers.Authorization = `Bearer ${accesstoken}`;

//       router.push("/");
//       toast.success("Successfully registered!");
//     } finally {
//       set({ loading: false });
//     }
//   },
//   logout: (router) => {
//     Cookies.remove(ROLE);
//     Cookies.remove(TOKEN);

//     set({ isAuth: false, role: null });

//     router.push("/");
//   },
// }));

// export default useAuth;

interface AuthState {
  isAuthenticated: boolean;
  user: UserType | null;
  setIsAuthenticated: (user?: UserType | null) => void;
}

const userJson = typeof window !== "undefined" ? localStorage.getItem(USER_DATA) : false;
const user = userJson ? JSON.parse(userJson) : null;

const useAuth = create<AuthState>()((set, get) => ({
  isAuthenticated: Boolean(Cookies.get(TOKEN)) || false,
  user,
  setIsAuthenticated: (user = null) => {
    const { isAuthenticated } = get();
    set({ isAuthenticated: !isAuthenticated, user });
  },
}));

export default useAuth;
