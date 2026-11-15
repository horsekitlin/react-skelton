import { createTheme } from '@mui/material/styles';

/**
 * Material UI 預設主題（完整明列所有預設值）
 *
 * 對照版本：@mui/material 7.3.11 與 9.5.0 的 createTheme() 預設值相同
 * （9.5.0 另外新增 motion.reducedMotion 選項，預設為 'never'，此處未列出）
 *
 * 官方文件：
 *   預設主題  https://mui.com/material-ui/customization/default-theme/
 *   調色盤    https://mui.com/material-ui/customization/palette/
 *   字型      https://mui.com/material-ui/customization/typography/
 *   斷點      https://mui.com/material-ui/customization/breakpoints/
 *   間距      https://mui.com/material-ui/customization/spacing/
 *   z-index   https://mui.com/material-ui/customization/z-index/
 *   轉場動畫  https://mui.com/material-ui/customization/transitions/
 *   元件客製  https://mui.com/material-ui/customization/theme-components/
 *
 * 基礎色共六種語意色：primary、secondary、error、warning、info、success。
 * 每一種色都由四個值組成：main（主色）、light（較亮）、dark（較暗）、contrastText（放在 main 上的文字色）。
 *
 * 使用方式：以此為基底，只覆寫需要改變的欄位，沒有提供的 palette 欄位由 MUI 以預設值補齊：
 *   createTheme({ ...defaultThemeOptions, palette: { primary: { main: '#6a1b9a' } } });
 *   暗色模式只需提供 mode：createTheme({ ...defaultThemeOptions, palette: { mode: 'dark' } });
 *   注意：不要展開 defaultThemeOptions.palette 再改 mode，其中 text、background 等是亮色模式的明確數值，會蓋過 mode 的計算結果。
 */

const fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

export const defaultThemeOptions = {
    // 斷點：由小到大，各值為該斷點生效的最小視窗寬度（px），供 useMediaQuery、sx 與 Grid 的 size 響應式寫法使用
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
        unit: 'px',
    },

    // 文字方向：'ltr' 由左至右，'rtl' 由右至左
    direction: 'ltr',

    // 間距：theme.spacing(n) = n * 8px
    spacing: 8,

    // 形狀：預設元件圓角（px）
    shape: {
        borderRadius: 4,
    },

    palette: {
        // 'light' 亮色模式，'dark' 暗色模式（會自動切換 text、background、action 等）
        mode: 'light',

        // 基礎色（六種語意色）
        // 主要色：品牌主色，Button、Link、Tabs、Switch 等元件的 color 預設為 primary
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
        },

        // 次要色：輔助主色，用於需要與 primary 區分的元件，各元件以 color="secondary" 套用
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
            contrastText: '#fff',
        },

        // 錯誤色：表單驗證失敗、危險操作、需要使用者注意的錯誤訊息
        error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828',
            contrastText: '#fff',
        },

        // 警告色：具潛在風險的操作或重要提醒
        warning: {
            main: '#ed6c02',
            light: '#ff9800',
            dark: '#e65100',
            contrastText: '#fff',
        },

        // 資訊色：中性的提示資訊
        info: {
            main: '#0288d1',
            light: '#03a9f4',
            dark: '#01579b',
            contrastText: '#fff',
        },

        // 成功色：使用者操作成功完成
        success: {
            main: '#2e7d32',
            light: '#4caf50',
            dark: '#1b5e20',
            contrastText: '#fff',
        },

        // 文字色（亮色模式下為黑色加透明度）
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },

        // 背景色：default 為頁面底色，paper 為卡片、選單、對話框等「紙張」表面
        background: {
            paper: '#fff',
            default: '#fff',
        },

        // 分隔線（Divider、表格線、輸入框外框）
        divider: 'rgba(0, 0, 0, 0.12)',

        // 互動狀態色：元件在各種狀態下的顏色與透明度
        action: {
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            hoverOpacity: 0.04,
            selected: 'rgba(0, 0, 0, 0.08)',
            selectedOpacity: 0.08,
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(0, 0, 0, 0.12)',
            focusOpacity: 0.12,
            activatedOpacity: 0.12,
        },

        // 灰階：50 到 900 為由淺至深，A100 到 A700 為強調灰
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
            A100: '#f5f5f5',
            A200: '#eeeeee',
            A400: '#bdbdbd',
            A700: '#616161',
        },

        // 黑與白：不隨 mode 改變的固定色
        common: {
            black: '#000',
            white: '#fff',
        },

        // 對比門檻：決定 contrastText 使用白字或深色字；數值越大，越多背景色會被視為「亮色」而使用深色字（預設 3，即 3:1 對比）
        contrastThreshold: 3,

        // 色階偏移：自訂顏色只提供 main 時，用此值自動計算 light 與 dark（預設 0.2，僅適用自訂色）
        tonalOffset: 0.2,
    },

    typography: {
        fontFamily,
        // 基準字級（px）：用於換算 body1 等變體的 rem 值，預設 14
        fontSize: 14,
        // <html> 的字級（px）：瀏覽器預設 16，rem 換算以此為基準
        htmlFontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,

        // 字型變體：h1 到 h6 為標題，subtitle 為副標題，body 為內文，button、caption、overline 為特殊用途
        h1: {
            fontFamily: fontFamily,
            fontWeight: 300,
            fontSize: '6rem',
            lineHeight: 1.167,
            letterSpacing: '-0.01562em',
        },

        h2: {
            fontFamily: fontFamily,
            fontWeight: 300,
            fontSize: '3.75rem',
            lineHeight: 1.2,
            letterSpacing: '-0.00833em',
        },

        h3: {
            fontFamily: fontFamily,
            fontWeight: 400,
            fontSize: '3rem',
            lineHeight: 1.167,
            letterSpacing: '0em',
        },

        h4: {
            fontFamily: fontFamily,
            fontWeight: 400,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
        },

        h5: {
            fontFamily: fontFamily,
            fontWeight: 400,
            fontSize: '1.5rem',
            lineHeight: 1.334,
            letterSpacing: '0em',
        },

        h6: {
            fontFamily: fontFamily,
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.6,
            letterSpacing: '0.0075em',
        },

        subtitle1: {
            fontFamily: fontFamily,
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.75,
            letterSpacing: '0.00938em',
        },

        subtitle2: {
            fontFamily: fontFamily,
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.57,
            letterSpacing: '0.00714em',
        },

        body1: {
            fontFamily: fontFamily,
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
        },

        body2: {
            fontFamily: fontFamily,
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
        },

        button: {
            fontFamily: fontFamily,
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.75,
            letterSpacing: '0.02857em',
            textTransform: 'uppercase',
        },

        caption: {
            fontFamily: fontFamily,
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66,
            letterSpacing: '0.03333em',
        },

        overline: {
            fontFamily: fontFamily,
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 2.66,
            letterSpacing: '0.08333em',
            textTransform: 'uppercase',
        },

        inherit: {
            fontFamily: 'inherit',
            fontWeight: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            letterSpacing: 'inherit',
        },
    },

    // 陰影：共 25 層（索引 0 到 24），theme.shadows[n] 或 elevation={n}
    shadows: [
        'none',
        '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
        '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
        '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
        '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
        '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
        '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
        '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
        '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
        '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
        '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
        '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
        '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
        '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
        '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
        '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
        '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
        '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
        '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
        '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
        '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
        '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
        '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    ],

    // 轉場動畫
    transitions: {
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
        // 動畫時間（毫秒）
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
    },

    // 層級（z-index）：數字越大越上層
    zIndex: {
        mobileStepper: 1000,
        fab: 1050,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },

    // 預設的 Toolbar 高度：手機 56px，橫向手機 48px，寬度 600px 以上 64px
    mixins: {
        toolbar: {
            minHeight: 56,
            '@media (min-width:0px)': {
                '@media (orientation: landscape)': {
                    minHeight: 48,
                },
            },
            '@media (min-width:600px)': {
                minHeight: 64,
            },
        },
    },
};

export default createTheme(defaultThemeOptions);
