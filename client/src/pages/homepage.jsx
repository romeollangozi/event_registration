import { useQuery } from "@tanstack/react-query";
import CardContainer from "../components/homeComponents/cardContainer.jsx";
import { Container, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllEvents } from "../hooks/getAllEventsHook.js";
import { useState } from "react";
import SearchBar from "../components/homeComponents/searchBar.jsx";
import CardsPagination from "../components/homeComponents/pagination.jsx";
import SvgComponent from "../components/SvgComponent.jsx";
import StickyFooter from "../components/Footer.jsx";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: ["allEvents", page],
    queryFn: getAllEvents,
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
    const filteredEvents = data.allEvents.filter((event) =>
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <>
        <Container>
          <Box
            sx={{
              overflow: "hidden",
              width: "1000px",
              height: "auto",
            }}
          >
            <SvgComponent />
          </Box>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <CardContainer events={filteredEvents} cardType={"view"} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              p: 5,
            }}
          >
            <CardsPagination page={data.event_number} handleChange={setPage} />
          </Box>
        </Container>
        <StickyFooter />
      </>
    );
  }
};

export default HomePage;
