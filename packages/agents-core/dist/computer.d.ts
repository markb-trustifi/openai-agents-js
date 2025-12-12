import * as protocol from './types/protocol';
export type Environment = 'mac' | 'windows' | 'ubuntu' | 'browser';
export type Button = 'left' | 'right' | 'wheel' | 'back' | 'forward';
import { Expand, SnakeToCamelCase } from './types/helpers';
import { ComputerAction } from './types/protocol';
import type { RunContext } from './runContext';
type Promisable<T> = T | Promise<T>;
/**
 * Interface to implement for a computer environment to be used by the agent.
 */
type ComputerCommon = {
    environment: Environment;
    dimensions: [number, number];
};
type ComputerBaseMethods = {
    screenshot(): Promisable<string>;
    click(x: number, y: number, button: Button): Promisable<void>;
    doubleClick(x: number, y: number): Promisable<void>;
    scroll(x: number, y: number, scrollX: number, scrollY: number): Promisable<void>;
    type(text: string): Promisable<void>;
    wait(): Promisable<void>;
    move(x: number, y: number): Promisable<void>;
    keypress(keys: string[]): Promisable<void>;
    drag(path: [number, number][]): Promisable<void>;
};
type ComputerBase = ComputerCommon & ComputerBaseMethods & {
    invoke?: undefined;
};
type ComputerBaseInvoke = ComputerCommon & {
    invoke(runContext: RunContext, toolCall: protocol.ComputerUseCallItem): Promisable<string>;
} & {
    [K in keyof ComputerBaseMethods]: never;
};
type ActionNames = SnakeToCamelCase<ComputerAction['type']>;
/**
 * Interface representing a fully implemented computer environment.
 * Combines the base operations with a constraint that no extra
 * action names beyond those in `ComputerAction` are present.
 */
export type Computer = Expand<(ComputerBase & Record<Exclude<ActionNames, keyof ComputerBase>, never>) | (ComputerBaseInvoke & Record<Exclude<'invoke', keyof ComputerBaseInvoke>, never>)>;
export declare function isInvokeComputer(computer: Computer): computer is ComputerBaseInvoke;
export declare function asInvokeComputer(computer: ComputerCommon & {
    invoke(runContext: RunContext, toolCall: protocol.ComputerUseCallItem): Promisable<string>;
}): Computer;
export {};
