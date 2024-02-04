import { TableRow, TableCell, Chip } from "@mui/material";
import useDeleteEventHook from "../../hooks/adminDeleteEventHook";
import { useState } from "react";
import DialogModal from "../dialogModal";

const EventRow = ({ event }) => {
  const deleteEventMutation = useDeleteEventHook();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <>
          <TableRow key={event.id}>
            <TableCell component="th" scope="row">
              {event.eventName}
            </TableCell>
            <TableCell>{event.eventLocation}</TableCell>
            <TableCell align="left">
              {new Date(event.eventDate).toLocaleDateString()}
            </TableCell>
            <TableCell align="left">{event.duration}</TableCell>
            <TableCell align="left">{event.eventCategory}</TableCell>
            <TableCell sx={{ pl: 6 }}>{event.attendees.length}</TableCell>
            <TableCell align="left" disabled>
              <Chip
                size="small"
                onClick={handleClickOpen}
                label="Delete"
              ></Chip>
            </TableCell>
            <DialogModal open={open} handleClose={handleClose} id={event.id} mutation={deleteEventMutation}/>
          </TableRow>;
      </>
    );
};

export default EventRow;
