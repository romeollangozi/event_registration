import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody} from "@mui/material"
import UserRow from "./userRow";

const UserTable = ({rows}) => {

  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Phone number</TableCell>
            <TableCell align="left">Attending Events</TableCell>
            <TableCell align="left">Organzied Events</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <UserRow key={row.id} row={row} />
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable