import React from "react";
import { supabase } from '../../SupabaseClient';
import { useSelector } from "react-redux";

export const Dashboard = () => {

    const userId = useSelector((state)=>state.userInfo.user_id);
    
    const getData = async() => {

    let { data, error } = await supabase.from('user_profile').select('*').eq('user_id', userId);

    console.log("profile",data, userId)

    }
    getData();
        
}