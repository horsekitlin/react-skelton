import { connect } from 'react-redux';
import LoginScreen from './view';
import { signInAction } from "actions/authActions";

const mapStateToProps = ({auth}) => ({
    isAuth: auth.isAuth,
  });

const mapDispatchToProps = dispatch => ({
  handleSignIn: payload => {
    dispatch(signInAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);