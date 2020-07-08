import React from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  FormHelperText,
  withStyles
} from "@material-ui/core";
import { Panel, PanelBody } from "../../components/Panels";

const styles = theme => ({
  errorMessage: {
    textAlign: "center",
    fontSize: 16
  }
});
class LoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      accountErrorMsg: "",
      password: "",
      passwordErrorMsg: ""
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }

  onKeydown = event => {
    if (event.code === "Enter" || event.code === "NumpadEnter")
      this.handleSubmit();
  };

  handleInputChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  validateValue = ({ account, password }) => {
    const accountErrorMsg = account === "" ? "帐号不可为空" : "";
    const passwordErrorMsg = password === "" ? "密码不可为空" : "";

    return {
      isValid: accountErrorMsg === "" && passwordErrorMsg === "",
      accountErrorMsg,
      passwordErrorMsg
    };
  };

  handleSubmit = () => {
    const { isValid, ...newState } = this.validateValue(this.state);

    if (isValid) {
      const payload = {
        account: this.state.account,
        password: this.state.password
      };

      this.props.handleLogin(payload);
    }
    this.setState(state => ({ ...state, ...newState }));
  };

  render() {
    const { auth, classes } = this.props;

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eee" }}
      >
        <Panel
          style={{
            width: "400px",
            textAlign: "center",
            paddingTop: 80,
            paddingBottom: 80
          }}
        >
          <div>
            
            <Typography
              variant="h6"
              style={{ color: "#c1c1c1", fontWeight: 200 }}
            >
              {"AURORA TEMPLATE"}
            </Typography>
          </div>
          <PanelBody>
            <div>
              <TextField
                error={this.state.accountErrorMsg !== ""}
                style={{ width: "60%" }}
                name="account"
                label="帐号"
                value={this.state.account}
                placeholder="请输入帐号"
                onChange={this.handleInputChange}
                margin="normal"
              />
              <FormHelperText error className={classes.errorMessage}>
                {this.state.accountErrorMsg}
              </FormHelperText>
            </div>
            <div>
              <TextField
                error={this.state.passwordErrorMsg !== ""}
                style={{ width: "60%" }}
                className={"textField"}
                name="password"
                label="密码"
                value={this.state.password}
                placeholder="请输入密码"
                onChange={this.handleInputChange}
                margin="normal"
                type="password"
              />
              <FormHelperText error className={classes.errorMessage}>
                {this.state.passwordErrorMsg}
              </FormHelperText>
            </div>
            <FormHelperText
              error={auth.get("loginErrorMsg") !== ""}
              className={classes.errorMessage}
            >
              {auth.get("loginErrorMsg")}
            </FormHelperText>
            <div style={{ marginTop: 20 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={this.handleSubmit}
              >
                登录
              </Button>
            </div>
            <div style={{ marginTop: 20 }}>
              <Typography variant="subtitle1">VERSION</Typography>
            </div>
          </PanelBody>
        </Panel>
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginScreen);
