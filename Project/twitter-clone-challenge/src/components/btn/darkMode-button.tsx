import useDarkModeStore from "../store/useDarkModeStore";
import { ModeButton } from "../style/button-components";

function DarkModeButton() {
  const { darkMode, setDarkMode } = useDarkModeStore();
  return <ModeButton onClick={() => setDarkMode()} dark={darkMode.toString()}>{darkMode ? "Light" : "Dark"} Mode</ModeButton>;
}

export default DarkModeButton;
