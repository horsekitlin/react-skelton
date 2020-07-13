import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
// import { CustomButton } from "../../components/Buttons";
import colors from '../../theme/colors';

const styles = theme => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "table",
    backgroundColor: colors.bodybg
  },
  infoBox: {
    textAlign: "center",
    verticalAlign: "middle",
    display: "table-cell",
    paddingBottom: 120
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

const HasNotLoginButtons = ({ classes, onGoHomePage }) => {
  return (
    <div className={classes.buttonZone}>
      {/* <CustomButton
        color="primary"
        className={classes.button}
        onClick={onGoHomePage}
      >
        回首页
      </CustomButton> */}
    </div>
  );
};

class GlobalErrorPage extends React.Component {
  onGoBack = () => {
    window.history.goBack();
  };

  onGoHomePage = () => {
    window.location.href = "/";
  };

  render() {
    const {
      classes,
      errorCode = "500",
      errorMessage = "Server Error"
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.infoBox}>
          <WarningIcon className={classes.icon} color={"disabled"} />
          <Typography variant={"h1"}>{errorCode}</Typography>
          <Typography variant={"h5"} style={{ color: "#808080" }}>
            {errorMessage}
          </Typography>
          <HasNotLoginButtons
            classes={classes}
            onGoHomePage={this.onGoHomePage}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GlobalErrorPage);
