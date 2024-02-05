import { useMutation } from "@tanstack/react-query";
import React from "react";
import unAttendHook from "../../hooks/unAttendHook";
import { Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const UnRegisterButton = ({ id }) => {
  const unAttendMutation = useMutation({
    mutationFn: unAttendHook
  });
  return (
    <Button
      variant="contained"
      color="grey"
      size="small"
      startIcon={<HighlightOffIcon />}
      disabled={unAttendMutation.isPending}
      onClick={() => unAttendMutation.mutate(id)}
    >
      Unregister
    </Button>
  );
};

export default UnRegisterButton;
