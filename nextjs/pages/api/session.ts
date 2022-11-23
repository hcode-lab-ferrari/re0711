import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../utils/session";

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.session;

    if (token) {
      res.status(200).send({
        token,
      });
    } else {
      req.session.destroy();
      await req.session.save();
      res.status(401);
    }
  },
  sessionOptions
);
