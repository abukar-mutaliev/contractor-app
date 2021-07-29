import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  loadObjects,
  postObject,
  removeObject,
} from "../redux/features/objects.redux";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Preloader from "./Preloader";
import { AiFillDelete } from 'react-icons/all';
import { Helmet } from 'react-helmet';

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
  table: {
    minWidth: 700,
    width: '100%',
    margin: 'auto'
  },
  tableRow: {
    backgroundColor: "#674fffc3",
  },
  adminDiv: {
    width: '100%',
    marginTop: 30,
    margin: 'auto'
  },
  tableCont: {
    width: '100%',
    marginTop: "20px",
    margin: 'auto'
  },
  btnAdd: {
    width: 255,
    height: 50,
    margin: 'auto'
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}))

export default function Administration() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const loading = useSelector((state) => state.objects.loading);

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (id) => {
    dispatch(removeObject(id));
  };
  const handleAddName = (e) => {
    setName(e.target.value);
  };
  const handleAddAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleAddDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleAddImage = (e) => {
    setImage(e.target.value);
  };
  const handleAddSObject = () => {
    dispatch(
      postObject({
        name,
        address,
        description,
        image,
      })
    ).then(() => {
      handleClose();
    });
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <Paper elevation={3} className={classes.tableCont} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow className={classes.adminDiv}>
            <StyledTableCell
              className={classes.tableRow}
              align="right"></StyledTableCell>
            <StyledTableCell className={classes.tableRow}></StyledTableCell>
            <StyledTableCell className={classes.tableRow} align="left">
              Название Проекта
            </StyledTableCell>
            <StyledTableCell
              className={classes.tableRow}
              align="right"></StyledTableCell>
            <StyledTableCell
              className={classes.tableRow}
              align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objects.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <Avatar className={classes.avatar}>
                <img alt={'img'} width="190" src={row.pathToImage}/>{" "}
              </Avatar>
              <StyledTableCell align="left">{row.objectName}</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>

              <StyledTableCell align="left">

                <Button color="primary" onClick={() => handleRemove(row._id)}>
                  <AiFillDelete size='30' color='red'/>
                </Button>

              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Paper className={classes.btnAdd} elevation={3}>
        <Button className={classes.btnAdd} variant="outlined" color="primary" onClick={handleClickOpen}>
          Добавить новый Объект
        </Button>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Добавить новый Объект</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите данные объекта</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="objectName"
            label="Название объекта"
            variant="outlined"
            type="text"
            fullWidth
            value={name}
            onChange={handleAddName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Адрес Объекта"
            type="text"
            name="address"
            fullWidth
            value={address}
            onChange={handleAddAddress}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Описание объекта"
            type="text"
            fullWidth
            value={description}
            onChange={handleAddDescription}
          />
          <TextField
            value={image}
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            fullWidth
            onChange={handleAddImage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            закрыть
          </Button>
          <Button onClick={handleAddSObject} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Администратор</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
    </Paper>
  );
}
