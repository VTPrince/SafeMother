import React, {useEffect,useState} from "react";
import { supabase } from '../../SupabaseClient';
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Box, Container, Grid2 } from "@mui/material";
import { CardStat } from "../components/CardStat";

export const Dashboard = () => {

    const userId = useSelector((state)=>state.userInfo.user_id);
    const [data,setData] = useState(null);
    console.log("actual",data)

    useEffect(()=>{
    const getData = async() => {
        const { data, error } = await supabase.from('user_profile').select('*').eq('user_id', userId);
        console.log("profile",data, userId)
        if(error){
            console.error("Error while fetching data",error)
        }
        else{
            setData(data)
        }
    }
        getData();
    },[userId])

    return(
    <>
    <Container maxWidth="xl">
        <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                marginTop: '2rem' 
        }}> 
            <Grid2 container spacing={2}>
            <Grid2 item size={6}>
                <CardStat 
                title="Week of Pregnancy"
                value={data?.[0]?.pregweek}
                />
            </Grid2>
            <Grid2 item  size={6}>
                <CardStat
                title="Health Status"
                value={data?.[0]?.healthstatus} 
                />
            </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
            <Grid2 item size={6}>
                <CardStat 
                title="Delivery Date"
                value={data?.[0]?.expdeldate}
                />
            </Grid2>
            <Grid2 item  size={6}>
                <CardStat
                title="Next appointment"
                value="1st April" 
                />
            </Grid2>
            </Grid2>
        </Box>
    </Container>

    </>)
        
}