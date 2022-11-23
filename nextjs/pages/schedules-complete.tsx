import { NextPage, Redirect } from 'next';
import { Fragment } from 'react';
import Head from '../components/Head';
import Header from '../components/Home/Header';
import Page from '../components/Page';
import Title from '../components/Page/Title';
import Footer from '../components/Page/Footer';
import  withAuthentication from '../utils/withAuthentication';
import axios from 'axios';
import { Schedule } from '../types/Schedule';
import { ScheduleSession } from '../types/ScheduleSession';

type ComponentPageProps = {
  data: Schedule;
  schedule: ScheduleSession;
};

type PageValues = {
  color: 'green';
  title: string;
};

const ComponentPage: NextPage<ComponentPageProps> = ({ data, schedule }) => {
  const getPageValues = (data: Schedule): PageValues => {
    switch (data.paymentSituationId) {
      case 2:
        return {
          color: 'red',
          title: 'Pagamento Não Aparovado',
        } as PageValues;
      case 3:
        return {
          color: 'green',
          title: 'Pagamento Aprovado',
        } as PageValues;
      default:
        return {
          color: 'yellow',
          title: 'Aguardando Confirmação do Pagamento',
        } as PageValues;
    }
  };

  return (
    <Fragment>
      <Head />
      <Header />
      <Page
        pageColor={getPageValues(data).color}
        title={
          <Fragment>
            {getPageValues(data).title}
            <small>Confira os detalhes do pedido</small>
          </Fragment>
        }
        id="schedules-complete"
      >
        <Title value="Obrigado!" />

        <p>
          Número do Pedido: {data.id.toString().padStart(6, '000000')}
          <small>Cartão de Crédito final {schedule.cardLastFourDigits}</small>
        </p>

        <Footer
          buttons={[
            {
              value: 'Agendamentos',
              href: '/schedules',
            },
          ]}
        />
      </Page>
    </Fragment>
  );
};

export default ComponentPage;

export const getServerSideProps = withAuthentication(async ({ req }) => {
  try {
    const { schedule, token } = req.session;

    const { data } = await axios.get<PaymentResponse>(
      `/schedules/${req.session.schedule.data?.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL: process.env.API_URL,
      }
    );

    return { props: { data, schedule } };
  } catch (e) {
    return {
      redirect: {
        destination: '/schedules-summary',
      } as Redirect,
    };
  }
});
