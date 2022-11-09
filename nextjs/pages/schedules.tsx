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