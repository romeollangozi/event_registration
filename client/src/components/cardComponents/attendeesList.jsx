import {
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import useRemoveAttendee from "../../hooks/removeAttendeeHook";

const AttendeeList = ({ attendees, eventId }) => {
  const list = [];

  const deleteAttendee = useRemoveAttendee();

  attendees.map((attendee) => {
    list.push(
      <>
        <ListItem>
          <ListItemText gutterBottom key={attendee.id}>
            <Typography color='textSecondary'>
              {`${attendee.firstName} ${attendee.lastName}`}
            </Typography>
          </ListItemText>
          <Chip
            label="Remove"
            onClick={() =>
              deleteAttendee.mutate({ eventId, attendeeId: attendee.id })
            }
            variant="outlined"
          />
        </ListItem>
      </>
    );
  });

  return <List dense>{list}</List>;
};

export default AttendeeList;
