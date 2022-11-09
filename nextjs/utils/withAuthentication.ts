import { withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import redirectToAuth from "./redirectToAuth";
import { sessionOptions } from "./session";
export default function withAuthentication<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr((context) => {
    const { token } = context.req.session;

    try {
      if (!token) {
        throw new Error("Unauthorized");
      }

      const data = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );

      if (data.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }

      return handler(context);
    } catch (error) {
      return redirectToAuth(context);
    }
  }, sessionOptions);
}
