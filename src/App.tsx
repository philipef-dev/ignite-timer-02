import { ThemeProvider } from "styled-components";
import { defaulTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router";
import { Router } from "./Router";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaulTheme}>
        <Router/>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}