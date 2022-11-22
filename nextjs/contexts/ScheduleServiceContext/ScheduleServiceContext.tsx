import { createContext, useContext } from "react";
import { Service } from "../../types/Service";


type ScheduleServiceContextProps ={
    // services - são os serviços disponíveis
    services: Service[];
    // selecteds - são os serviços selecionados
    selecteds: Service[];
    // addService - adiciona um serviço selecionado
    addService: (serviceId: number)=> void;
    // removeService - remove um serviço selecionado
    removeService: (serviceId: number)=> void;
}
export const ScheduleServiceContext = createContext<ScheduleServiceContextProps>({
    services: [],
    selecteds: [],
    addService: ()=>{},
    removeService: ()=>{},
});


export default function useScheduleService(){
    const context = useContext(ScheduleServiceContext);
    if(!context){
        throw new Error('useScheduleService must be used within a ScheduleServiceProvider');
    }

    return context;
}