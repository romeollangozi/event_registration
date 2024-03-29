import { Button } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useMutation } from "@tanstack/react-query";
import { addParticipant } from "../../hooks/addParticipantHook";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";


const RegisterButton = ({ id, eventName }) => {
  const registerMutation = useMutation({
    mutationFn: addParticipant,
    onSuccess: () => {
      toast.success(`You are now attending ${eventName}`);
    },
  });

  return (
    <Button
      variant="contained"
      color="grey"
      size="small"
      disabled={registerMutation.isPending}
      startIcon={<AppRegistrationIcon />}
      onClick={() => registerMutation.mutate(id)}
    >
      Register
    </Button>
  );
};

export default RegisterButton;
