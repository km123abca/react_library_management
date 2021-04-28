import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

//Making a custom styled component starts
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { orange, green } from "@material-ui/core/colors";
import "fontsource-roboto";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg,#333,#999)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "0 30px",
    marginBottom: "15px",
  },
});
// theme lets us customise everything like h2,p etc (we have to wrap the entire container inside a themeprovider)
const theme = createMuiTheme({
  typography: {
    h5: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "29px",
    },
  },
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: "#b3b3cc",
    },
    ternary: {
      main: "#ff4400",
    },
  },
});
function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}>Test Styled Button</Button>;
}
//making a custom styled component ends

function CheckboxExample() {
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <FormControlLabel
        label="Sample Checkbox"
        control={
          <Checkbox
            checked={checked}
            icon={<DeleteIcon />}
            checkedIcon={<SaveIcon />}
            onChange={() => setChecked(!checked)}
            color="primary"
            inputProps={{
              "aria-label": "checkbox",
            }}
          />
        }
      />
    </div>
  );
}
function MaterialDemo() {
  const [texval, setTexval] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <div>
          {/* APPBAR STARTS */}
          <AppBar color="secondary">
            <Toolbar>
              <IconButton>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">MUI Theming</Typography>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
              <h1 style={{ marginLeft: "20px" }}>hi</h1>
            </Toolbar>
          </AppBar>
          {/* APPBAR ENDS */}
          {/* try other variants like subtitle1,body1 etc */}
          <Typography variant="h5">Welcome to the club</Typography>
          <Typography variant="h5" component="div">
            Check out the component on this one (inspect)
          </Typography>

          <ButtonStyled />

          <TextField
            //   variant="filled"
            // variant="outlined"
            // type="date"
            label="Type something here"
            value={texval}
            placeholder="Sample"
            onChange={(e) => setTexval(e.target.value)}
          />
          <CheckboxExample />
          <ButtonGroup variant="contained">
            <Button
              startIcon={<SaveIcon />}
              endIcon={<SaveIcon />}
              onClick={() => alert(`You typed ${texval}`)}
              size="large"
              //   variant="contained"
              color="primary"
              // style={{ fontSize: 30 }}
            >
              Button
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              endIcon={<DeleteIcon />}
              onClick={() => alert("hello there")}
              size="large"
              //   variant="contained"
              color="secondary"
              // style={{ fontSize: 30 }}
            >
              Discard
            </Button>
          </ButtonGroup>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Grid
            container
            spacing={4}
            style={{ border: "2px solid black" }}
            justify="center"
          >
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: 75, width: "80%" }} />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: 75, width: "80%" }} />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: 75, width: "80%" }} />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={4}
            style={{ border: "2px solid black" }}
            justify="center"
          >
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: 75, width: "80%" }} />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: 75, width: "80%" }} />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Paper style={{ height: 75, width: "80%" }} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default MaterialDemo;
