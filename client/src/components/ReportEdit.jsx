import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { loadStatuses } from '../redux/features/statuses.redux';
import TextField from '@material-ui/core/TextField';
import { editReport } from '../redux/features/reports.redux';
import Preloader from './Preloader';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    margin: 'auto',
    width: 'fit-content',
  },
  input: {
    width: 350,
  },
  formControl: {
    marginTop: theme.spacing(5),
    minWidth: 20,

  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function ReportEdit({ report }) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [status, setStatus] = useState('');
  const statuses = useSelector((state) => state.statuses.items);
  const dispatch = useDispatch();
  const [reportText, setReportText] = useState(report.report);
  const loading = useSelector((state) => state.reports.loading);

  useEffect(() => {
    dispatch(loadStatuses());
  }, [dispatch]);


  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    dispatch(editReport(report._id, { reportText, status }));
  };
  const handleChangeReport = (even) => {
    setReportText(even.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  if (loading) {
    return (
    <Preloader/>
    );
  }

  return (
    <React.Fragment >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Изменить
      </Button>
      <Dialog
        fullWidth={fullWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent >
          <DialogContentText>
            Введите текст отчета
          </DialogContentText>
          <TextField
            className={classes.input}
            label="Комментарий"
            variant="outlined"
            value={reportText}
            name="text"
            onChange={handleChangeReport}
          />
          <form className={classes.form} noValidate>
            <FormControl  className={classes.formControl}>
              <InputLabel htmlFor="max-width">Статус</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={handleChangeStatus}
                SelectProps={{
                  native: true,
                }}
              >
                {statuses.map((item) => (
                  <MenuItem key={item.value} value={item._id}>
                    {item.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleEdit}
              color="primary"
            >
              Сохранить
            </Button>
          </form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}