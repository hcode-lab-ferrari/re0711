import axios from "axios";
import { useEffect, useState } from "react";
import { Service } from "../../../types/Service";
import useScheduleService from '../ScheduleServiceContext';
import { ScheduleServiceContext } from '../ScheduleServiceContext';


export default function ScheduleProvider({children}:{children: React.ReactNode}){
    const [services, setServices] = useState<Service[]>([]);
    const [selecteds, setSelecteds] = useState<Service[]>([]);

    const addService = (serviceId: number)=> {
        const service = services.find((service) => service.id === serviceId);

        if(service){
            setSelecteds([...selecteds, service]);
        }
    }

    const removeService = (serviceId: number)=> {
        const service = services.find((service) => service.id === serviceId);

        if(service){
            setSelecteds(selecteds.filter((service)=> service.id !== serviceId))
        }
    }


    const loadServices =() =>{
        axios.get<Service[]>('/services',{
            baseURL: process.env.API_URL,
        })
        .then(({data})=> setServices(data));
    }

    useEffect(()=> loadServices(), []);
    
    return (
        <ScheduleServiceContext.Provider value={{services, selecteds, addService, removeService}}>
            {children}
        </ScheduleServiceContext.Provider>
    )
}