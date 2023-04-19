import { connect } from "react-redux";
import LoginScreen from "./view";

const mapStateToProps = ({auth}) => ({
  isAuth: auth.isAuth,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
