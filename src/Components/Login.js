import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
  TextField,
} from "@material-ui/core";
import Homepage from "./Homepage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // container: {
  //   display: "flex",
  //   flexWrap: "wrap",
  // },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: 400,
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pword, setPword] = useState("");
  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, pword)
      .then((auth) => {
        history.push("/fe");
      })
      .catch((e) => alert(e.message));

    setEmail("");
    setPword("");
  };
  return (
    <div>
      <Homepage />
      <div>
        <form>
          <div className="row" style={{ marginTop: "100px" }}>
            <div className="col-12" style={{ marginBottom: "20px" }}>
              <FormControl>
                {/* <InputLabel>Email</InputLabel> */}
                <TextField
                  className={classes.textField}
                  value={email}
                  type="email"
                  placeholder="Your Email here"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </FormControl>
            </div>
            <div className="col-12" style={{ marginBottom: "20px" }}>
              <FormControl>
                {/* <InputLabel>Password</InputLabel> */}
                <TextField
                  className={classes.textField}
                  value={pword}
                  type="password"
                  placeholder="Your Password here"
                  onChange={(event) => {
                    setPword(event.target.value);
                  }}
                />
              </FormControl>
            </div>
            <div className="col-12">
              <Button
                variant="contained"
                disabled={!email || !pword}
                color="primary"
                //   type="submit"
                onClick={login}
                type="submit"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
