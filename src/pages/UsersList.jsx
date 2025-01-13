import React, { useEffect, useState } from "react";
import authService from "../services/authService";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Chip, Container, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Appbar from "./../components/Appbar";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import deleteUser from "../services/authService.js"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch(); // Moved useDispatch inside functional component

  useEffect(() => {
    authService.getAllUsers().then((res) => {
      if (res) {
        console.log("users liste", res);
        setUsers(res);
      }
    });
  }, []);

  const userDelete = () => {
    dispatch(deleteUser());
    toast.success("user has been deleted");
  };

  return (
    <>
      <Appbar />
      <Container sx={{ marginTop: "20%", marginBottom: "20%" }} maxWidth="xl">
        <Box>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, marginBottom: "20%" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nom et prénom</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Role</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <StyledTableRow key={u._id}>
                    <StyledTableCell component="th" scope="row">
                      {u.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{u.email}</StyledTableCell>
                    <StyledTableCell align="right">{u.role}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={userDelete}>
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Divider>
        <Chip label="Users list" size="small" />
      </Divider>
    </>
  );
};

export default UsersList;
