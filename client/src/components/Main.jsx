import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { loadObjects } from "../redux/features/objects.redux";

import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  withStyles,
  TableCell,
  Button,
  Avatar,
} from "@material-ui/core";
import { loadStatuses } from "../redux/features/statuses.redux";
import {
  FaCheckCircle,
} from "react-icons/all";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import Preloader from "./Preloader";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  table: {
    backgroundColor: "#674fffc3",
    color: "white",
  },
  paper: {
    position: "fixed",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  link: {
    textDecoration: "none",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  tableCont: {
    marginTop: "20px",
  },
}));

export default function Main() {
  const loading = useSelector((state) => state.objects.loading);
  const dispatch = useDispatch();

  const objects = useSelector((state) => {
    const { objects } = state;

    if (objects.filter === "") {
      return objects.items;
    }


    return objects.items.filter((item) => {
      return (
        item.objectName.toLowerCase().indexOf(objects.filter.toLowerCase()) !==
        -1
      );
    });
  });


  useEffect(() => {
    dispatch(loadObjects());
  }, [dispatch]);

  const statuses = useSelector((state) => state.statuses.items);

  useEffect(() => {
    dispatch(loadStatuses());
  }, [dispatch]);

  const classes = useStyles();

  if (loading) {
    return <Preloader />;
  }

  return (
    <Paper elevation={3} className={classes.tableCont} component={Paper}>
      <Table aria-label="customized table">
        <TableHead align="center">
          <TableRow className={classes.table}>
            <StyledTableCell className={classes.table} align="left">
              {" "}
            </StyledTableCell>
            <StyledTableCell className={classes.table} align="center">
              Название объекта
            </StyledTableCell>
            <StyledTableCell className={classes.table} align="left">
              Последнее изменение
            </StyledTableCell>
            <StyledTableCell className={classes.table} align="left">
              Статус
            </StyledTableCell>
            <StyledTableCell className={classes.table} align="left">
              Записей
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objects.map((row, index) => {
            const element = statuses.find(
              (stat) => stat._id === row.lastReport?.status
            );
            return (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">
                  <Avatar className={classes.avatar}>
                    {" "}
                    <img alt={'img'} width="120" src={row.pathToImage} />{" "}
                  </Avatar>
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <NavLink
                    className={classes.link}
                    to={`/object/${row._id}/report/`}
                  >
                    <StyledTableCell>
                      <Button color="primary">{row.objectName}</Button>
                    </StyledTableCell>
                  </NavLink>
                </StyledTableCell>

                <StyledTableCell align="left">
                  <div>
                    {" "}
                    {dayjs(objects[index].lastReport?.updatedAt).format(
                      "YY.MM.DD HH:mm"
                    )}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  {" "}
                  {objects[index].reports.length > 0 ? (
                    <div>
                      <FaCheckCircle size="30" color={element?.color} />
                      {element?.report}
                    </div>
                  ) : (
                    "Нет Заметок"
                  )}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.reports.length}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
        <TableCell className={classes.tableCell} align="center"></TableCell>
      </Table>
    </Paper>
  );
}
