"use client";

import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import useUser from "@/states/admin/user";
import UseFormInputs from "@/types/formInputs";
import UniversalData from "@/types/universalData";
import Loader from "@/components/shares/loading/Loading";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { LIMIT } from "@/constants";
import SaveIcon from "@mui/icons-material/Save";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import "./style.scss";

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

const Users = () => {
  const {
    total,
    allData,
    loading,
    search,
    getAllData,
    setPage,
    page,
    showModal,
    closeModal,
    isModalOpen,
    selected,
    handleSearch,
    addData,
    updateData,
    getSingleData,
    deleteData,
  } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<UseFormInputs>();

  const onSubmit = (values: UseFormInputs) => {
    if (selected === null) {
      addData(values);
    } else {
      updateData(values, selected);
    }
  };

  const handleEdit = (id: string) => {
    getSingleData(id, reset);
  };

  useEffect(() => {
    getAllData(search, page);
  }, [getAllData, search, page]);

  const pageSize = Math.ceil(total / LIMIT);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <main>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ width: 150 }}>Users ({total})</h2>
        <div className="inputBox">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={search}
            style={{ width: "100%" }}
            onChange={(e) => handleSearch(e)}
          />
          <SearchIcon />
        </div>
        <Button
          variant="contained"
          style={{ width: 100 }}
          endIcon={<AddIcon />}
          onClick={() => showModal(reset)}
        >
          Add
        </Button>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650}}
            aria-label="simple table"
          >
            <TableHead sx={{ backgroundColor: "#008b8b" }}>
              <TableRow>
                <StyledTableCell>Firstname</StyledTableCell>
                <StyledTableCell align="center">Lastname</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Phone number</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData?.map((row: UniversalData, i: number) => (
                <StyledTableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.username}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditIcon
                      className="edit"
                      onClick={() => handleEdit(row._id)}
                    />
                    <DeleteIcon
                      className="delete"
                      onClick={() => deleteData(row._id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div>
        {!loading && total > LIMIT ? (
          <Pagination
            count={pageSize}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        ) : null}
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              size="small"
              id="outlined-basicc"
              {...register("firstName", {
                required: "This field must not be empty!",
              })}
              label="Firstname"
              variant="outlined"
              style={{ width: "100%", marginBottom: "20px" }}
            />

            <TextField
              size="small"
              id="outlined-basiccc"
              {...register("lastName", {
                required: "This field must not be empty!",
              })}
              label="Lastname"
              variant="outlined"
              style={{ width: "100%", marginBottom: "20px" }}
            />

            <TextField
              size="small"
              id="outlined-basicccc"
              {...register("username", {
                required: "This field must not be empty!",
              })}
              label="Username"
              style={{ width: "100%", marginBottom: "20px" }}
              variant="outlined"
            />

            <TextField
              size="small"
              id="outlined-basiccccc"
              {...register("phoneNumber", {
                required: "This field must not be empty!",
              })}
              label="Phone number"
              style={{ width: "100%", marginBottom: "20px" }}
              variant="outlined"
            />

            {selected === null ? (
              <TextField
                size="small"
                id="outlined-basicccccc"
                {...register("password", {
                  required: "This field must not be empty!",
                })}
                label="Password"
                style={{ width: "100%", marginBottom: "20px" }}
                variant="outlined"
              />
            ) : null}

            <div>
              <Button
                variant="contained"
                style={{ width: 100, marginRight: "20px" }}
                type="submit"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ width: 100 }}
                endIcon={selected === null ? <AddIcon /> : <SaveIcon />}
                type="submit"
              >
                {selected === null ? "Add" : "Save"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </main>
  );
};

export default Users;
