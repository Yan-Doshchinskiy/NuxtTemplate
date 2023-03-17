import ValueObserver from './value.observer';

class ObjectObserver<T extends Record<string, any>> extends ValueObserver<T> {
  public updateKey<K extends keyof T>(key: K, value: T[K]):void {
    const newValue = {
      ...this.value,
      [key]: value
    };
    super.update(newValue);
  }

  public resetKey<K extends keyof T>(key: K):void {
    const newValue = {
      ...this.value,
      [key]: this.initialState[key]
    };
    super.update(newValue);
  }
}

export default ObjectObserver;
