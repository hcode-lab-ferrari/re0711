import { GetServerSidePropsContext, PreviewData, Redirect } from "next";
import { ParsedUrlQuery } from "querystring";
export default function redirectToAuth(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  return {
    redirect: {
      destination: `/auth?next=${encodeURIComponent(
        String(context.resolvedUrl)
      )}`,
    } as Redirect,
  };
}
