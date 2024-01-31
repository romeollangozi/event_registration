import Modal from "@mui/material/Modal";
import EventForm from "./eventForm.jsx";

export const NewEventModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <EventForm onClose={onClose} />
    </Modal>
  );
};
