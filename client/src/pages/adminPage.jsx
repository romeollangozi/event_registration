import { Container, Divider} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getStatisticsHook from "../hooks/getStatisticsHook";
import Statistics from "../components/adminComponents/statistics";
import UserTable from "../components/adminComponents/userTable";
import getAllUsers from "../hooks/getAllUsersHook";

const AdminPage = () => {

  const statisticQuery = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatisticsHook,
  });

  const { data } = getAllUsers();
    return (
      <Container sx={{ p: 5 }}>
        <Statistics statistics={statisticQuery.data} />
        <Divider sx={{ mt: 5, mb: 5 }} />
        {data && <UserTable rows={data.users} />}
      </Container>
    );
};

export default AdminPage;
