import React, { forwardRef } from "react";
import { useStateValue } from "../StateProvider";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  cstyle: {
    backgroundColor: "#99ffff",
  },
}));

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username == message.username;
  const classes = useStyles();
  let tStamp = message.timestamp ? message.timestamp.seconds : 1602412075;
  tStamp = new Date(tStamp * 1000).toLocaleDateString();
  tStamp = [
    tStamp.split("/")[1],
    tStamp.split("/")[0],
    tStamp.split("/")[2],
  ].join("-");
  return (
    <div
      ref={ref}
      className={
        isUser
          ? "offset-lg-2 col-lg-6 col-md-8 col-sm-12 col-xs-12"
          : "offset-lg-3 col-lg-6 col-md-8 col-sm-12 col-xs-12"
      }
      style={{
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <Card>
        <CardContent className={isUser ? classes.cstyle : null}>
          <div style={{ margin: "0 px", display: "flex" }}>
            <span
              style={{
                marginRight: "auto",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              {message.username}
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              {tStamp}
            </span>
          </div>
          <Typography
            variant="body1"
            component="h2"
            style={{ textAlign: "left", fontSize: "14px !important" }}
          >
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
