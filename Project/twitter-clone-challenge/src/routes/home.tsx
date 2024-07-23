import React, { useState } from "react";
import MainSlide from "../components/screen/MainSlide";
import Timeline from "../components/screen/timeline";
import { SELECT_OPTION_VALUE } from "../constants";
import {
  FilterSelector,
  FilterWrapper,
  Wrapper,
} from "./style/home-components";

function Home() {
  const [selectedOption, setSelectedOption] = useState("전체");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Wrapper>
      <MainSlide />
      <FilterWrapper>
        <FilterSelector onChange={handleOptionChange}>
          <option value="전체">전체</option>
          {SELECT_OPTION_VALUE.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </FilterSelector>
      </FilterWrapper>
      <Timeline option={selectedOption} />
    </Wrapper>
  );
}

export default Home;
