import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import Container from "@mui/material/Container";
import { Select } from "@mui/material";
import {InputLabel} from "@mui/material"
import {MenuItem} from "@mui/material"
import useAddEventHook from "../../hooks/addEventHook";

const EventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventLocation: "",
    eventDate: "",
    duration: "",
    eventDescription: "",
    eventPicture: "",
    eventCategory: "",
  });

  const addEventMutation = useAddEventHook();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEventMutation.mutate(formData)
    onClose();
  };


  const selectDuration = () => {
    const durationPicker = []
    for (let i = 1; i <= 9; i++){
      durationPicker.push(<MenuItem value={`0${i}:00:00`}>{i} hour(s)</MenuItem>);
    }
    return durationPicker
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "white", // Set the background color to white or your desired color
          padding: 2, // Add padding to the form
          borderRadius: 4, // Optional: Add border radius for a rounded appearance
          maxWidth: "550px",
        }}
      >
        <TextField
          label="Event Name"
          name="eventName"
          value={formData.eventName}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{
            mb: 2,
          }}
        />
        <TextField
          label="Event Location"
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{
            mb: 2,
          }}
        />
        <TextField
          label="Event Date"
          name="eventDate"
          type="datetime-local"
          value={formData.eventDate}
          onChange={handleInputChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{
            mb: 2,
          }}
        />
        <InputLabel id="duration">Duration</InputLabel>
        <Select
          labelId="duration"
          id="duration"
          name="duration"
          value={formData.duration}
          label="Duration"
          fullWidth
          onChange={handleInputChange}
          sx={{
            mb: 2,
          }}
        >
          {selectDuration()}
        </Select>
        <TextField
          label="Event Description"
          name="eventDescription"
          multiline
          rows={4}
          value={formData.eventDescription}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{
            mb: 2,
          }}
        />
        <TextField
          label="Event Picture URL"
          name="eventPicture"
          value={formData.eventPicture}
          onChange={handleInputChange}
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category-select"
          value={formData.eventCategory}
          onChange={handleInputChange}
          name="eventCategory"
          fullWidth
          required
          sx={{
            mb: 2,
          }}
        >
          {[
            "Art & Culture",
            "Technology",
            "Concert",
            "NightLife",
            "Sports",
          ].map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Event
        </Button>
      </Box>
    </Container>
  );
};

export default EventForm;
