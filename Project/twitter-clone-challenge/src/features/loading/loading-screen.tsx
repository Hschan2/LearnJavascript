import { LOADING_MESSAGE } from "../../message";
import { Text, LoadingWrapper } from "./styles/loading-components";

function LoadingScreen() {
  return (
    <LoadingWrapper>
      <Text>{LOADING_MESSAGE}</Text>
    </LoadingWrapper>
  );
}

export default LoadingScreen;
