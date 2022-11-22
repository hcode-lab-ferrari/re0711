import { format, parse } from "date-fns";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../utils/session";
import { ScheduleSession } from "../../../types/ScheduleSession";

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const services = req.body.services
      .map((id: any) => Number(id))
      .filter((id: number) => !isNaN(id));

    if (services.length === 0) {
      res.status(400).send({
        message: "Selecione pelo menos um serviço.",
      });
      return;
    }

    const schedule = {
      ...(req.session.schedule ?? {}),
      services,
    } as ScheduleSession;

    req.session.schedule = schedule;
    await req.session.save();
    res.status(200).json(req.session.schedule);
  },
  sessionOptions
);
