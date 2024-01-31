import { Modal } from "@mui/material";
import EditForm from "./editForm.jsx";
import  toDatetimeLocal  from "../../../toDateTimeLocal.js";
const EditEventModal = ({ open, onClose, props }) => {
  props.eventDate = toDatetimeLocal(props.eventDate);
  return (
    <Modal open={open} onClose={onClose}>
      <EditForm onClose={onClose} props={props} />
    </Modal>
  );
};

export default EditEventModal;
