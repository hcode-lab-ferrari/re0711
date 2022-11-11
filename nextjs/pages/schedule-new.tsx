import axios from 'axios'
import { format } from 'date-fns'
import { NextPage } from 'next'
import { Router, useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Head from '../components/Head'
import Header from '../components/Home/Header'
import Page from '../components/Page'
import Footer from '../components/Page/Footer'
import { BackButton } from '../components/Page/Footer/Footer'

type FormData = {
    scheduleAt: string;
}

const ComponentPage: NextPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        clearErrors,
        formState:{errors},
    } = useForm<FormData>();
    
    const router = useRouter();
    const scheduleAt = watch('scheduleAt', format(new Date(), 'yyyy-MM-dd'))
    const onSubmit: SubmitHandler<FormData> = ({scheduleAt})=>{
        axios.post('/api/schedules/new',{
            scheduleAt,
        })
        .then(()=> router.push('/schedules-time-options'))
        .catch((error)=>{
            setError('scheduleAt',{
                message: error.response.data.message ?? error.message
            })
        })
    }
    return (
        <>
            <Head/>
            <Header />
            <Page pageColor="blue" title="Escolha a Data" id="schedule-new">
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('scheduleAt',{value: scheduleAt})}/>
                </form>
                <Footer
                    buttons={[
                        BackButton,
                        {
                            value:'Continuar',
                            type:'submit',
                            disabled: false
                        }
                    ]}
                />
            </Page>
        </>
    )
}

export default ComponentPage;