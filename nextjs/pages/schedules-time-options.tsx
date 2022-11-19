import { NextPage, Redirect } from "next";
import { ScheduleSession } from '../types/ScheduleSession';
import { TimeOption } from '../types/TimeOption';
import Head from '../components/Head';
import Header from '../components/Home/Header';
import Page from '../components/Page';
import { get, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {useState} from 'react';
import axios from 'axios';
import { format, getDay, parse, parseJSON } from "date-fns";
import locale from 'date-fns/locale/pt-BR';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../utils/session';
import Toast from '../components/Toast';
import Footer from '../components/Page/Footer';
import { BackButton, ContinueButton } from '../components/Page/Footer';


type FormData = {
    scheduleAt: string;
    timeOptionId: string;
}

type ComponentPageProps = {
    schedule: ScheduleSession;
    timeOptions: TimeOption[];
}

const ComponentPage: NextPage<ComponentPageProps> = (props)=> {
const {handleSubmit, register, formState: { errors}, clearErrors, setError, } = useForm<FormData>();
const router = useRouter();
const [scheduleAt] = useState(String(props.schedule.scheduleAt));
// ?? null coallesce operator
const [timeOptions] = useState<TimeOption[]>(props.timeOptions ?? []);

const onSubmit: SubmitHandler<FormData> = (data)=>{
    axios.post('/api/schedules/time-options', data)
    .then(()=> router.push('/schedules-services'))
    .catch((error)=>{
        setError('scheduleAt',{
            message: error.response.data.message ?? error.message
        });
    });
}

    return (
        <>
            <Head/>
            <Header />
            <Page pageColor="blue" title="Escolha o Horário" id="time-options">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('scheduleAt',{value: scheduleAt })}/>
                    <h3>
                        {format(parse(scheduleAt, 'yyyy-MM-dd', new Date()),
                        "EEEE, d ' de ' MMMM ' de ' yyyy", { locale})}
                    </h3>
                    <div className="options">
                        {timeOptions.map(({time, id})=>(
                            <label key={id.toString()}>
                                <input type="radio" {...register('timeOptionId',{
                                    required: 'Selecione um horário',
                                })}
                                value={id}
                                />
                                <span>{format(parseJSON(time), 'HH:mm')}</span>
                            </label>
                        ))}
                    </div>
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
                        ContinueButton,
                    ]}
                />            


                </form>
            </Page>
        </>
    )
}


export const getServerSideProps = withIronSessionSsr(async ({req}) =>{
    if(!req.session.schedule?.scheduleAt){
        return {
            redirect:{
                destination: '/schedules-new',
            } as Redirect,
        }
    }

    const { schedule } = req.session;
    const day = getDay(parse(String(schedule.scheduleAt), 'yyyy-MM-dd', new Date()));


    const {data: timeOptions } = await axios.get('/time-options',{
        baseURL: process.env.API_URL,
        params: {
            day,
        },
    })

    return {
        props: {
            schedule,
            timeOptions,
        }
    }

}, sessionOptions);




export default ComponentPage;