import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { loadStatuses } from "../redux/features/statuses.redux";
import { loadReports, postReport } from "../redux/features/reports.redux";
import { useParams } from "react-router-dom";
import { loadObjects } from "../redux/features/objects.redux";
import { Helmet } from "react-helmet";
import ReportEdit from "./ReportEdit";
import Preloader from "./Preloader";
import { FaCheckCircle } from "react-icons/all";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: 160,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(3),
    marginLeft: 150,
    width: 600,
    height: 300,
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    minHeight: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonAdd: {
    height: 30,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  tableCont: {
    textAlign: "center",
    margin: "auto",
    marginTop: "20px",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function Report() {
  const { id } = useParams();
  const [report, setReport] = useState('');
  const [status, setStatus] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statuses.items);
  const reports = useSelector((state) => state.reports.items);
  const loading = useSelector((state) => state.reports.loading);

  useEffect(() => {
    dispatch(loadStatuses());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadObjects());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadReports(id));
  }, [dispatch]);

  const object = useSelector((state) => {
    return state.objects.items.find((item) => item._id === id);
  });

  const handlePost = (id) => {
    dispatch(postReport(id, { report, status }));
  };

  const handleChangeReport = (even) => {
    setReport(even.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <Paper elevation={3} className={classes.tableCont} component={Paper}>
      <Typography variant="overline" display="block" gutterBottom>
        {object?.objectName}
      </Typography>
      <img alt={'img'} width="600" src={object?.pathToImage} />
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              variant="inline"
              align="center"
              display="block"
              gutterBottom
            >
              {object?.objectDescription}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper className={classes.container}>
        <form className={classes.root} noValidate>
          <ThemeProvider theme={theme}>
            <TextField
              className={classes.margin}
              label="Комментарий"
              variant="outlined"
              value={report}
              name="text"
              onChange={handleChangeReport}
            />
          </ThemeProvider>
        </form>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Статус</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={handleChangeStatus}
            SelectProps={{
              native: true,
            }}
          >
            {<option>Выберите статус</option>}
            {statuses.map((item) => (
              <MenuItem key={item.value} value={item._id}>
                {item.status}
              </MenuItem>
            ))}
          </Select>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => handlePost(object._id)}
              variant="contained"
              type="submit"
              color="primary"
              className={classes.buttonAdd}
            >
              Добавить
            </Button>
          </ThemeProvider>
        </FormControl>
      </Paper>

      <Paper elevation={3} className={classes.tableCont} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Статус обращения</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>Изменить</TableCell>
            </TableRow>
          </TableHead>
          {reports.map((item, index) => {
            const element = statuses.find((elem) => elem._id === item.status);
            return (
              <TableBody>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <FaCheckCircle size="40" color={element?.color} />
                  <h4>{element?.status}</h4>
                  <TableCell>{item.report}</TableCell>
                  <TableCell>
                    <ReportEdit report={item} />
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </Paper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Объекты</title>
        <link rel="canonical" href="http://localhost:5556/" />
      </Helmet>
    </Paper>
  );
}
