// arc/pages/UserProfile.jsx
import React, { useState } from "react";
import {Button, Box, Card, CardContent, Typography, Grid, TextField } from "@mui/material";
import { useSelector } from 'react-redux';
import { supabase } from '../../SupabaseClient';

const VitalHealthData = () => {

    const userId = useSelector((state)=> state.userInfo.user_id);

    const [formData, setFormData] = useState({
        weight: 0,
        blood_pressure: 0,
        heart_rate: 0,
        fetal_height: 0,
        fetal_size: 0,
        created_at: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "created_at" ? value : Number(value),
        }));
    };

    const handleSubmit = async(e) => {
        console.log('Sign Up Data:', formData);
        const date = new Date(formData.created_at);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });

        console.log('Formatted Date:', formattedDate);
        e.preventDefault();
        try{
            
        const { data, error } = await supabase
        .from('mother_fetus_data').insert([{ weight: formData.weight, blood_pressure: formData.blood_pressure, heart_rate: formData.heart_rate, created_at: formattedDate, fetal_size: formData.fetal_size, fetal_height: formData.fetal_height, uuid: userId},
        ])
        .select()

        if (!data) {
                throw new Error(`HTTP error! status: ${error}`);
              }
        }catch(error){
            console.error("User Profile Error:", error);
        }
    };
    return (
        <Box
        sx={{
            minHeight:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background:"#f9f9f9",
            padding:3,
        }}
        >
        <Card sx={{ maxWidth: 500,width: "100%", boxShadow: 3, borderRadius: 2}}>
            <CardContent>
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                    Health Vitals
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary" marginBottom={2}>
                    Please enter your vitals below
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Mother Weight"
                            name="weight"
                            variant="outlined"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Blood Pressure"
                            name="blood_pressure"
                            variant="outlined"
                            value={formData.blood_pressure}
                            onChange={handleChange}
                            required
                        />
                        </Grid>   

                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Mother Heart Beat"
                            name="heart_rate"
                            variant="outlined"
                            type="number"
                            value={formData.heart_rate}
                            onChange={handleChange}
                            required
                        />
                        </Grid>    
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Date"
                            name="created_at"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.created_at}
                            onChange={handleChange}
                            required
                        />
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Fetal Size"
                            name="fetal_size"
                            variant="outlined"
                            type="number"
                            value={formData.fetal_size}
                            onChange={handleChange}
                            required
                        />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Fetal Height"
                            name="fetal_height"
                            variant="outlined"
                            multiline={true}
                            value={formData.fetal_height}
                            onChange={handleChange}
                            
                        />
                        </Grid>    
                        <Grid item xs={12}>
                          <Button type="submit" variant="contained" color="primary" fullWidth>
                            Save Profile
                          </Button>
                        </Grid>
                      </Grid>
                </form>
            </CardContent>
        </Card>
        </Box>
    );
};

export default VitalHealthData;
