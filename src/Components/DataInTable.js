import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function DataInTable({ bodyContent }) {
  let headerTitles = [
    "Borrower",
    "Number of Copies Unreturned",
    "Date of Checkout",
  ];
  //   let bodyContent = [
  //     ["kitchu", "1/2/2021", 3],
  //     ["Sam", "1/2/2021", 3],
  //     ["Taymazov", "1/2/2021", 3],
  //   ];
  let alignments = ["left", "right", "right"];
  const classes = useStyles();
  //   if (bodyContent.length == 0) return null;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerTitles.map((htitle, index) =>
              index == 0 ? (
                <StyledTableCell key={index}>{htitle}</StyledTableCell>
              ) : (
                <StyledTableCell align="right" key={index}>
                  {htitle}
                </StyledTableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyContent.map((bc, ind) => (
            <StyledTableRow key={ind}>
              {bc.map((bcchild, index) => (
                <TableCell key={index} align={alignments[index]}>
                  {bcchild}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataInTable;
