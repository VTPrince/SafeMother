import React, {useState, useEffect} from "react";
import { Box, Button, Modal, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ModalPop = ({data}) => {
    const [openModal, setOpenModal] = useState(false);
    const handleModal = () => {
        setOpenModal((prev)=> !prev);
    }

    const dateColor = '#F57C00';

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <>
            <Button onClick={handleModal}><ArrowDropDownIcon /></Button>
            <Modal
            open={openModal}
            onClose={handleModal}
            >
                        <Box sx={style}>
          <Typography variant="h6">
            Upcoming Appointments
          </Typography>
                      <List 
              sx={{
                maxHeight: "10em",
                overflowY: "auto",
              }}
            >
            {data?.map((date,index) => (
             <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CalendarMonthIcon />
                </Avatar>
              </ListItemAvatar>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 'medium' }}
          >
            {date?.day}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: dateColor}}
          >
            {date?.month}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 'medium' }}
          >
            {date?.year}
          </Typography>
              {/* <ListItemText primary ={date?.day} />
              <ListItemText primary = {date?.month}/>
              <ListItemText primary = {date?.year}/> */}
              </Box>

             </ListItem> 
            ))
            }
            </List> 

        </Box>

            </Modal>
        </>
    )
}

export default ModalPop;