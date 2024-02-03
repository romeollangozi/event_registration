import { useQuery } from "@tanstack/react-query";
import getAttendingEventsHook from "../hooks/getAttendingEventsHook.js";
import CardContainer from "../components/homeComponents/cardContainer.jsx";
import { Container, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const AttendingEventsPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["attendingEvents"],
    queryFn: getAttendingEventsHook,
  });
  if (isPending) {
    return (
      <Container
        sx={{
          display: "flex",
          pt: 40,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  if (data) {
    return (
      <>
      {data.length === 0 ? <Typography color={"text.secondary"} component={"h2"} sx={{mt: '20%', fontSize: 'h5.fontSize'}}>
            {
              "You are not attending any events go to the home page and go wild!"
            }
          </Typography> : <Container sx={{ pt: 10 }}>
        <CardContainer events={data} cardType={"attendee"} />
      </Container>}
      </>
    );
  }
};

export default AttendingEventsPage;
