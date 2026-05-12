import SettingsList from "@/components/settings/settings";
import { Settings } from "@/lib/types/settings";

export default function SettingsPage() {
  const settings: Settings = [];

  return <SettingsList settings={settings} />;
}
