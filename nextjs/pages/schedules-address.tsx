import { NextPage } from 'next';
import { Fragment, useEffect } from 'react';
import Footer from '../components/Page/Footer';
import Head from '../components/Head';
import Header from '../components/Home/Header';
import Page from '../components/Page';
import Toast from '../components/Toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { Address } from '../types/Address';
import  withAuthentication  from '../utils/withAuthentication';
import axios from 'axios';
import { useRouter } from 'next/router';
import  redirectToAuth  from '../utils/redirectToAuth';
import { catchErrorClient } from '../utils/catchErrorClient';
import { get } from 'lodash';

type FormData = {
  billingAddressId: string;
  server?: string;
};

type ComponentPageProps = {
  addressSelected: number;
  addresses: Address[];
};

const ComponentPage: NextPage<ComponentPageProps> = ({
  addresses,
  addressSelected,
}) => {
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = ({ billingAddressId }) => {
    if (isNaN(Number(billingAddressId))) {
      setError('billingAddressId', {
        message: 'Selecione um endereço de cobraça',
      });
    }

    axios
      .post('/api/schedules/address', { billingAddressId })
      .then(() => router.push('/schedules-payment'))
      .catch(
        catchErrorClient((error) => {
          setError('server', {
            message: error.response?.data.message ?? error.message,
          });
        })
      );
  };

  useEffect(
    () => setValue('billingAddressId', String(addressSelected)),
    [addressSelected]
  );

  return (
    <Fragment>
      <Head />
      <Header />
      <Page
        pageColor="blue"
        title="Endereço de Cobrança"
        id="schedules-address"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Link href="/schedules-address-create">
            <a className="btn-create">Novo Endereço</a>
          </Link>

          <hr />

          <div className="addresses">
            {addresses.map(
              ({
                id,
                street,
                number,
                district,
                city,
                state,
                zipCode,
                complement,
              }) => (
                <label key={id.toString()}>
                  <div>
                    <input
                      type="radio"
                      {...register('billingAddressId')}
                      value={id}
                    />
                    <div className="circle">
                      <div></div>
                    </div>
                    <address>
                      <strong>
                        {street}
                        {number && <Fragment>, {number}</Fragment>}
                      </strong>
                      <br />
                      {complement && <Fragment>{complement} - </Fragment>}
                      {district}
                      <br />
                      {city} - {state}
                      <br />
                      {zipCode}
                    </address>
                  </div>
                  <Link href={`/schedules-address-update?id=${id}`}>
                    <a className="btn-update">Editar</a>
                  </Link>
                </label>
              )
            )}
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
          <Footer />
        </form>
      </Page>
    </Fragment>
  );
};

export default ComponentPage;

export const getServerSideProps = withAuthentication(async (context) => {
  try {
    const { data: addresses } = await axios.get<Address[]>('/me/addresses', {
      baseURL: process.env.API_URL,
      headers: {
        Authorization: `Bearer ${context.req.session.token}`,
      },
    });

    return {
      props: { addresses, addressSelected: Number(context.query.selected) },
    };
  } catch (error) {
    return redirectToAuth(context);
  }
});
