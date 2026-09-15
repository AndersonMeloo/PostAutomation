import { ModulePage } from "../components/module-page";
import { backendModules } from "../lib/backend-routes";

const authModule = backendModules.find((moduleItem) => moduleItem.slug === "auth");

export default function AuthPage() {
  if (!authModule) {
    return <p>Modulo auth nao encontrado.</p>;
  }

  return <ModulePage moduleData={authModule} />;
}
