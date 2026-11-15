# React Skeleton

後台前端骨架：以 Vite 產生 React 專案，並套用 `template/admin` 的樣板與 `lastest/admin/add_packages.sh` 的套件版本。

## 主題（Material UI Theme）

主題的完整預設值明列在 `template/admin/themes/defaultTheme.js`（產出專案中的位置為 `src/themes/defaultTheme.js`）。

- 此檔是 Material UI 官方預設主題的完整明列，可作為自訂主題的基底，**專案目前實際套用的是 Berry 主題**（`themes/index.js`，由 `App.js` 載入），`defaultTheme.js` 預設沒有被 App 使用。
- 對照版本：`@mui/material` 7.3.11 與專案使用的 9.5.0，兩者 `createTheme()` 的預設值經逐欄比對**完全相同**；9.5.0 僅多了內部欄位與 `motion.reducedMotion`（預設 `'never'`，檔案中未列出）。
- `themes/__tests__/defaultTheme.test.js` 會比對此檔與函式庫的 `createTheme()` 預設值，升級 MUI 後若預設值改變，測試會失敗。
- 本檔在執行 `init_project.sh` 後會被移除（產出專案使用 Vite 產生的 README），所以主題的重點說明同時寫在 `defaultTheme.js` 的檔頭註解。

官方文件：

| 主題 | 網址 |
|---|---|
| 預設主題 | https://mui.com/material-ui/customization/default-theme/ |
| 調色盤 | https://mui.com/material-ui/customization/palette/ |
| 字型 | https://mui.com/material-ui/customization/typography/ |
| 斷點 | https://mui.com/material-ui/customization/breakpoints/ |
| 間距 | https://mui.com/material-ui/customization/spacing/ |
| z-index | https://mui.com/material-ui/customization/z-index/ |
| 轉場動畫 | https://mui.com/material-ui/customization/transitions/ |
| 元件客製 | https://mui.com/material-ui/customization/theme-components/ |
| 暗色模式 | https://mui.com/material-ui/customization/dark-mode/ |

### 基礎色：六種語意色

官方文件定義的語意色（color intentions）共有**六種**，不是五種：`primary`、`secondary`、`error`、`warning`、`info`、`success`。

| 色名 | 用途（依官方說明） |
|---|---|
| `primary` | 主要的介面元素，品牌主色；多數元件的 `color` 預設為 primary |
| `secondary` | 次要的介面元素，用於需要與 primary 區分的地方，元件以 `color="secondary"` 套用 |
| `error` | 使用者必須注意的元素，例如表單驗證失敗、錯誤訊息 |
| `warning` | 具潛在風險的操作或重要訊息 |
| `info` | 突顯中性的提示資訊 |
| `success` | 使用者觸發的操作成功完成 |

每一種色都由四個值組成：

| token | 意義 |
|---|---|
| `main` | 基準色，元件最常使用的顏色 |
| `light` | 比 `main` 亮的版本，常用於 hover、淺色背景 |
| `dark` | 比 `main` 暗的版本，常用於按下、強調邊框 |
| `contrastText` | 放在 `main` 背景上的文字色，確保可讀性 |

預設值（亮色模式）：

| 色名 | `main` | `light` | `dark` | `contrastText` |
|---|---|---|---|---|
| `primary` | `#1976d2` | `#42a5f5` | `#1565c0` | `#fff` |
| `secondary` | `#9c27b0` | `#ba68c8` | `#7b1fa2` | `#fff` |
| `error` | `#d32f2f` | `#ef5350` | `#c62828` | `#fff` |
| `warning` | `#ed6c02` | `#ff9800` | `#e65100` | `#fff` |
| `info` | `#0288d1` | `#03a9f4` | `#01579b` | `#fff` |
| `success` | `#2e7d32` | `#4caf50` | `#1b5e20` | `#fff` |

兩個控制參數：

| 參數 | 預設 | 說明 |
|---|---|---|
| `contrastThreshold` | 3 | 決定 `contrastText` 用白字或深色字。數值越大，越多背景色會被視為「亮色」而使用深色字（預設為 3:1 對比） |
| `tonalOffset` | 0.2 | 自訂顏色只提供 `main` 時，用此值自動計算 `light` 與 `dark`，僅適用自訂色 |

### 文字色（`palette.text`）

| token | 亮色模式 | 暗色模式 | 說明 |
|---|---|---|---|
| `primary` | `rgba(0, 0, 0, 0.87)` | `#fff` | 主要文字：標題、內文 |
| `secondary` | `rgba(0, 0, 0, 0.6)` | `rgba(255, 255, 255, 0.7)` | 次要文字：說明、輔助資訊 |
| `disabled` | `rgba(0, 0, 0, 0.38)` | `rgba(255, 255, 255, 0.5)` | 停用狀態的文字 |

暗色模式另外有 `text.icon`（`rgba(255, 255, 255, 0.5)`）。

### 背景色（`palette.background`）

| token | 亮色模式 | 暗色模式 | 說明 |
|---|---|---|---|
| `default` | `#fff` | `#121212` | 頁面底色 |
| `paper` | `#fff` | `#121212` | 卡片、選單、對話框等「紙張」表面 |

### 其他調色盤欄位

| 欄位 | 預設 | 說明 |
|---|---|---|
| `mode` | `'light'` | `'light'` 或 `'dark'`，切換後 `text`、`background`、`action`、`divider` 與各語意色的 `main` 會一併改變 |
| `divider` | `rgba(0, 0, 0, 0.12)`（暗色 `rgba(255, 255, 255, 0.12)`） | 分隔線、表格線、輸入框外框 |
| `common` | `black: #000`、`white: #fff` | 不隨 `mode` 改變的固定黑白 |
| `grey` | 見下 | 灰階 |
| `action` | 見下 | 互動狀態色 |

`grey`：`50` #fafafa、`100` #f5f5f5、`200` #eeeeee、`300` #e0e0e0、`400` #bdbdbd、`500` #9e9e9e、`600` #757575、`700` #616161、`800` #424242、`900` #212121、`A100` #f5f5f5、`A200` #eeeeee、`A400` #bdbdbd、`A700` #616161。

`action`（亮色模式）：元件在各種互動狀態下使用的顏色與透明度。

| token | 值 |
|---|---|
| `active` | `rgba(0, 0, 0, 0.54)` |
| `hover` | `rgba(0, 0, 0, 0.04)` |
| `hoverOpacity` | `0.04` |
| `selected` | `rgba(0, 0, 0, 0.08)` |
| `selectedOpacity` | `0.08` |
| `disabled` | `rgba(0, 0, 0, 0.26)` |
| `disabledBackground` | `rgba(0, 0, 0, 0.12)` |
| `disabledOpacity` | `0.38` |
| `focus` | `rgba(0, 0, 0, 0.12)` |
| `focusOpacity` | `0.12` |
| `activatedOpacity` | `0.12` |

### 字型（`typography`）

| 設定 | 預設 | 說明 |
|---|---|---|
| `fontFamily` | `"Roboto", "Helvetica", "Arial", sans-serif` | MUI 本身不含字型檔，需自行載入 Roboto（例如 `@fontsource/roboto`），否則瀏覽器會退回後面的字型 |
| `fontSize` | 14 | 基準字級（px） |
| `htmlFontSize` | 16 | `<html>` 的字級（px），rem 換算以此為基準；`theme.typography.pxToRem(px)` 會以它換算 |
| `fontWeightLight` / `Regular` / `Medium` / `Bold` | 300 / 400 / 500 / 700 | 字重 |

13 個字型變體：

| 變體 | 字級 | 字重 | 行高 | 字距 / 轉換 |
|---|---|---|---|---|
| `h1` | 6rem | 300 | 1.167 | -0.01562em |
| `h2` | 3.75rem | 300 | 1.2 | -0.00833em |
| `h3` | 3rem | 400 | 1.167 | 0em |
| `h4` | 2.125rem | 400 | 1.235 | 0.00735em |
| `h5` | 1.5rem | 400 | 1.334 | 0em |
| `h6` | 1.25rem | 500 | 1.6 | 0.0075em |
| `subtitle1` | 1rem | 400 | 1.75 | 0.00938em |
| `subtitle2` | 0.875rem | 500 | 1.57 | 0.00714em |
| `body1` | 1rem | 400 | 1.5 | 0.00938em |
| `body2` | 0.875rem | 400 | 1.43 | 0.01071em |
| `button` | 0.875rem | 500 | 1.75 | 0.02857em / uppercase |
| `caption` | 0.75rem | 400 | 1.66 | 0.03333em |
| `overline` | 0.75rem | 400 | 2.66 | 0.08333em / uppercase |

`h1` 到 `h6` 為標題，`subtitle1`、`subtitle2` 為副標題，`body1`、`body2` 為內文（`body1` 是多數元件的預設字型），`button`、`caption`、`overline` 為特殊用途。另有 `inherit` 變體，沿用父層字型。

### 版面與其他

斷點（各值為該斷點生效的最小視窗寬度，供 `useMediaQuery`、`sx` 與 `Grid` 的 `size` 使用）：

| 斷點 | 最小寬度 |
|---|---|
| `xs` | 0px |
| `sm` | 600px |
| `md` | 900px |
| `lg` | 1200px |
| `xl` | 1536px |

| 設定 | 預設 | 說明 |
|---|---|---|
| `spacing` | 8 | `theme.spacing(n)` 等於 `n * 8px` |
| `shape.borderRadius` | 4 | 元件預設圓角（px） |
| `direction` | `'ltr'` | 文字方向，`'rtl'` 為由右至左 |
| `shadows` | 25 層 | 索引 0 到 24，對應 `elevation` |
| `mixins.toolbar` | 56 / 48 / 64 | 手機 56px、橫向手機 48px、寬度 600px 以上 64px |

z-index（數字越大越上層）：

| 層級 | 值 |
|---|---|
| `mobileStepper` | 1000 |
| `fab` | 1050 |
| `speedDial` | 1050 |
| `appBar` | 1100 |
| `drawer` | 1200 |
| `modal` | 1300 |
| `snackbar` | 1400 |
| `tooltip` | 1500 |

轉場動畫時間（毫秒）：

| 名稱 | 值 |
|---|---|
| `shortest` | 150 |
| `shorter` | 200 |
| `short` | 250 |
| `standard` | 300 |
| `complex` | 375 |
| `enteringScreen` | 225 |
| `leavingScreen` | 195 |

緩動曲線：

| 名稱 | 值 |
|---|---|
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `easeOut` | `cubic-bezier(0.0, 0, 0.2, 1)` |
| `easeIn` | `cubic-bezier(0.4, 0, 1, 1)` |
| `sharp` | `cubic-bezier(0.4, 0, 0.6, 1)` |

### 使用方式

以預設主題為基底，只覆寫需要改變的欄位：

```js
import { createTheme } from '@mui/material/styles';
import { defaultThemeOptions } from 'themes/defaultTheme';

const theme = createTheme({
  ...defaultThemeOptions,
  palette: { primary: { main: '#6a1b9a' } },
  typography: { ...defaultThemeOptions.typography, fontSize: 16 },
});
```

`palette` 這樣寫會整個取代預設值，沒有提供的語意色、`text`、`background` 等欄位由 MUI 依預設值補齊。自訂顏色只提供 `main` 時，`light`、`dark`、`contrastText` 會依 `tonalOffset` 與 `contrastThreshold` 自動計算。

切換為暗色模式，只提供 `mode` 即可，其餘值由 MUI 依模式計算（背景 `#121212`、文字 `#fff`、`primary.main` 變為 `#90caf9`）：

```js
const darkTheme = createTheme({
  ...defaultThemeOptions,
  palette: { mode: 'dark' },
});
```

注意：不要把 `defaultThemeOptions.palette` 展開後再改 `mode`。`text`、`background`、`action`、`divider`、各語意色在檔案中是亮色模式的明確數值，會蓋過 `mode` 的計算結果，實測背景仍會是 `#fff`、文字仍是深色。
