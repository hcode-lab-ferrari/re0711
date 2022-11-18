import axios from 'axios'
import { format } from 'date-fns'
import { get } from 'lodash'
import { NextPage } from 'next'
import { Router, useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Calendar from '../components/Calendar'
import Head from '../components/Head'
import Header from '../components/Home/Header'
import Page from '../components/Page'
import Footer from '../components/Page/Footer'
import { BackButton } from '../components/Page/Footer/Footer'
import Toast from '../components/Toast'
import { useAuth } from '../contexts/AuthContext/useAuth'

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
                <Calendar
                    onChange={(selectedDate)=> setValue('scheduleAt',format(selectedDate, 'yyyy-MM-dd'))
                    }
                    selected={new Date()}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('scheduleAt',{value: scheduleAt})}/>
                    <Toast 
                    type="danger"
                    open={Object.keys(errors).length > 0}
                    onClose={()=> clearErrors()}
                    >
                        {Object.keys(errors).map((key)=> (
                            <p key={key}>{get(errors, `${key}.message`)}&nbsp;</p>
                        ))}
                    </Toast>
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
                </form>


               
            </Page>
        </>
    )
}

export default ComponentPage;