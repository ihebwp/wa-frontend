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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); // Navigate hook for redirection

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user")); // Assuming this is the entire object with token and user properties
    const user = data?.user; // Access the user object within the data
    console.log("User from localStorage in UsersList:", user); // Debugging log
    
    // Ensure the user exists and the role is exactly 'admin'
    if (!user || user.role.trim() !== "admin") {
      console.log("Not an admin or no user found, redirecting..."); // Debugging log
      navigate("/login");
    } else {
      // Fetch the users list if the user is admin
      authService.getAllUsers().then((res) => {
        console.log("Users fetched in UsersList:", res); // Debugging log
        if (res) {
          setUsers(res);
        }
      }).catch((err) => {
        console.error("Error fetching users:", err);
      });
    }
  }, [navigate]);
  

  const userDelete = (id) => {
    authService.deleteUser(id)
      .then(() => {
        toast.success("User has been deleted");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // ✅ Correct state update
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error("Failed to delete user");
      });
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
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => userDelete(u._id)}>
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
