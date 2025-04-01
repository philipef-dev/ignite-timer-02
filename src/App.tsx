import { ThemeProvider } from "styled-components";
import { defaultheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router";
import { Router } from "./Router";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultheme}>
        <Router/>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}




