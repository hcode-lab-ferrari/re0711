import { AxiosError } from "axios";
import Router from "next/router";

type ServerErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};

export function catchErrorClient(
  catchFunction?: (error: AxiosError<ServerErrorResponse>) => void
) {
  return (error: AxiosError<ServerErrorResponse>) => {
    if (error.response?.data?.error === "Unauthorized") {
      Router.push(`/auth?next=${Router.pathname}`);
    }

    return typeof catchFunction === "function"
      ? catchFunction(error)
      : () => {};
  };
}
