import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import axios from 'axios';
import { Schedule } from '../types/Schedule';
import { useState } from 'react';
import { dateStringToDate } from '../utils/dateStringToDate';
import redirectToAuth from '../utils/redirectToAuth';
import withAuthentication from '../utils/withAuthentication';
import Head from '../components/Head';
import Header from '../components/Home/Header';
import Page from '../components/Page/Page';
import Title from '../components/Page/Title/index';
import ServiceItem from '../components/ServiceItem/ServiceItem';
import Footer from '../components/Page/Footer';

type ComponentPageProps = {
    schedules: Schedule[],
    token: string
}

const ComponentPage: NextPage<ComponentPageProps> = ({schedules, token}) => {
    const [nextSchedules, setNextSchedules] = useState<Schedule[]>(
        schedules.filter(
            (schedule) => dateStringToDate(schedule.scheduleAt).getTime() > new Date().getTime()
        )
    )
    const [historySchedules, setHistorySchedules] = useState<Schedule[]>(
        schedules.filter(
            (schedule) => dateStringToDate(schedule.scheduleAt).getTime() <= new Date().getTime()
        )
    )


    
  return (
   <>
    <Head />
    <Header/>
    <Page title="Agendamentos" id="schedules">
        <Title value="Próximos"/>
        <ul>
            {nextSchedules.length === 0 && <li>Nenhum agendamento encontrado</li>}
            {nextSchedules.map((schedule) => (
                <ServiceItem 
                key={schedule.id.toString()} 
                data={schedule} 
                token={token}
                 onCanceled={(data) => setNextSchedules((items)=> items.filter((i)=> i.id !== data.id))}
                 />
            ))}
        </ul>
        <Title value="Histórico"/>
        <ul>
            {historySchedules.length === 0 && <li>Não há histórico de agendamentos</li>}
            {historySchedules.map((schedule) => (
                 <ServiceItem 
                key={schedule.id.toString()} 
                data={schedule} 
                token={token}
                 onCanceled={(data) => setHistorySchedules((items)=> items.filter((i)=> i.id !== data.id))}
                 />
            ))}
        </ul>
        
        <Footer
        
        buttons={[
            {
                value: 'Novo Agendamento',
                href: '/schedule-new',
                className: 'black',
            }
        ]}
        />


    </Page>
   </>
  )
}

export const getServerSideProps = withAuthentication(async (context) => {
    try {
        const { token} = context.req.session;

        const {data:schedules} = await axios.get<Schedule[]>('/schedules', {
            baseURL: process.env.API_URL,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return{
        props: {
            schedules, token
        }
        }
    } catch (error){
        return redirectToAuth(context);
    }
    
});

export default ComponentPage;