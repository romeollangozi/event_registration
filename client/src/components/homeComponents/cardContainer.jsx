import Grid from "@mui/material/Grid";
import EventCard from "../cardComponents/eventCard.jsx";

const CardContainer = ({ events, cardType }) => {
  return (
    <Grid container spacing={10}>
      {events.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event.id}>
          <EventCard {...event} cardType={cardType} key={event.id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardContainer;
