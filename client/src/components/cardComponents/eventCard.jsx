import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  CardActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import { useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood.js";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth.js";
import AccessTimeIcon from "@mui/icons-material/AccessTime.js";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty.js";
import RegisterButton from "./registerButton.jsx";
import DeleteButton from "./deleteButton.jsx";
import EditButton from "./editButton.jsx";
import EditEventModal from "../userComponents/editEventModal.jsx";
import AttendeeList from "./attendeesList.jsx";
import UnRegisterButton from "./unRegisterButton.jsx";

const EventCard = ({
  id,
  eventName,
  eventDate,
  eventPicture,
  eventLocation,
  eventDescription,
  organizer,
  cardType,
  eventCategory,
  duration,
  attendees,
}) => {
  const parsedDate = new Date(eventDate);
  const formattedDate = parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = parsedDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const [descriptionExpanded, setdescriptionExpanded] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [attendeesExpanded, setAttendeesExpanded] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleDescription = () => {
    setdescriptionExpanded(!descriptionExpanded);
  };

  const handleAttendees = () => {
    setAttendeesExpanded(!attendeesExpanded);
  };
  return (
    <Card>
      <CardMedia component="img" height="140" image={eventPicture} />
      <CardContent>
        <Typography variant="h5" component="div">
          {eventName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <FmdGoodIcon /> {eventLocation}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <CalendarMonthIcon /> {formattedDate}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <AccessTimeIcon /> {formattedTime}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <span>
            <HourglassEmptyIcon /> {duration}
          </span>
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Category: {eventCategory}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Description
          <IconButton
            onClick={handleDescription}
            aria-descriptionExpanded={descriptionExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Typography>
        <Collapse in={descriptionExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ textWrap: "pretty" }} paragraph>
              {eventDescription}
            </Typography>
          </CardContent>
        </Collapse>
        {cardType === "user" ? (
          <>
            <Typography color="textSecondary" gutterBottom>
              Attendees
              <IconButton
                onClick={handleAttendees}
                aria-descriptionExpanded={attendeesExpanded}
                aria-label="show more"
                sx={{ ml: 1 }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Typography>
            <Collapse in={attendeesExpanded} timeout="auto" unmountOnExit>
              <CardContent>
                <AttendeeList attendees={attendees} eventId={id} />
              </CardContent>
            </Collapse>
          </>
        ) : (
          <></>
        )}
        {cardType === "view" ? (
          <Typography color="textSecondary" gutterBottom>
            Organizer: {organizer.firstName}, {organizer.lastName}
          </Typography>
        ) : (
          <></>
        )}
        <CardActions sx={{ justifyContent: "space-around" }}>
          {cardType === "view" ? (
            <RegisterButton id={id} eventName={eventName} />
          ) : cardType === "user" || cardType == "admin" ? (
            <DeleteButton id={id} />
          ) : (
            <></>
          )}
          {cardType === "user" ? (
            <EditButton openModal={openEditModal} />
          ) : (
            <div></div>
          )}
          {cardType === "attendee" ? <UnRegisterButton id={id} /> : <></>}
        </CardActions>
      </CardContent>
      <EditEventModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        props={{
          id,
          eventName,
          eventDate,
          eventPicture,
          eventLocation,
          eventDescription,
          eventCategory,
          duration,
        }}
      />
    </Card>
  );
};

export default EventCard;
