import { useRouter } from "next/router";
import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../types/User";

export type FormDataRegister = {
  email: string;
  name: string;
  birthAt: string;
  password: string;
  passwordConfirm: string;
};

export type FormDataLogin = {
  email: string;
  password: string;
};

export type FormDataReset = {
  password: string;
  token: string;
};

type AuthForm = "email" | "login" | "register" | "forget" | "reset";

type FormEmailResponse = {
  exists: boolean;
};

export type AuthenticationResponse = {
  token: string;
};

export type FormRegisterResponse = AuthenticationResponse;
type FormLoginResponse = AuthenticationResponse;
type FormForgetResponse = { success: boolean };
type FormResetResponse = AuthenticationResponse;

type AuthContextProps = {
  currentForm: AuthForm;
  email: string;
  setEmail: (email: string) => void;
  onSubmitEmail: (e: React.FormEvent<HTMLFormElement>) => void;
  onSubmitRegister: (data: FormDataRegister) => void;
  onSubmitLogin: (data: FormDataLogin) => void;
  onSubmitForget: () => void;
  onSubmitReset: (data: FormDataReset) => void;
  resetToken: string;
  logout: () => void;
  token: string | null;
  user: User | null;
  loadingFormForget: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  currentForm: "email",
  email: "",
  setEmail: () => {},
  onSubmitEmail: () => {},
  onSubmitRegister: () => {},
  onSubmitLogin: () => {},
  onSubmitForget: () => {},
  onSubmitReset: () => {},
  resetToken: "",
  logout: () => {},
  token: null,
  user: null,
  loadingFormForget: false,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState<AuthForm>("email");
  const [email, setEmail] = useState("");
  const [nextURL, setNextURL] = useState("/profile");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingFormForget, setLoadingFormForget] = useState(false);

  const getHashForm = useCallback((): AuthForm => {
    let hash = window.location.hash.replace("#", "") as AuthForm;

    if (
      !["email", "login", "register", "forget", "reset"].includes(hash) ||
      (["login", "forget"].includes(hash) && !email)
    ) {
      hash = "email";
    }

    return hash;
  }, [email]);

  const redirectToNextURL = useCallback(() => router.push(nextURL), [nextURL]);

  const onSubmitEmail = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      axios
        .post<FormEmailResponse>(
          "auth",
          {
            email,
          },
          {
            baseURL: process.env.API_URL,
          }
        )
        .then(({ data }) => {
          if (data.exists) {
            setCurrentForm("login");
          } else {
            setCurrentForm("register");
          }
        })
        .catch(console.error);
    },
    [email]
  );

  const onSubmitRegister = (formData: FormDataRegister) => {
    axios
      .post<FormRegisterResponse>("api/register", formData)
      .then(({ data }) => {
        setToken(data.token);
        redirectToNextURL();
      })
      .catch(console.error);
  };

  const onSubmitLogin = (formData: FormDataLogin) => {
    axios
      .post<FormLoginResponse>("api/login", formData)
      .then(({ data }) => {
        setToken(data.token);
        redirectToNextURL();
      })
      .catch(console.error);
  };

  const onSubmitForget = useCallback(() => {
    setLoadingFormForget(true);
    axios
      .post<FormForgetResponse>(
        "auth/forget",
        { email },
        {
          baseURL: process.env.API_URL,
        }
      )
      .then(({ data }) => {
        console.info("E-mail enviado.");
      })
      .catch(console.error)
      .finally(() => setLoadingFormForget(false));
  }, [email]);

  const onSubmitReset = (formData: FormDataReset) => {
    axios
      .post<FormResetResponse>("api/reset", formData)
      .then(({ data }) => {
        setToken(data.token);
        redirectToNextURL();
      })
      .catch(console.error);
  };

  const handleCurrentForm = useCallback(() => {
    setCurrentForm(getHashForm());
  }, [setCurrentForm, getHashForm]);

  const logout = () => {
    axios.get("/api/logout").then(() => {
      setToken(null);
      setUser(null);
      router.push("/auth");
    });
  };

  const initAuth = () => {
    axios
      .get<AuthenticationResponse>("/api/session")
      .then(({ data }) => setToken(data.token))
      .catch(console.error);
  };

  useEffect(() => {
    if (token) {
      try {
        const { id, name, email, photo, personId } = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        );
        setUser({
          id,
          email,
          photo,
          personId,
          person: {
            id: personId,
            name,
          },
        });
      } catch (e) {
        console.error("Not parse User from token");
      }
    }
  }, [token]);

  useEffect(() => {
    window.addEventListener("load", handleCurrentForm);
    router.events.on("hashChangeComplete", handleCurrentForm);

    return () => {
      window.removeEventListener("load", handleCurrentForm);
      router.events.off("hashChangeComplete", handleCurrentForm);
    };
  }, [handleCurrentForm, router]);

  useEffect(() => {
    initAuth();

    const params = new URLSearchParams(window.location.search);

    if (params.has("next")) {
      setNextURL(String(params.get("next")));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentForm,
        email,
        setEmail,
        onSubmitEmail,
        onSubmitRegister,
        onSubmitLogin,
        onSubmitForget,
        onSubmitReset,
        resetToken: router.query.token as string,
        logout,
        token,
        user,
        loadingFormForget,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
