import { useEffect } from "react";
import useAuth from "@/states/public/auth";
import { usePathname, useRouter } from "next/navigation";
import ROLES from "@/types/roles";

const useAuthCheck = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated) {
      if (
        pathname.startsWith("/admin") && user?.role
          ? user?.role === ROLES.USER
          : false
      ) {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router, user, pathname]);
};

export default useAuthCheck;
