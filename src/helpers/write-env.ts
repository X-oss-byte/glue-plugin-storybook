import * as fs from "fs";
import { PluginInstance } from "../PluginInstance";

export async function constructEnvFromJson(instance: PluginInstance) {
  // @ts-ignore
  const STORYBOOK_DATA_KEY = '12345';
  const keys: any = {
    STORYBOOK_DATA_KEY
  };

  return keys;
}

export async function writeEnv(instance: PluginInstance) {
  const path = `${instance.getInstallationPath()}/.env`;
  let env = "";
  const keys: any = await constructEnvFromJson(instance);
  Object.keys(keys).forEach((key) => {
    env += `${key}="${keys[key]}"
`;
  });

  fs.writeFileSync(path, env);
}
