import React from "react";
import CountryCapitalGame from "./components/CountryCapitalGame";

export default function App() {
  return (
    <>
      <CountryCapitalGame data={{ Germany: "Berlin", Azerbaijan: "Baku" }} />
    </>
  );
}
