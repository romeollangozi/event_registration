import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const CardsPagination = ({page, handleChange}) => {
  return (
    <Stack spacing={2}>
      <Pagination size='large' count={Math.ceil(page / 6)} onChange={(e, value)=>handleChange(value)} />
    </Stack>
  );
};

export default CardsPagination;
