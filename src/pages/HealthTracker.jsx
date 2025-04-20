import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../SupabaseClient";
import MotherFetusGraph from "../components/MotherFetusGraph";

const HealthTracker = () => {
    const uuid = useSelector((state) => state.userInfo.user_id);
    const [graphData,setGraphData] = useState();

    useEffect(()=>{
        const getGraphData = async()=>{
            try{
                const { data,error } = await supabase.from('mother_fetus_data').select('*').eq("uuid",uuid);
                console.log("health",data,uuid)
                setGraphData(data)
                if(error){
                    throw new Error(error);
                }
            }catch(error){
                console.error(error)
            }
        }
        getGraphData();
    },[])

    return(
        <>
            <MotherFetusGraph data={graphData} lineKey='weight'/>
            <MotherFetusGraph data={graphData} lineKey='heart_rate'/>
        </>

    )

}

export default HealthTracker;