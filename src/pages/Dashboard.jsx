import React, { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Box, Container, Button, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import { CardStat } from "../components/CardStat";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const Dashboard = () => {
  const userId = useSelector((state) => state.userInfo.user_id);
  const [data, setData] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", userId)
        .single(); // Ensure we get only one record

        data?.appointdate.forEach((date)=>{
          console.log("this",date)
        })
    
      if (error) {
        console.error("Error while fetching data", error);
      } else {
        setData(data);
      }
    };
    getData();
  }, [userId]);

  const handleScheduleClick = () => {
    setShowDatePicker(!showDatePicker);
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
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating appointment:", error);
    } else {
      console.log("Appointment added:", formattedDate);
      setData((prev) => ({
        ...prev,
        appointdate: updatedAppointments
      }));
      setShowDatePicker(false);
    }
    setUpdating(false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, marginTop: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleScheduleClick}
          sx={{ alignSelf: "flex-end" }}
        >
          Schedule Appointment
        </Button>

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
            <List 
              sx={{
                maxHeight: "100px",
                overflowY: "auto",
              }}
            >
            {data?.appointdate.map((date,index) => (
             <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CalendarMonthIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary ={date} />
             </ListItem> 
            ))
            }
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
