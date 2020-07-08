import React from 'react';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Toolbar, AppBar, IconButton, Typography, Drawer, Divider, Hidden } from '@material-ui/core';
import ProfileMenu from './components/ProfileMenu';
import SidebarMenu from './components/SidebarMenu';
import Colors from '../../constants/colors.config';
import AlertDialog from './components/AlertDialog';
import ErrorBoundary from '../ErrorBoundary';
import SnackBar from '../Snackbar';

const drawerWidth = 200;
const drawerNotifyWidth = 600;

const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark' // Switching the dark mode on is a single property value change.
  }
});

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: Colors.bodybg,
    minHeight: '100vh',
    height: '100%',
    fontFamily: theme.typography.fontFamily,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: `0px 0px 3px rgba(0, 0, 0, 0.72)`,
    padding: '0px 15px',
    borderBottom: `1px solid ${Colors.primarydark}`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxShadow: `0px 0px 3px rgba(0, 0, 0, 0.72)`,
    borderBottom: `1px solid ${Colors.primarydark}`
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: 0,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: Colors.menubg,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    borderRight: '0px solid #000',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
    backgroundColor: Colors.primary,
    borderBottom: '1px solid #2a41ad',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    paddingLeft: 0,
    backgroundColor: Colors.bodybg,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth
    }
  },
  contentShiftRight: {
    [theme.breakpoints.up('sm')]: {
      marginRight: drawerNotifyWidth,
    }
  },
  divider: {
    borderBottom: `1px solid ${Colors.menubgdark}`,
    height: 0
  },
  sideBar: {
    borderRight: '1px solid #000'
  },
  infoLogo: {
    width: '172px',
    paddingRight: '8px'
  }
});

class LayoutWrapper extends React.PureComponent {
  componentDidMount = () => {
    this.checkWatchMenuOpened();
    this.props.hideAlertDialog();
  }

  showAlertDialog = type => () => {
    this.props.showAlertDialog({
      alertMessage: '是否确定登出？',
      alertType: type,
      level: 'info',
    });
  }

  handleDrawerOpen = () => {
    this.props.sideBarSwitch(true);
    this.checkWatchMenuOpened();
  };

  checkWatchMenuOpened = () => {
    const { location, setWatchMenu } = this.props;
    const pathId = location.pathname.split('/')[1]
    if (pathId !== undefined) setWatchMenu(pathId);
  }

  handleDrawerClose = () => {
    this.props.sideBarSwitch(false);
    this.props.setWatchMenu('');
  };

  handleLogout = () => {

    const { token } = this.props;
    const payload = {
      customHeaders: { Authorization: token }
    };

    this.props.handleLogout(payload);
  }

  handleSnackBarClose = () => {
    this.props.closeSnackBar();
  }

  handleUpdatePassword = () => {
    this.props.history.push({ pathname: `/password` })
  }

  handleAlertConfirm = () => {
    const { alertType } = this.props;

    switch (alertType) {
      case 'LOGOUT':
      case 'PERMISSION_EXPIRED':
        this.handleLogout();
        break;
      default:
        break;
    }

    this.props.hideAlertDialog();
  }

  handleAlertCancel = () => {
    this.props.hideAlertDialog();
  }

  render() {
    const {
      classes,
      theme,
      isAuth,
      watchedMenu,
      isSideBarOpened,
      isAlertDialogOpen,
      alertMessage,
      employeeName,
      roleName,
      open,
      message,
      level,
      ...others
    } = this.props;

    if (!isAuth) {
      return (
        <ErrorBoundary>
          <div className={classes.root}>
            {this.props.children}
          </div>
        </ErrorBoundary>
      );
    }
    return (
      <ErrorBoundary>
        <div className={classes.root}>
          <AlertDialog
            title={alertMessage}
            open={isAlertDialogOpen}
            level={level}
            onConfirm={this.handleAlertConfirm}
            onCancel={this.handleAlertCancel}
          />
          <SnackBar
            open={open}
            message={message}
            level={level}
            onClose={this.handleSnackBarClose}
          />
          <AppBar
            position='fixed'
            className={classNames(classes.appBar, {
              [classes.appBarShift]: isSideBarOpened,
            })}>
            <Toolbar disableGutters={!isSideBarOpened}>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: isSideBarOpened,
                })}>
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant='h6' color='inherit' noWrap>
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton disabled>
                  <Typography variant='subtitle1' style={{ color: '#FFF' }}>
                    {`${employeeName}, ${roleName}`}
                  </Typography>
                </IconButton>
                <ProfileMenu updatePassword={this.handleUpdatePassword} logout={this.showAlertDialog('LOGOUT')} />
              </div>
            </Toolbar>
          </AppBar>
          <MuiThemeProvider theme={darkTheme}>
            <Hidden smUp>
              <Drawer
                variant='temporary'
                className={classNames(classes.drawer, {
                  [classes.drawerOpen]: isSideBarOpened
                })}
                classes={{
                  paper: classNames(classes.drawer, {
                    [classes.drawerOpen]: isSideBarOpened
                  }),
                }}
                onClose={this.handleDrawerClose}
                open={open}>
                <div className={classes.toolbar}>
                  {/* <img className={classes.infoLogo} src={Logo} alt='LOGO'/> */}
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                <Divider className={classes.divider} />
                <SidebarMenu watchedMenu={watchedMenu} {...others} />
              </Drawer>
            </Hidden>
            <Hidden xsDown>
              <Drawer
                variant='permanent'
                className={classNames(classes.drawer, {
                  [classes.drawerOpen]: isSideBarOpened
                })}
                classes={{
                  paper: classNames(classes.drawer, {
                    [classes.drawerOpen]: isSideBarOpened
                  }),
                }}
                open={true}>
                <div className={classes.toolbar}>
                  {/* <img className={classes.infoLogo} src={Logo} alt='LOGO'/> */}
                </div>
                <Divider className={classes.divider} />
                <SidebarMenu watchedMenu={watchedMenu} {...others} />
              </Drawer>
            </Hidden>
          </MuiThemeProvider>
          <main className={classNames(classes.content, {
            [classes.contentShift]: isSideBarOpened,
          })}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LayoutWrapper);
