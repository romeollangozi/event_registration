import { useQuery } from "@tanstack/react-query";
import getAttendingEventsHook from "../hooks/getAttendingEventsHook.js";
import CardContainer from "../components/homeComponents/cardContainer.jsx";
import { Container } from "@mui/material";
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
      <Container sx={{ pt: 10 }}>
        <CardContainer events={data} cardType={"attendee"} />
      </Container>
    );
  }
};

export default AttendingEventsPage;
