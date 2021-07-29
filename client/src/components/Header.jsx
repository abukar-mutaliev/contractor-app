import React  from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Button, InputBase } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setFilterText } from '../redux/features/objects.redux';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: "#b8abab",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: 'blue'
  },
  inputRoot: {
    color: "blue",
  },
  inputInput: {
    borderRadius: 'solid' ,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    backgroundColor: "#fff",
  },
  link: {
    textDecoration: "none",
  },
  active: {
    fontSize: 20,

  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { pathname } = useLocation();
  const filter = useSelector(state => state.objects.filter)

  return (
    <div className={classes.grow}>

      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <NavLink className={classes.link} color="inherit" to={`/`}>
            <Typography
              className={classes.title}
              color="primary"
              variant="h6"
              noWrap
            >
              ИнтоСтрой
            </Typography>
          </NavLink>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={filter}
              placeholder="Поиск объектов…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => dispatch(setFilterText(e.target.value))}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <NavLink className={classes.link} color="inherit" to={`/`}>
              <Button color="primary">Главная</Button>
            </NavLink>
            <NavLink className={classes.link} color="inherit" to={`/admin`}>
              {pathname === "/admin" || pathname === "/status" ? (
                <NavLink
                  color="inherit"
                  className={classes.link}
                  to="/status"
                  activeClassName="active"
                >
                  <Button color="primary">Статусы</Button>
                </NavLink>
              ) : null}
              <Button color="primary">Админка</Button>
            </NavLink>
            <NavLink className={classes.link}  to={`/about`}>
              <Button color="primary">О нас</Button>
            </NavLink>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
