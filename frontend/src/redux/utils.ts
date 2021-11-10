import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IState } from "./reducer";

type FunctionType = (...args: any[]) => void;
interface IActionCreatorsMapObject {
  [actionCreator: string]: FunctionType;
}

export type TActionsUnion<A extends IActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;

export interface IAction<T extends string> {
  type: T;
}

interface IActionWithPayload<T extends string, P> extends IAction<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): IAction<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}

export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;
