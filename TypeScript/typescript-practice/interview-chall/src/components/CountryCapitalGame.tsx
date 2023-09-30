import React, { useState } from "react";
import "../index.css";

type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};

function randomize() {
  return Math.random() - 0.5;
}

function getCountries(data: Record<string, string>) {
  return Object.keys(data);
}

function getCapitals(data: Record<string, string>) {
  return Object.values(data);
}

function getButtonClass(option: Option) {
  if (option.state === "SELECTED") {
    return "selected";
  } else if (option.state === "WRONG") {
    return "wrong";
  } else {
    return "";
  }
}

function isPartOfPair(opt: Option, selected: Option, option: Option) {
  return opt.value === selected.value || opt.value === option.value;
}

export default function CountryCapitalGame({
  data,
}: {
  data: Record<string, string>;
}) {
  const [options, setOptions] = useState<Option[]>(
    [...getCountries(data), ...getCapitals(data)]
      .sort(randomize)
      .map((value) => ({
        value,
        state: "DEFAULT",
      }))
  );
  const [selected, setSelected] = useState<Option[]>();
  const isGameOver = options.length === 0;

  function onButtonClick(option: Option) {
    if (!selected) {
      setSelected(option);
      setOptions(
        options.map((opt) => ({
          ...opt,
          state: opt === option ? "SELECTED" : "DEFAULT",
        }))
      );
    } else {
      if (
        selected.value === data[option.value] ||
        data[selected.value] === option.value
      ) {
        setOptions(
          options.filter((opt) => {
            !isPartOfPair(opt, selected, option);
          })
        );
      } else {
        setOptions(
          options.map((opt) => ({
            ...opt,
            state: isPartOfPair(opt, selected, option) ? "WRONG" : opt.state,
          }))
        );
      }
      setSelected(undefined);
    }
  }

  if (isGameOver) return <div>Congratulation</div>;

  return (
    <>
      {options.map((option) => (
        <button
          className={getButtonClass(option)}
          key={option.value}
          onClick={() => onButtonClick(option)}
        >
          {option.value}
        </button>
      ))}
    </>
  );
}
