import React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Box,
  Typography,
  Table,
  Collapse,
  TableHead,
  TableBody,
  Chip,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useDeleteUserHook from "../../hooks/deleteUserHook";
import { useState } from "react";
import DialogModal from "../dialogModal";
import EventRow from "./eventRow";


const UserRow = (props) => {
  const deleteUserMutation = useDeleteUserHook();

  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const role = () => {
    if (row.isAdmin) {
      return "Admin";
    } else if (row.organizedEvents.length > 0) {
      return "Organizer";
    } else {
      return "Attendee";
    }
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.firstName} {row.lastName}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{role()}</TableCell>
        <TableCell align="left">{row.phoneNumber}</TableCell>
        <TableCell align="center">{row.myEvents.length}</TableCell>
        <TableCell align="center">{row.organizedEvents.length}</TableCell>
        <TableCell align="left" disabled>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            disabled={row.organizedEvents.length == 0}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" disabled>
          <Chip
            label="Delete"
            onClick={handleClickOpen}
          ></Chip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                align="center"
              >
                {row.firstName} Events
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell align="left">Event date</TableCell>
                    <TableCell align="left">Duration</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Attendees</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.organizedEvents.map((event) => {
                    return <EventRow event={event} />;
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DialogModal
        open={openModal}
        handleClose={handleClose}
        id={row.id}
        mutation={deleteUserMutation}
      />
    </React.Fragment>
  );
};

export default UserRow;
