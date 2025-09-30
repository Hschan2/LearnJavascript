import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import LoadingScreen from "./features/loading/loading-screen";
import Footer from "./shared/footer";
import useAppStore from "./shared/store/useAppStore";
import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { darkTheme, GlobalStyles, lightTheme, AppWrapper } from "./app-style";
import { router } from "./routes/Router";

function App() {
  const { isLoading, darkMode } = useAppStore();

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
        <Toaster position="bottom-right" reverseOrder={false} />
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
