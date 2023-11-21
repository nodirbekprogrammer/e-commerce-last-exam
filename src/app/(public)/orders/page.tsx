"use client"

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
import UniversalData from "@/types/universalData";
import Loading from "@/components/shares/loading/Loading";
import useAuth from "@/states/auth";

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

const OrdersTable = () => {
  const { total, allData, payLoading: loading, getAllData } = useAuth();

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <>
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
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="center">Products</StyledTableCell>
                <StyledTableCell align="center">Comment</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData?.map((row: UniversalData, i: number) => (
                <StyledTableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
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
                    {row.cart.length}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.comment}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default OrdersTable;
