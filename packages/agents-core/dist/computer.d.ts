import * as protocol from './types/protocol';
export type Environment = 'mac' | 'windows' | 'ubuntu' | 'browser';
export type Button = 'left' | 'right' | 'wheel' | 'back' | 'forward';
import { Expand, SnakeToCamelCase } from './types/helpers';
import { ComputerAction } from './types/protocol';
import { RunContext } from './runContext';
type Promisable<T> = T | Promise<T>;
/**
 * Interface to implement for a computer environment to be used by the agent.
 */
interface ComputerBase {
    environment: Environment;
    dimensions: [number, number];
    invoke?(runContext: RunContext, toolCall: protocol.ComputerUseCallItem): Promisable<string>;
    screenshot(): Promisable<string>;
    click(x: number, y: number, button: Button): Promisable<void>;
    doubleClick(x: number, y: number): Promisable<void>;
    scroll(x: number, y: number, scrollX: number, scrollY: number): Promisable<void>;
    type(text: string): Promisable<void>;
    wait(): Promisable<void>;
    move(x: number, y: number): Promisable<void>;
    keypress(keys: string[]): Promisable<void>;
    drag(path: [number, number][]): Promisable<void>;
}
type ActionNames = SnakeToCamelCase<ComputerAction['type']>;
/**
 * Interface representing a fully implemented computer environment.
 * Combines the base operations with a constraint that no extra
 * action names beyond those in `ComputerAction` are present.
 */
export type Computer = Expand<ComputerBase & Record<Exclude<ActionNames, keyof ComputerBase>, never>>;
export {};
