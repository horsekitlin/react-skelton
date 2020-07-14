import colors from './colors';

export const palette = {
  background: {
    default: colors.bodybg,
    paper: colors.white,
  },
  text: {
    primary: colors.greydarker,
    secondary: colors.primary,
  },
  primary: {
    main: colors.primary,
    light: colors.primarylight,
    dark: colors.primarydark,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.secondary,
    light: colors.secondarylight,
    dark: colors.secondarydark,
    contrastText: colors.greydark,
  },
  success: {
    main: colors.success,
    light: colors.successlight,
    dark: colors.successdark,
  },
  warning: {
    main: colors.warning,
    light: colors.warninglight,
    dark: colors.warningdark,
  },
  danger: {
    main: colors.danger,
    light: colors.dangerlight,
    dark: colors.dangerdark,

  },
  info: {
    main: colors.info,
    light: colors.infolight,
    dark: colors.infodark,
  },
  childRow:{
    main: colors.rowmiddle,
    light: colors.rowlight,
    dark: colors.rowdark,
  },
  default: {
    main: colors.greydark,
    light: colors.bodybg,
    dark: colors.greydarker,
  },
}

export default palette;