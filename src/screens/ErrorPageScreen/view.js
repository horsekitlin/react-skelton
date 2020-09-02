import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import Button from "~/components/Buttons";
import FlatButton from "~/components/Buttons/FlatButton";
import colors from '~/theme/colors';

const styles = theme => ({
  root: {
    height: "100%",
    width: "100%",
    display: "table",
    backgroundColor: colors.bodybg
  },
  infoBox: {
    textAlign: "center",
    verticalAlign: "middle",
    display: "table-cell",
    paddingBottom: 120,
    paddingTop: 150
  },
  icon: {
    fontSize: "9rem",
    marginBottom: 30
  },
  title: {},
  buttonZone: {
    margin: 10,
    marginTop: 40
  },
  button: {
    padding: "8px 30px",
    fontSize: 16
  }
});

const HasLoginButtons = ({ classes, onGoBack, onGoHomePage }) => {
  return (
    <div className={classes.buttonZone}>
      <FlatButton
        color="default"
        style={{ marginRight: 30 }}
        className={classes.button}
        onClick={onGoBack}
      >
        回上一页
      </FlatButton>
      <Button
        color="primary"
        className={classes.button}
        onClick={onGoHomePage}
      >
        回首页
      </Button>
    </div>
  );
};

const HasNotLoginButtons = ({ classes, onGoHomePage }) => {
  return (
    <div className={classes.buttonZone}>
      <Button
        text='回登入页'
        color="primary"
        className={classes.button}
        onClick={onGoHomePage}
      />
    </div>
  );
};

const defaultErrorCode = {
  code: "404",
  message: "Page not found"
};

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);

    const ErrorMessage = this.props.location || defaultErrorCode;

    this.state = {
      errorCode: ErrorMessage.code || "404",
      errorMessage: ErrorMessage.message || "Page not found"
    };
  }

  onGoBack = () => {
    this.props.history.goBack();
  };

  onGoHomePage = () => {
    this.props.history.replace({ pathname: `/` });
  };

  render() {
    const {
      classes,
      auth,
      errorCode = "404",
      errorMessage = "Page not found"
    } = this.props;

    const isAuth = auth.get("isAuth");

    return (
      <div className={classes.root}>
        <div className={classes.infoBox}>
          <WarningIcon className={classes.icon} color={"disabled"} />
          <Typography variant={"h1"}>{errorCode}</Typography>
          <Typography variant={"h5"} style={{ color: "#808080" }}>
            {errorMessage}
          </Typography>
          {isAuth ? (
            <HasLoginButtons
              classes={classes}
              onGoBack={this.onGoBack}
              onGoHomePage={this.onGoHomePage}
            />
          ) : (
            <HasNotLoginButtons
              classes={classes}
              onGoHomePage={this.onGoHomePage}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ErrorPage);
