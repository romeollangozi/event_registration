import { Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useMutation } from "@tanstack/react-query";
import deleteEventHook  from "../../hooks/deleteEventHook";
import toast from "react-hot-toast";
import DialogModal from "../dialogModal";
import { useState } from "react";

const DeleteButton = ({ id }) => {
  const deleteCardMutation = useMutation({
    mutationFn: deleteEventHook,
    onSucces: () => {
      toast.success("Event deleted");
    },
  });

  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="grey"
        size="small"
        startIcon={<HighlightOffIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <DialogModal mutation={deleteCardMutation} open={openModal} handleClose={handleClose} id={id} />
    </>
  );
};

export default DeleteButton;
