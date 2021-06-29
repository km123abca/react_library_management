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
import { AddNewMemberDetails } from "./DatabaseFns";
import ModalMessage from "./ModalMessage";

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

function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pword, setPword] = useState("");
  const [pword2, setPword2] = useState("");
  const [idnum, setIdnum] = useState("");
  const [name, setName] = useState("");

  //MODAL CONTROL FUNCTIONS STARTS
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const openModalFn = () => {
    setModalOpen(true);
  };
  const closeModalFn = () => {
    setModalOpen(false);
  };
  //MODAL CONTROL FUNCTIONS ENDS
  const register = (e) => {
    e.preventDefault();
    if (pword != pword2) {
      setModalMsg("passwords dont match");
      setModalOpen(true);
    } else if (!("" + idnum).match(/^[0-9]+-[0-9]+-[0-9]+-[0-9]+$/)) {
      setModalMsg(
        "Your ID number is not valid it should be like 1234-3433-4444-5432"
      );
      setModalOpen(true);
    } else if (!name.match(/^[A-Za-z][a-z]+$/)) {
      setModalMsg("Your Name should only have alphabets");
      setModalOpen(true);
    } else {
      auth
        .createUserWithEmailAndPassword(email, pword)
        .then((auth) => {
          AddNewMemberDetails({ email, idnum, name });
          history.push("/fe");
        })
        .catch((e) => {
          setModalMsg(e.message);
          setModalOpen(true);
        });
    }

    // setEmail("");
    // setPword("");
    // setPword2("");
  };
  return (
    <div>
      <ModalMessage
        modalOpen={modalOpen}
        closeModalFn={closeModalFn}
        bodyContent={modalMsg}
      />
      <Homepage />
      <div>
        <form>
          <div className="row" style={{ marginTop: "100px" }}>
            <div className="col-12" style={{ marginBottom: "20px" }}>
              <FormControl>
                {/* <InputLabel>Email</InputLabel> */}
                <TextField
                  inputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                  }}
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
                {/* <InputLabel>Email</InputLabel> */}
                <TextField
                  inputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                  }}
                  className={classes.textField}
                  value={name}
                  type="text"
                  placeholder="Your Name here"
                  onChange={(event) => {
                    setName(event.target.value);
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
            <div className="col-12" style={{ marginBottom: "20px" }}>
              <FormControl>
                {/* <InputLabel>Password</InputLabel> */}
                <TextField
                  className={classes.textField}
                  value={pword2}
                  type="password"
                  placeholder="Password one more time"
                  onChange={(event) => {
                    setPword2(event.target.value);
                  }}
                />
              </FormControl>
            </div>
            <div className="col-12" style={{ marginBottom: "20px" }}>
              <FormControl>
                {/* <InputLabel>Password</InputLabel> */}
                <TextField
                  className={classes.textField}
                  value={idnum}
                  type="text"
                  placeholder="Your Govt ID Number"
                  onChange={(event) => {
                    setIdnum(event.target.value);
                  }}
                />
              </FormControl>
            </div>
            <div className="col-12">
              <Button
                variant="contained"
                disabled={!email || !pword || !pword2 || !idnum}
                color="primary"
                //   type="submit"
                onClick={register}
                type="submit"
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
