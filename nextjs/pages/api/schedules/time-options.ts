import { format, parse } from "date-fns";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../utils/session";
import { ScheduleSession } from "../../../types/ScheduleSession";

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const schedule = {
      ...(req.session.schedule ?? {}),
      timeOptionId: Number(req.body.timeOptionId),
    } as ScheduleSession;

    req.session.schedule = schedule;
    await req.session.save();
    res.status(200).json(req.session.schedule);
  },
  sessionOptions
);
