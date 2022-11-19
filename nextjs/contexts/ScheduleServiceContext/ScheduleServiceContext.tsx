import { createContext, useContext } from "react";
import { Service } from "../../types/Service";


type ScheduleServiceContextProps ={
    services: Service[];
    selecteds: Service[];
    addService: (serviceId: number)=> void;
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