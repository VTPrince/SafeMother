// arc/pages/UserProfile.jsx
import React, { useState } from "react";
import {Button, Box, Card, CardContent, Typography, Grid, TextField } from "@mui/material";
import { useSelector } from 'react-redux';
import { supabase } from '../../SupabaseClient';

const UserProfile = () => {

    const userId = useSelector((state)=> state.userInfo.user_id);
    const userEmail = useSelector((state)=> state.userInfo.email);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: 0,
        expectedDeliveryDate: "",
        pregnancyWeek: 0,
        healthStatus: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "phoneNumber" || name === "pregnancyWeek" ? Number(value) : value,
        }));
    };

    const handleSubmit = async(e) => {
        console.log('Sign Up Data:', formData);
        const date = new Date(formData.expectedDeliveryDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });

        console.log('Formatted Date:', formattedDate);
        e.preventDefault();
        try{
            
        const { data, error } = await supabase
        .from('user_profile').insert([{ firstname: formData.firstName, lastname: formData.lastName, email: userEmail, phonenumber: formData.phoneNumber, expdeldate: formattedDate, pregweek: formData.pregnancyWeek, healthstatus: formData.healthStatus, uuid: userId},
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
                    User Profile
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary" marginBottom={2}>
                    Please fill in your details below
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            variant="outlined"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={userEmail}
                            onChange={handleChange}
                            required
                        />
                        </Grid>  
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            variant="outlined"
                            type="number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        </Grid>    
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Expected Delivery Date"
                            name="expectedDeliveryDate"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.expectedDeliveryDate}
                            onChange={handleChange}
                            required
                        />
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Current Week of Pregnancy"
                            name="pregnancyWeek"
                            variant="outlined"
                            type="number"
                            value={formData.pregnancyWeek}
                            onChange={handleChange}
                            required
                        />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                            fullWidth
                            label="Patient Health Status"
                            name="healthStatus"
                            variant="outlined"
                            multiline={true}
                            value={formData.healthStatus}
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

export default UserProfile;
