import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Box, Container, Button, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar , TextField} from "@mui/material";
import { CardStat } from "../components/CardStat";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AppointmentCard from "../components/AppintmentView";
// import MotherFetusGraph from './MotherFetusGraph.jsx';


export const Dashboard = () => {
  const userId = useSelector((state) => state.userInfo.user_id);
  const [data, setData] = useState(null);
  const [appointDate,setAppointDate] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [motherFetusForm, setMotherFetusForm] = useState({
    weight: "",
    blood_pressure: "",
    heart_rate: "",
    fetal_height: "",
    fetal_size: ""
  });
  const [motherFetusData, setMotherFetusData] = useState([]);
  const [showHealthForm, setShowHealthForm] = useState(false); // ➡️ NEW: to toggle health form visibility



  const fetchUserData = useCallback(async() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("uuid", userId)
        .single();
            
      if (error) {
        console.error("Error while fetching data", error);
      } else {
        const formatDates = data?.appointdate?.map((date)=>{
          const day = dayjs(date).format("DD");
          const month = dayjs(date).format("MMMM");
          const year = dayjs(date).format("YYYY");
          return {day,month,year}
        });

        if(formatDates){    setAppointDate(formatDates)    ;}
        setData(data)

      }
    };
    getData();
  }, [userId]);

   // Fetch Mother Fetus Data
  //  const fetchMotherFetusData = useCallback(async () => {
  //   const { data, error } = await supabase
  //     .from("mother_fetus_data")
  //     .select("*")
  //     .eq("uuid", userId)
  //     .order("created_at", { ascending: true });

  //   if (error) console.error("Error fetching mother fetus data:", error);
  //   else setMotherFetusData(data || []);
  // }, [userId]);

  //Fetch medicines separately
  const fetchMedicines = useCallback(async () => {
    const { data, error } = await supabase
      .from("medicine_tracker")
      .select("*")
      .eq("uuid", userId);

    if (error) {
      console.error("Error fetching medicines:", error);
    } else {
      setMedicines(data);
    }
  }, [userId]);

  useEffect(()=>{
    fetchUserData();
    fetchMedicines(); // Fetch medicines when dashboard loads
    // fetchMotherFetusData();
  },[fetchUserData, fetchMedicines]);
    // fetchMotherFetusData

  const handleScheduleClick = () => {
    setShowDatePicker(!showDatePicker);
    setShowHealthForm(false); // if switching
  };

  const handleHealthFormClick = () => {
    console.log("Clicked on Record Health Info"); // add this line
    setShowHealthForm(!showHealthForm);
    setShowDatePicker(false); // if switching
  };

  const handleConfirmAppointment = async () => {
    if (!selectedDate) return;
    setUpdating(true);

    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");

    // Get the current appointments (ensure it's an array)
    const existingAppointments = data?.appointdate || []; 

    // Append the new date
    const updatedAppointments = [...existingAppointments, formattedDate];

    // Update Supabase with the new appointments array
    const { error } = await supabase
      .from("user_profile")
      .update({ appointdate: updatedAppointments })
      .eq("uuid", userId);

    if (error) {
      console.error("Error updating appointment:", error);
    } else {
      console.log("Appointment added:", formattedDate);
      await fetchUserData();
      setShowDatePicker(false);
    }
    setUpdating(false);
  };

  // const handleMotherFetusFormChange = (field, value) => {
  //   setMotherFetusForm(prev => ({ ...prev, [field]: value }));
  // };

  // const handleMotherFetusFormSubmit = async () => {
  //   const { weight, blood_pressure, heart_rate, fetal_height, fetal_size } = motherFetusForm;

  //   if (!weight || !blood_pressure || !heart_rate || !fetal_height || !fetal_size) {
  //     alert("Please fill all the fields!");
  //     return;
  //   }

  //   const { error } = await supabase
  //     .from("mother_fetus_data")
  //     .insert([{ 
  //       uuid: userId,
  //       weight: parseFloat(weight),
  //       blood_pressure,
  //       heart_rate: parseInt(heart_rate),
  //       fetal_height: parseFloat(fetal_height),
  //       fetal_size: parseFloat(fetal_size)
  //     }]);

  //   if (error) {
  //     console.error("Error inserting mother fetus data:", error);
  //     alert("Something went wrong!");
  //   } else {
  //     alert("Data saved successfully!");
  //     setMotherFetusForm({ weight: "", blood_pressure: "", heart_rate: "", fetal_height: "", fetal_size: "" });
  //     fetchMotherFetusData();
  //     setShowHealthForm(false); // hide form after submission
  //   }
  // };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, marginTop: "2rem" }}>

        {/* 👉 Buttons Section */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleScheduleClick}
          sx={{ alignSelf: "flex-end" }}
        >
          Schedule Appointment
        </Button>
        <Button variant="contained" color="secondary" onClick={handleHealthFormClick}>
            Record Health Info
          </Button>
          </Box>
           

            {/* 👉 Date Picker Section */}
        {showDatePicker && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              // Remove the action bar buttons (OK / CANCEL)
              slotProps={{
                actionBar: {
                actions: []
                }
            }}
              renderInput={(params) => <input {...params} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />}
            />
          </LocalizationProvider>
        )}

        {showDatePicker && selectedDate && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmAppointment}
            disabled={updating}
            sx={{ width: "fit-content", alignSelf: "flex-end" }}
          >
            {updating ? "Saving..." : "Confirm Appointment"}
          </Button>
        )}


         {/* 👉 Health Form Section
         {showHealthForm && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField label="Mother's Weight (kg)" value={motherFetusForm.weight} onChange={(e) => handleMotherFetusFormChange("weight", e.target.value)} />
            <TextField label="Mother's Blood Pressure" value={motherFetusForm.blood_pressure} onChange={(e) => handleMotherFetusFormChange("blood_pressure", e.target.value)} />
            <TextField label="Kid's Heart Rate (bpm)" value={motherFetusForm.heart_rate} onChange={(e) => handleMotherFetusFormChange("heart_rate", e.target.value)} />
            <TextField label="Fetal Height (cm)" value={motherFetusForm.fetal_height} onChange={(e) => handleMotherFetusFormChange("fetal_height", e.target.value)} />
            <TextField label="Fetal Size (cm)" value={motherFetusForm.fetal_size} onChange={(e) => handleMotherFetusFormChange("fetal_size", e.target.value)} />
            <Button variant="contained" color="success" onClick={handleMotherFetusFormSubmit}>
              Submit Health Data
            </Button>
          </Box>
        )} */}


        {/* 👉 Dashboard Statistics */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CardStat title="Week of Pregnancy" value={data?.pregweek} />
          </Grid>
          <Grid item xs={6}>
            <CardStat title="Health Status" value={data?.healthstatus} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CardStat title="Delivery Date" value={data?.expdeldate} />
          </Grid>
          <Grid item xs={6}>
      <AppointmentCard dates={appointDate} />
          </Grid> 
        </Grid>
     
        {/* 🧩 🧩 NEW : Medicine Section */}
        {medicines.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Your Medicines
            </Typography>
            <Grid container spacing={2}>
              {medicines.map((med, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ minHeight: 120, boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        💊 {med.name}
                      </Typography>
                      <Typography color="text.secondary">
                        Take for {med.days} days
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
          </Box>
   
   

          

</Container>      
    
  );
};
