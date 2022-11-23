import { NextPage, Redirect } from 'next';
import { Fragment } from 'react';
import Footer, { BackButton } from '../components/Page/Footer';
import Head from '../components/Head';
import Header from '../components/Home/Header';
import Page from '../components/Page';
import { useRouter } from 'next/router';
import Toast from '../components/Toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import  withAuthentication  from '../utils/withAuthentication';
import { format, parseJSON } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import {formatCurrency}  from '../utils/formatCurrency';
import { Schedule } from '../types/Schedule';
import { ScheduleSession } from '../types/ScheduleSession';
import axios from 'axios';
import { catchErrorClient } from '../utils/catchErrorClient';
import { get } from 'lodash';

type FormData = {
  server?: unknown;
};

type ComponentPageProps = {
  data: Schedule;
  schedule: ScheduleSession;
  token: string;
};

const ComponentPage: NextPage<ComponentPageProps> = ({
  data,
  schedule,
  token,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = () => {
    axios
      .post(`/payment/${data.id}`, null, {
        baseURL: process.env.API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => router.push('/schedules-complete'))
      .catch(
        catchErrorClient((e) => setError('server', { message: e.message }))
      );
  };

  return (
    <Fragment>
      <Head />
      <Header />
      <Page
        pageColor="blue"
        title={
          <Fragment>
            Resumo do Pedido<small>Confira os detalhes do pedido</small>
          </Fragment>
        }
        id="schedules-summary"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input
              type="text"
              name="payment"
              id="payment"
              value={
                schedule.paymentTypeId === 'CREDIT_CARD'
                  ? 'Cartão de Crédito'
                  : 'Cartão de Débito'
              }
              readOnly
            />
            <label htmlFor="payment">Forma de Pagamento</label>
          </div>

          <div className="field">
            <input
              type="text"
              name="creditcard"
              id="creditcard"
              value={
                schedule?.cardFirstSixDigits +
                ' **** ' +
                schedule?.cardLastFourDigits
              }
              readOnly
            />
            <label htmlFor="creditcard">Cartão Final</label>
          </div>

          <div className="field">
            <input
              type="text"
              name="installments"
              id="installments"
              value={
                data.installments === 1 ? 'à vista' : `${data.installments}x`
              }
              readOnly
            />
            <label htmlFor="installments">Parcelas</label>
          </div>

          <div className="field">
            <input
              type="text"
              name="services"
              id="services"
              value={data.ScheduleService?.length ?? 0}
              readOnly
            />
            <label htmlFor="services">Quantidade de Serviços</label>
          </div>

          <div className="field">
            <input
              type="text"
              name="schedule_at"
              id="schedule_at"
              value={format(
                parseJSON(String(data.scheduleAt)),
                "d 'de' MMMM 'de' yyyy",
                { locale }
              )}
              readOnly
            />
            <label htmlFor="schedule_at">Data do Serviço</label>
          </div>

          <div className="field">
            <input
              type="text"
              name="total"
              id="total"
              value={formatCurrency(Number(data.total) ?? 0)}
              readOnly
            />
            <label htmlFor="total">Valor Total</label>
          </div>
          <Toast
            type="danger"
            open={Object.keys(errors).length > 0}
            onClose={() => clearErrors()}
          >
            {Object.keys(errors).map((key) => (
              <p key={key}>{get(errors, `${key}.message`)}&nbsp;</p>
            ))}
          </Toast>
          <Footer
            buttons={[
              BackButton,
              {
                type: 'submit',
                value: 'Confirmar',
              },
            ]}
          />
        </form>
      </Page>
    </Fragment>
  );
};
export default ComponentPage;

export const getServerSideProps = withAuthentication(async ({ req }) => {
  const { schedule, token } = req.session;
  const { data } = schedule;

  if (!data) {
    return {
      redirect: {
        destination: '/schedules-payment',
      } as Redirect,
    };
  }

  return { props: { data, schedule, token } };
});
