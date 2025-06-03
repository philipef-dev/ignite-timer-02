import { ThemeProvider } from "styled-components";
import { defaulTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router";
import { Router } from "./Router";
import { CyclesContextProvider } from "./context/CyclesContext";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaulTheme}>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}