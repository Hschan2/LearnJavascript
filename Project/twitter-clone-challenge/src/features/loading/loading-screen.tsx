import { messages } from "../../message";
import { Text, LoadingWrapper } from "./styles/loading-components";

function LoadingScreen() {
  return (
    <LoadingWrapper>
      <Text>{messages.loading}</Text>
    </LoadingWrapper>
  );
}

export default LoadingScreen;
