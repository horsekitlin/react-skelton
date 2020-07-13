import React from 'react';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme, } from '@material-ui/core/styles';
import { Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import ProfileMenu from './components/ProfileMenu';
import colors from '../../theme/colors';

const drawerWidth = 200;

const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: colors.bodybg,
    minHeight: '100vh',
    height: '100%',
    fontFamily: theme.typography.fontFamily,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: `box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.72)`,
    borderBottom: '1px solid #2a41ad',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: `0px 0px 3px rgba(0, 0, 0, 0.72)`,
    borderBottom: '1px solid #2a41ad'
  },
  menuButton: {
    marginLeft: 12,
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
    backgroundColor: colors.menubg,
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
    width: 0 ,    
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
    padding: '0 3px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,    
    paddingLeft: 0,
    backgroundColor: colors.bodybg,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
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
    }, 
  },
  divider: {
    borderBottom: `1px solid ${colors.menubgdark}`,
    height:0
  },
  sideBar: {
    borderRight:'1px solid #000'
  },
  infoLogo: {
    width: '172px',
    paddingRight: '8px'
  }
});

const navBar = props => {
  const { classes, theme, auth, nav, snackbar, ...other } = this.props;
  const open = nav.get('isSideBarOpened');
  const employeeName = auth.getIn(['info','employeeName']) || '';
  const roleName = auth.getIn(['info','roleName']) || '';

  return (
    <AppBar
      position='fixed'
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
      })}>
      <Toolbar disableGutters={!open}>
        <IconButton
          color='inherit'
          aria-label='Open drawer'
          onClick={this.handleDrawerOpen}
          className={classNames(classes.menuButton, {
            [classes.hide]: open,
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
  );
};


export default navBar;