import IApp from '@gluestack/framework/types/app/interface/IApp';
import { DockerodeHelper } from '@gluestack/helpers';
import IInstance from '@gluestack/framework/types/plugin/interface/IInstance';
import IContainerController from '@gluestack/framework/types/plugin/interface/IContainerController';

export class PluginInstanceContainerController implements IContainerController {
  app: IApp;
  status: 'up' | 'down' = 'down';
  portNumber: number;
  containerId: string;
  dockerfile: string;
  callerInstance: IInstance;

  constructor(app: IApp, callerInstance: IInstance) {
    this.app = app;
    this.callerInstance = callerInstance;
    this.setStatus(this.callerInstance.gluePluginStore.get('status'));
    this.setPortNumber(this.callerInstance.gluePluginStore.get('port_number'));
    this.setContainerId(
      this.callerInstance.gluePluginStore.get('container_id')
    );
  }

  getCallerInstance(): IInstance {
    return this.callerInstance;
  }

  getEnv() {}

  installScript() {
    return ['npm', 'install'];
  }

  runScript() {
    return ['npm', 'storybook', '-p', this.getPortNumber()];
  }

  getDockerJson() {
    return {};
  }

  getStatus(): 'up' | 'down' {
    return this.status;
  }

  // @ts-ignore
  async getPortNumber(returnDefault?: boolean): Promise<number | null> {
    return new Promise((resolve, reject) => {
      if (this.portNumber) {
        return resolve(this.portNumber);
      }
      let ports =
        this.callerInstance.callerPlugin.gluePluginStore.get("ports") || [];
      DockerodeHelper.getPort(6006, ports)
        .then((port: number) => {
          this.setPortNumber(port);
          ports.push(port);
          this.callerInstance.callerPlugin.gluePluginStore.set("ports", ports);
          return resolve(this.portNumber);
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  getContainerId(): string {
    return this.containerId;
  }

  setStatus(status: 'up' | 'down') {
    this.callerInstance.gluePluginStore.set('status', status || 'down');
    return (this.status = status || 'down');
  }

  setPortNumber(portNumber: number) {
    this.callerInstance.gluePluginStore.set('port_number', portNumber || null);
    return (this.portNumber = portNumber || null);
  }

  setContainerId(containerId: string) {
    this.callerInstance.gluePluginStore.set(
      'container_id',
      containerId || null
    );
    return (this.containerId = containerId || null);
  }

  setDockerfile(dockerfile: string) {
    this.callerInstance.gluePluginStore.set('dockerfile', dockerfile || null);
    return (this.dockerfile = dockerfile || null);
  }

  getConfig(): any {}

  async up() {
    //
  }

  async down() {
    //
  }

  async build() {
    //
  }
}
