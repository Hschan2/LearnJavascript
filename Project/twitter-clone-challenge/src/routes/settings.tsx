import { useSettingActions } from "../hooks/useSettingActions";
import { SettingUI } from "./components/SettingUI";

function Settings() {
  const { onLogOut, onDeleteUser } = useSettingActions();
  return <SettingUI onLogOut={onLogOut} onDeleteUser={onDeleteUser} />;
}

export default Settings;
