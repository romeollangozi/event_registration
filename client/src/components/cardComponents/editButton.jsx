import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
const EditButton = ({openModal}) => {
  return (
    <Button
      variant="contained"
      color="grey"
      size="small"
      startIcon={<EditIcon />}
      onClick={openModal}
    >
      Edit
    </Button>
  );
};

export default EditButton;
