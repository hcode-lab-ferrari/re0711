import { NextPage } from 'next';
import ScheduleProvider from '../contexts/ScheduleServiceContext/ScheduleServiceProvider/ScheduleServiceProvider';
import Head from '../components/Head/Head';
import Header from '../components/Home/Header/index';
import useScheduleService from '../contexts/ScheduleServiceContext/ScheduleServiceContext';

type ComponentPageProps = {
    children?: React.ReactNode;
}
const ScheduleServicePage = ()=>{
    const { services, selecteds, addService, removeService } = useScheduleService();
    return (<><h1>Agora sim dentro de um contexto</h1></>);
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