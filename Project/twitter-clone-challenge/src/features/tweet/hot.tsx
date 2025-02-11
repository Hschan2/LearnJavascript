import { useState } from "react";
import Timeline from "./components/timeline";
import { SELECT_OPTION_VALUE } from "../../constants";
import {
  FilterSelector,
  FilterWrapper,
  Wrapper,
} from "../home/style/home-components";

function Hot() {
  const [selectedOption, setSelectedOption] = useState("전체");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <FilterSelector onChange={handleOptionChange}>
          <option value="전체">전체</option>
          {SELECT_OPTION_VALUE.map((item, index) => (
            <option value={item} key={`${item}-${index}`}>
              {item}
            </option>
          ))}
        </FilterSelector>
      </FilterWrapper>
      <Timeline isHot option={selectedOption} />
    </Wrapper>
  );
}

export default Hot;
