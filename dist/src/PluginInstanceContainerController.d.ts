import IApp from '@gluestack/framework/types/app/interface/IApp';
import IInstance from '@gluestack/framework/types/plugin/interface/IInstance';
import IContainerController from '@gluestack/framework/types/plugin/interface/IContainerController';
export declare class PluginInstanceContainerController implements IContainerController {
    app: IApp;
    status: 'up' | 'down';
    portNumber: number;
    containerId: string;
    dockerfile: string;
    callerInstance: IInstance;
    constructor(app: IApp, callerInstance: IInstance);
    getCallerInstance(): IInstance;
    getEnv(): void;
    installScript(): string[];
    runScript(): (string | Promise<number>)[];
    getDockerJson(): {};
    getStatus(): 'up' | 'down';
    getPortNumber(returnDefault?: boolean): Promise<number | null>;
    getContainerId(): string;
    setStatus(status: 'up' | 'down'): "up" | "down";
    setPortNumber(portNumber: number): number;
    setContainerId(containerId: string): string;
    setDockerfile(dockerfile: string): string;
    getConfig(): any;
    up(): Promise<void>;
    down(): Promise<void>;
    build(): Promise<void>;
}
