import { useState } from "react";
import Timeline from "./components/timeline";
import { SELECT_OPTION_VALUE } from "../../constants";
import {
  FilterSelector,
  FilterWrapper,
  Wrapper,
} from "../home/style/home-components";

const OPTIONS = ["전체", ...SELECT_OPTION_VALUE];

function Hot() {
  const [selectedOption, setSelectedOption] = useState(OPTIONS[0]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const renderOptions = () =>
    OPTIONS.map((item, index) => (
      <option value={item} key={`${item}-${index}`}>
        {item}
      </option>
    ));

  return (
    <Wrapper>
      <FilterWrapper>
        <FilterSelector onChange={handleOptionChange}>
          {renderOptions()}
        </FilterSelector>
      </FilterWrapper>
      <Timeline isHot option={selectedOption} />
    </Wrapper>
  );
}

export default Hot;
