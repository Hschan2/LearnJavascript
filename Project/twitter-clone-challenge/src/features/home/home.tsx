import React, { useState } from "react";
import MainSlide from "./components/main-slide";
import Timeline from "../tweet/components/timeline";
import { SELECT_OPTION_VALUE } from "../../constants";
import {
  FilterSelector,
  FilterWrapper,
  HomeWrapper,
} from "./style/home-components";

function Home() {
  const [selectedOption, setSelectedOption] = useState("전체");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <HomeWrapper>
      <MainSlide />
      <FilterWrapper>
        <FilterSelector onChange={handleOptionChange}>
          <option value="전체">전체</option>
          {SELECT_OPTION_VALUE.map((item, index) => (
            <option value={item} key={`${item}-${index}`}>{item}</option>
          ))}
        </FilterSelector>
      </FilterWrapper>
      <Timeline option={selectedOption} />
    </HomeWrapper>
  );
}

export default Home;
