import { AppProps } from "next/app";
import { theme } from "../styles/Theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyles";
import { Provider } from "react-redux";
import store from "../state/store";
import withRedux from "next-redux-wrapper";



function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />  
      </ThemeProvider>
    </Provider>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(App);