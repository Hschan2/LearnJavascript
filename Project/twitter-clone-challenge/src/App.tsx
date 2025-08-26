import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import LoadingScreen from "./features/loading/loading-screen";
import { auth } from "./firebase";
import Footer from "./shared/footer";
import useDarkModeStore from "./shared/store/useDarkModeStore";
import { Helmet } from "react-helmet-async";
import { darkTheme, GlobalStyles, lightTheme, AppWrapper } from "./app-style";
import { router } from "./routes/Router";

function App() {
  const [isLoading, setLoading] = useState(true);
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    const init = async () => {
      await auth.authStateReady();
      setLoading(false);
    };
    init();
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Noto+Sans+KR:wght@100..900&display=swap"
        />
      </Helmet>
      <AppWrapper>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
