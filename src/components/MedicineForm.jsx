import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import { supabase } from "../../SupabaseClient"; 
import { useSelector } from "react-redux"; 

const MedicineForm = () => {
  const [medicines, setMedicines] = useState([
    { name: "", days: "" },
  ]);

  const userId = useSelector((state) => state.userInfo.user_id);

  const handleChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", days: "" }]);
  };
const handleSubmit = async () => {
    const rowsToInsert = medicines.map((med) => ({
      user_id: userId,
      name: med.name,
      days: parseInt(med.days)
    }));

    const { data, error } = await supabase
      .from("medicine_tracker")
      .insert(rowsToInsert);

    if (error) {
      console.error("Error inserting medicines:", error);
      alert("Something went wrong while saving.");
    } else {
      console.log("Saved successfully:", data);
      alert("Medicines saved!");
      setMedicines([{ name: "", days: "" }]); 
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Track Your Medicines
      </Typography>

      {medicines.map((med, index) => (
        <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={`Medicine ${index + 1}`}
              value={med.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number of Days"
              type="number"
              value={med.days}
              onChange={(e) => handleChange(index, "days", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Button variant="outlined" onClick={addMedicine} sx={{ mt: 2, mr: 2 }}>
        Add Another
      </Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default MedicineForm;