import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add.js";
import { NewEventModal } from "../components/userComponents/newEventModal.jsx";
import { Container } from "@mui/material";
import { organizedEventsHook } from "../hooks/organizedEventsHook.js";
import { useQuery } from "@tanstack/react-query";
import CardContainer from "../components/homeComponents/cardContainer.jsx";
import CircularProgress from "@mui/material/CircularProgress";

const UserEventsPage = () => {
  const [isNewModalOpen, setNewModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["organizedEvents"],
    queryFn: organizedEventsHook,
  });

  const openNewModal = () => {
    setNewModalOpen(true);
  };

  const closeNewModal = () => {
    setNewModalOpen(false);
  };
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
      <Container sx={{ paddingTop: 5 }}>
        <CardContainer events={data} cardType={"user"}></CardContainer>
        <div style={{ position: "fixed", right: 16, bottom: 20 }}>
          <Fab color="primary" aria-label="add" onClick={openNewModal}>
            <AddIcon />
          </Fab>
        </div>
        <NewEventModal open={isNewModalOpen} onClose={closeNewModal} />
      </Container>
    );
  }
};

export default UserEventsPage;
