import { useSelector } from 'react-redux';
import { ThemeProvider } from "@mui/material/styles";


// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import GlobalLoader from "components/GlobalLoader";
import NavigationScroll from "./layout/NavigationScroll";

function App() {
  const customization = useSelector((state) => state.customization);

  return (
      <ThemeProvider theme={themes(customization)}>
        <GlobalLoader />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
  );
}

export default App;
