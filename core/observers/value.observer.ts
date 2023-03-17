import clone from 'lodash.clonedeep';

import type { TSubscription } from './types';

class ValueObserver<T> {
  private _value:T
  private _subscribers:Array<TSubscription<T>>
  protected readonly initialState: T

  constructor(value:T) {
    this._value = value;
    this.initialState = clone<T>(value);
    this._subscribers = [];
  }

  public get value():T {
    return this._value;
  }

  public update(value:T):void {
    this._value = value;
    this._subscribers.forEach((sub) => {
      sub(value);
    });
  }

  public reset():void {
    this.update(this.initialState);
  }

  public subscribe(sub:TSubscription<T>):void {
    this._subscribers.push(sub);
    sub(this._value);
  }

  public unsubscribe(sub:TSubscription<T>):void {
    this._subscribers = this._subscribers.filter(it => it !== sub);
  }
}

export default ValueObserver;
