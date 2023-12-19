import Title from "./components/Title";
import Main from "./components/Main";
import Motion from "./components/Motion";
import Footer from "./components/Footer";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col space-y-14 items-center justify-between p-10">
      <Title />
      <Main />
      <Motion />
      <Motion />
      <Footer />
    </main>
  );
}
