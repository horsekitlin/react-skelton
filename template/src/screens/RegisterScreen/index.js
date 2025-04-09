import { connect } from "react-redux";
import RegisterScreen from "./view";

const mapStateToProps = ({customization}) => ({
  isOpen: customization.opened,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
