import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import axios from 'axios';
import { Schedule } from '../types/Schedule';
import { useState } from 'react';
import { dateStringToDate } from '../utils/dateStringToDate';

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
  return (
    <div>schedules</div>
  )
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
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
        console.log(error);
    }
    
}

export default ComponentPage;