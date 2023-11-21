"use client";

import { useEffect, Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import UniversalData from "@/types/universalData";
import Loading from "@/components/shares/loading/Loading";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import useOrders from "@/states/admin/orders";
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

const Orders = () => {
  const {
    total,
    allData,
    loading,
    search,
    getAllData,
    page,
    handleSearch,
    confirm,
    cancel,
  } = useOrders();

  useEffect(() => {
    getAllData(search, page);
  }, [getAllData, search, page]);

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
        <h2 style={{ width: 150 }}>Orders ({total})</h2>
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
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell align="center">Quantity</StyledTableCell>
                <StyledTableCell align="center">Comment</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData?.map((row: UniversalData, i) => (
                <StyledTableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{row.userId}</StyledTableCell>

                  <StyledTableCell align="center">
                    {row.cart.length}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.comment}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{
                      color:
                        row.status === "SUCCESS"
                          ? "green"
                          : row.status === "CANCELED"
                          ? "red"
                          : "blue",
                    }}
                  >
                    {row.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.status !== "ACCEPTED" ? (
                      <Fragment>
                        <CheckIcon
                          className="edit"
                          onClick={() => confirm(row._id)}
                        />
                        <CloseIcon
                          className="delete"
                          onClick={() => cancel(row._id)}
                        />
                      </Fragment>
                    ) : null}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </main>
  );
};

export default Orders;
