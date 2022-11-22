import { NextPage } from 'next';
import { Fragment, useCallback } from 'react';
import Footer from '../components/Page/Footer';
import Head from '../components/Head';
import Header from '../components/Home/Header';
import Page from '../components/Page';
import { useRouter } from 'next/router';
import Toast from '../components/Toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { getOnlyNumbers } from '../utils/getOnlyNumbers';
import { useAuth } from '../contexts/AuthContext';
import { Address } from '../types/Address';
import { catchErrorClient } from '../utils/catchErrorClient';
import { get } from 'lodash';

type ZipCodeResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

type FormData = {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
};

const ComponentPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    setError,
    setValue,
    watch,
  } = useForm<FormData>();

  const { token } = useAuth();
  const zipCode = watch('zipCode');
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = useCallback(
    (data) => {
      axios
        .post<Address>('/addresses', data, {
          baseURL: process.env.API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data: address }) =>
          router.push(`/schedules-address?selected=${address.id}`)
        )
        .catch(
          catchErrorClient((e) => {
            if (e.response?.data.error === 'Unauthorized') {
              router.push(`/auth?next=${router.pathname}`);
            } else {
              setError('zipCode', {
                type: 'required',
                message: e.message,
              });
            }
          })
        );
    },
    [token, router]
  );

  const searchZipCode = useCallback(
    (value: string) => {
      value = getOnlyNumbers(value);
      if (value.length >= 8 && value !== getOnlyNumbers(zipCode)) {
        axios
          .get<ZipCodeResponse>(`/addresses/zip-code/${value}`, {
            baseURL: process.env.API_URL,
          })
          .then(({ data }) => {
            setValue('street', data.logradouro);
            setValue('district', data.bairro);
            setValue('city', data.localidade);
            setValue('state', data.uf);
            setValue('complement', data.complemento);
            setValue('country', 'Brasil');

            const numberField =
              document.querySelector<HTMLInputElement>('#number');

            if (numberField) {
              numberField.focus();
            }
          })
          .catch((e) => {
            setError('zipCode', {
              type: 'required',
              message: 'CEP não encontrado',
            });
          });
      }
    },
    [zipCode]
  );

  return (
    <Fragment>
      <Head />
      <Header />
      <Page pageColor="blue" title="Novo Endereço" id="schedules-address-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fields zipcode">
            <div className="field">
              <input
                type="text"
                id="zipcode"
                {...register('zipCode', {
                  required: 'O campo cep é obrigatório.',
                  onChange: (e) => searchZipCode(e.target.value),
                })}
              />
              <label htmlFor="zipcode">CEP</label>
            </div>
            <div className="field">
              <button
                type="button"
                id="btn-search"
                onClick={() => searchZipCode(zipCode)}
              >
                Buscar
              </button>
            </div>
          </div>

          <div className="fields address-number">
            <div className="field">
              <input
                type="text"
                id="address"
                {...register('street', {
                  required: 'O campo endereço é obrigatório.',
                })}
              />
              <label htmlFor="address">Endereço</label>
            </div>

            <div className="field">
              <input type="text" id="number" {...register('number')} />
              <label htmlFor="number">Número</label>
            </div>
          </div>

          <div className="field">
            <input type="text" id="complement" {...register('complement')} />
            <label htmlFor="complement">Complemento</label>
          </div>

          <div className="field">
            <input
              type="text"
              id="district"
              {...register('district', {
                required: 'O campo bairro é orbigatório',
              })}
            />
            <label htmlFor="district">Bairro</label>
          </div>

          <div className="field">
            <input
              type="text"
              id="city"
              {...register('city', {
                required: 'O campo cidade é obrigatório.',
              })}
            />
            <label htmlFor="city">Cidade</label>
          </div>

          <div className="fields">
            <div className="field">
              <input
                type="text"
                id="state"
                {...register('state', {
                  required: 'O campo estado é obrigatório.',
                })}
              />
              <label htmlFor="state">Estado</label>
            </div>

            <div className="field">
              <input
                type="text"
                id="country"
                {...register('country', {
                  required: 'O campo país é obrigatório.',
                })}
              />
              <label htmlFor="country">País</label>
            </div>
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
