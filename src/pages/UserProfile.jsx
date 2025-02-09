// arc/pages/UserProfile.jsx
import React, { useState } from "react";
import {Button, Box, Card, CardContent, Typography, Grid, TextField } from "@mui/material";

const UserProfile = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        expectedDeliveryDate: "",
        pregnancyWeek: "",
        healthStatus: "",
    });

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onslotchange.log("User Profile Data:", formData);
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
                            label="Full Name"
                            name="fullName"
                            variant="outlined"
                            value={formData.fullName}
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
                            value={formData.email}
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
                            multiline={3}
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
