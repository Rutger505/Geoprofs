import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

interface User {
  id: number;
  name: string;
  email: string;
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: (errors: any[]) => void;
}

interface LoginProps {
  email: string;
  password: string;
  setErrors: (errors: any[]) => void;
}

interface ForgotPasswordProps {
  email: string;
  setErrors: (errors: any[]) => void;
  setStatus: (status: string | null) => void;
}

interface ResetPasswordProps {
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: (errors: any[]) => void;
  setStatus: (status: string | null) => void;
}

interface UseAuthProps {
  middleware?: "auth" | "guest";
  redirectIfAuthenticated?: string;
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: UseAuthProps = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate: fetchUser,
  } = useSWR<User>("/auth/user", () =>
    axios.get("/auth/user").then((res) => res.data),
  );

  const csrf = () => axios.get("/auth/csrf-cookie");

  const login = async ({ setErrors, ...props }: LoginProps) => {
    await csrf();

    setErrors([]);

    axios
      .post("/auth/login", props)
      .then(() => fetchUser())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: ForgotPasswordProps) => {
    await csrf();

    setErrors([]);

    axios
      .post("/auth/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }: ResetPasswordProps) => {
    await csrf();

    setErrors([]);

    axios
      .post("/auth/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/auth/login?reset=" + btoa(response.data.status)),
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const logout = async () => {
    await axios.post("/auth/logout").then(() => fetchUser());

    router.push("/login");
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    if (middleware === "auth" && error) logout();
  }, [user, error, middleware, redirectIfAuthenticated, router]);

  return {
    user,
    login,
    forgotPassword,
    resetPassword,
    logout,
  };
};
