//@ts-ignore
import packageJSON from "../package.json";
import { writeEnv } from "./helpers/write-env";
import { PluginInstance } from "./PluginInstance";
import { reWriteFile } from "./helpers/rewrite-file";
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import ILifeCycle from "@gluestack/framework/types/plugin/interface/ILifeCycle";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";
import IManagesInstances from "@gluestack/framework/types/plugin/interface/IManagesInstances";

const { copyFolder } = require("@gluestack/framework/helpers/file/copy-folder");

//Do not edit the name of this class
export class GlueStackPlugin implements IPlugin, IManagesInstances, ILifeCycle {
  app: IApp;
  instances: IInstance[];
	type: 'stateless' | 'stateful' | 'devonly' = 'devonly';
  gluePluginStore: IGlueStorePlugin;

  constructor(app: IApp, gluePluginStore: IGlueStorePlugin) {
    this.app = app;
    this.instances = [];
    this.gluePluginStore = gluePluginStore;
  }

  init() {
    //
  }

  destroy() {
    //
  }

  getName(): string {
    return packageJSON.name;
  }

  getVersion(): string {
    return packageJSON.version;
  }

  getType(): 'stateless' | 'stateful' | 'devonly' {
    return this.type;
  }

  getTemplateFolderPath(): string {
    return `${process.cwd()}/node_modules/${this.getName()}/template/instance`;
  }

  getInstallationPath(target: string): string {
    return `./${target}`;
  }

  getComponentsFolderPath(): string {
    return `${process.cwd()}/node_modules/${this.getName()}/template/components`;
  }

  getComponentsInstallationPath(): string {
    return `./shared/components`;
  }

  async runPostInstall(instanceName: string, target: string) {
    const instance: PluginInstance =
      await this.app.createPluginInstance(
        this,
        instanceName,
        this.getTemplateFolderPath(),
        target,
      );

    if (!instance) {
      return;
    }

    // adds .env file
    await writeEnv(instance);

    // rewrite router.js with the installed instance name
    const routerFile = `${instance.getInstallationPath()}/router.js`;
    await reWriteFile(routerFile, instanceName, 'INSTANCENAME');

    // update package.json'S name index with the new instance name
    const pluginPackage = `${instance.getInstallationPath()}/package.json`;
    await reWriteFile(pluginPackage, instanceName, 'INSTANCENAME');

    // copy components into gluestack project's shared folder
    await copyFolder(
      this.getComponentsFolderPath(),
      this.getComponentsInstallationPath()
    );
  }

  createInstance(
    key: string,
    gluePluginStore: IGlueStorePlugin,
    installationPath: string,
  ): IInstance {
    const instance = new PluginInstance(
      this.app,
      this,
      key,
      gluePluginStore,
      installationPath,
    );
    this.instances.push(instance);
    return instance;
  }

  getInstances(): IInstance[] {
    return this.instances;
  }
}
