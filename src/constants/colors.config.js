export const Colors = {
  primary: '#3F51B5',
  primarylight: '#4D5EC1',
  primarydark: '#3849A2',
  secondary: '#E83E8C',
  secondarylight: '#EB559A',
  secondarydark: '#E5277E',
  success: '#11BB4A',
  successlight: '#13D253',
  successdark: '#0FA441',
  warning: '#FFC107',
  warninglight: '#FFC721',
  warningdark: '#EDB100',
  danger: '#F44336',
  dangerlight: '#F55A4E',
  dangerdark: '#F32C1E',
  info: '#00BCD4',
  infolight: '#00D3EE',
  infodark: '#00A5BB',
  handling: '#FF913D',
  handlinglight: '#FF9F57',
  handlingdark: '#FF8324',
  logo: '#4869EE',
  logolight: '#5F7CF0',
  logodark: '#3156EC',
  white: '#FFFFFF',
  black: '#000000',
  bodybg: '#F8F9FA',
  greymiddle: '#A1A1A1',
  greyheavy: '#6C757D',
  rowlight:'F9F9F9',
  rowmiddle:'#F6F6F6',
  rowdark:'#E1E1E1',
  menubg: '#212529',
  menubglight: '#2C3237',
  menubgdark: '#16181B',
  transparent: 'transparent',
}

export const AppColors = {
  primary: {
    main: Colors.primary,
    light: Colors.primarylight,
    dark: Colors.primarydark,
    contrastText: Colors.white,
  },
  secondary: {
    main: Colors.secondary,
    light: Colors.secondarylight,
    dark: Colors.secondarydark,
    contrastText: Colors.greymiddle,
  },
  success: {
    main: Colors.success,
    light: Colors.successlight,
    dark: Colors.successdark,
  },
  warning: {
    main: Colors.warning,
    light: Colors.warninglight,
    dark: Colors.warningdark,
  },
  danger: {
    main: Colors.danger,
    light: Colors.dangerlight,
    dark: Colors.dangerdark,

  },
  info: {
    main: Colors.info,
    light: Colors.infolight,
    dark: Colors.infodark,
  },
  childRow:{
    main: Colors.rowmiddle,
    light: Colors.rowlight,
    dark: Colors.rowdark,
  },
  default: {
    main: Colors.greymiddle,
    light: Colors.bodybg,
    dark: Colors.greyheavy,
  }
}

export default Colors;