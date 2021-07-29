import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatuses, postStatus } from "../redux/features/statuses.redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { FaCheckCircle } from "react-icons/all";
import Preloader from './Preloader';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  adminDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  tableCont: {
    height: 600,
    marginTop: "20px",
  },
  symbol: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: "black",
  },
  btn: {
    marginTop: "40px",
    marginBottom: "20px",
  },
  filter: {
    textDecoration: "none",
  },
  tableHead: {
    backgroundColor: "#674fffc3",
  },
  btnAdd: {
    marginTop: 20,
    marginLeft: 600,
  }
}));

function Status(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.statuses.items);
  const loading = useSelector((state) => state.statuses.loading);
  const [open, setOpen] = React.useState(false);
  const [titleText, setTitleText] = useState('');
  const [statColor, setStatColor] = useState('');

  const handleAddTitleText = (e) => {
    setTitleText(e.target.value);
  };

  const handleAddColor = (e) => {
    setStatColor(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadStatuses());
  }, [dispatch]);

  const handlePostStatus = () => {
    dispatch(
      postStatus({
        titleText: titleText,
        statColor: statColor,
      })
    ).then(() => {
      handleClose();
    });
  };
  if (loading) {
    return (
      <Preloader/>
    );
  }
  return (
    <div>
        <TableContainer className={classes.tableCont} component={Paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table className="table">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>Описание</TableCell>
                    <TableCell>Цвет</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {status.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <h3>{item.status}</h3>
                        </TableCell>
                        <FaCheckCircle size="40" color={item?.color} />
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                className={classes.btnAdd}
              >
                Добавить статус
              </Button>
            </Grid>
          </Grid>
        </TableContainer>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Новый статус</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите наименование нового статуса
          </DialogContentText>
          <TextField
            value={titleText}
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            fullWidth
            onChange={handleAddTitleText}
          />
          <TextField
            value={statColor}
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            fullWidth
            onChange={handleAddColor}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handlePostStatus} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Статусы</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
    </div>
  );
}

export default Status;
