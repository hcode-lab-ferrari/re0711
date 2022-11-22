import { NextPage } from 'next';
import ScheduleProvider from '../contexts/ScheduleServiceContext/ScheduleServiceProvider/ScheduleServiceProvider';
import Head from '../components/Head/Head';
import Header from '../components/Home/Header/index';
import useScheduleService from '../contexts/ScheduleServiceContext/ScheduleServiceContext';
import Page from '../components/Page/index';
import Panel from '../components/Schedule/Panel';
import formatCurrency from '../assets/scripts/src/functions/formatCurrency';
import { useEffect } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Service } from '../types/Service';
import Toast from '../components/Toast/index';
import Footer from '../components/Page/Footer';
import { get } from 'lodash';
import { BackButton, ContinueButton } from '../components/Page/Footer/Footer';

type ComponentPageProps = {
    children?: React.ReactNode;
}

type FormData = {
  services: number[];
  server?: unknown;
};

const ScheduleServicePage = ()=>{
    const { services, selecteds, addService, removeService } = useScheduleService();

    const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    setValue,
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = ({ services }) => {
    if (services.length === 0) {
      setError('services', {
        type: 'required',
        message: 'Selecione pelo menos um serviço',
      });
      return false;
    }

    axios
      .post('/api/schedules/services', {
        services,
      })
      .then(() => router.push('/schedules-address'))
      .catch((error) => {
        setError('server', {
          message: error.response.data.message ?? error.message,
        });
      });
  };

  const onChangeService = (checked: boolean, serviceId: number) => {
    if (checked) {
      addService(serviceId);
    } else {
      removeService(serviceId);
    }
  };

  useEffect(() => {
    setValue(
      'services',
      selecteds.map((service) => service.id)
    );
    if (selecteds.length > 0) {
      clearErrors();
    }
  }, [selecteds, clearErrors, setValue]);

    return (
    <Page pageColor="blue" title="Escolha os Serviços" id="schedules-services" panel={<Panel />}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="options">
                {services.map(({id, name, price, description})=>(
                    <label key={id.toString()}>
                        <input
                        type="checkbox"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
                             onChangeService(event?.target.checked, Number(id))}
                        />
                        <div className="square">
                            <div></div>
                        </div>
                        <div className="content">
                            <span className="name">{name}</span>
                            <span className="description">{description}</span>
                            <span className="price">{formatCurrency(Number(price))}</span>
                        </div>
                    </label>
                ))}
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
        <Footer buttons={[BackButton, ContinueButton]} />


        </form>
    
    
    </Page>
    );
}
const ComponentPage:NextPage<ComponentPageProps> = (props:ComponentPageProps) =>{

    return (

        <ScheduleProvider>
            <Head />
            <Header />
            <ScheduleServicePage />
        </ScheduleProvider>
    )
}

export default ComponentPage;