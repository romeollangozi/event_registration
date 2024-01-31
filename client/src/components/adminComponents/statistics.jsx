import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Groups2Icon from "@mui/icons-material/Groups2";
import { Container, Stack, Box, Typography } from "@mui/material";

const Statistics = ({statistics}) => {
  const DemoPaper = styled(Paper)(() => ({
    height: 120,
    padding: 5,
    textAlign: "center",
    display: "flex",
  }));

  if(statistics){
  return (
    <Container
      fullwidth
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Stack direction={"row"} sx={{ display: "flex", gap: 5 }}>
        <DemoPaper elevation={3}>
          <PermIdentityIcon
            sx={{
              bgcolor: "info.main",
              color: "white",
              fontSize: "120px",
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
              p: 0,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "h4.fontSize" }}>
              {statistics.totalUsers}
            </Typography>
            <Typography
              sx={{
                ml: 2,
                fontWeight: "bold",
                fontSize: "h4.fontSize",
                color: "text.disabled",
              }}
            >
              Users
            </Typography>
          </Box>
        </DemoPaper>
        <DemoPaper elevation={3}>
          <CelebrationIcon
            sx={{
              bgcolor: "warning.main",
              color: "white",
              fontSize: "120px",
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
              p: 0,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "h4.fontSize" }}>
              {statistics.totalEvents}
            </Typography>
            <Typography
              sx={{
                ml: 2,
                fontWeight: "bold",
                fontSize: "h4.fontSize",
                color: "text.disabled",
              }}
            >
              Events
            </Typography>
          </Box>
        </DemoPaper>
        <DemoPaper elevation={3}>
          <Groups2Icon
            sx={{
              bgcolor: "success.main",
              color: "white",
              fontSize: "120px",
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
              p: 0,
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "h4.fontSize" }}>
              {statistics.totalAttendees}
            </Typography>
            <Typography
              sx={{
                ml: 2,
                fontWeight: "bold",
                fontSize: "h4.fontSize",
                color: "text.disabled",
              }}
            >
              Attendees
            </Typography>
          </Box>
        </DemoPaper>
      </Stack>
    </Container>
  );
            }
};

export default Statistics;
