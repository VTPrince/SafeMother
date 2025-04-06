import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  Button
} from '@mui/material';
import ModalPop from './ModalPop';



const AppointmentCard = ({ dates
  // day,
  // date,
}) => {
  const dateColor = '#F57C00';
  return (

    <Card sx={{ minHeight: "6rem" }}>
    <CardContent sx={{ p: 2 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h5">
            View Upcoming Appointments
          </Typography>
        </Grid>
        <Grid item>
          <ModalPop data={dates} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>

  //   <Card sx={{ minHeight: "6rem" }}>    <CardContent
  //   elevation={1}
  //   sx={{
  //     p: 2,
  //   }}
  // >

  //   <Grid container spacing={2} alignItems="center" wrap="nowrap">

  //     <Grid item> 
  //       <Box textAlign="center" sx={{ minWidth: 40 }}>
  //                                     <Typography variant="h5" >
  //                                         View Upcoming Appointments
  //                                     </Typography>
  //       <ModalPop data={dates} />
  //       </Box>
  //     </Grid>
  //   </Grid>
  // </CardContent></Card>

  );
};

export default AppointmentCard;


