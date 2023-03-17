export interface MainStylerUtilConstructor {
  wrapperClass: string
}

class MainStylerUtil {
  protected readonly _wrapperClass: string

  constructor({ wrapperClass }: MainStylerUtilConstructor) {
    this._wrapperClass = wrapperClass;
  }

  public get wrapperClass(): string {
    return this._wrapperClass;
  }

  public getChildClass({ element, modifier }: {element?: string, modifier?: string}): string {
    return `.${this.getChildClassName({ element, modifier })}`;
  }

  public getChildClassName({ element, modifier }: {element?: string, modifier?: string}): string {
    return `${this.wrapperClass}${element ? `__${element}` : ''}${modifier ? `_${modifier}` : ''}`;
  }
}

export default MainStylerUtil;
