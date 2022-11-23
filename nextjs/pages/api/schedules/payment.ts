import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { Schedule } from "../../../types/Schedule";
import { ScheduleSession } from "../../../types/ScheduleSession";
import { sessionOptions } from "../../../utils/session";
import { ScheduleCreate } from "../../schedules-payment";

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body.cardToken) {
      res.status(400).send({
        message: "Cartão não disponível para pagamento.",
      });
      return;
    }

    if (!req.body.installments) {
      res.status(400).send({
        message: "Selecione a quantidade de parcelas.",
      });
      return;
    }

    const {
      cardToken,
      installments,
      paymentMethodId: paymentMethod,
      cardDocument: document,
    } = req.body as ScheduleCreate;
    const { services, scheduleAt, billingAddressId, timeOptionId } =
      req.session.schedule;

    try {
      const { data } = await axios.post<Schedule>(
        "/payment",
        {
          timeOptionId,
          billingAddressId,
          scheduleAt,
          services,
          installments,
          cardToken,
          paymentMethod,
          document,
        },
        {
          baseURL: process.env.API_URL,
          headers: {
            Authorization: `Bearer ${req.session.token}`,
          },
        }
      );

      const schedule = {
        ...(req.session.schedule ?? {}),
        cardFirstSixDigits: req.body.cardFirstSixDigits,
        cardLastFourDigits: req.body.cardLastFourDigits,
        paymentTypeId: req.body.paymentTypeId,
        data,
      } as ScheduleSession;

      req.session.schedule = schedule;
      await req.session.save();
      res.status(200).json(req.session.schedule);
    } catch (error: any) {
      res.status(400).send({
        message: error.response.data.message ?? error.message,
      });
      return;
    }
  },
  sessionOptions
);
