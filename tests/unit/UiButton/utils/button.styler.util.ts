import MainStylerUtil from '~/tests/unit/prototypes/utils/main.styler.util';
import type { TButtonVariant } from '~/components/shared/UiButton/index.vue';

class ButtonStylerUtil extends MainStylerUtil {
  public getWrapperClass(
    variant: TButtonVariant,
    isLoading: boolean
  ): Array<string> {
    const variantClass = this._getWrapperClassByVariant(variant);
    const loadingClass = this._getWrapperClassByLoading(isLoading);
    const classes = [this.wrapperClass, variantClass, loadingClass];
    return classes.filter((it) => it);
  }

  private _getWrapperClassByVariant(modifier: TButtonVariant): string {
    return `${this.wrapperClass}_${modifier}`;
  }

  private _getWrapperClassByLoading(isLoading: boolean): string {
    return isLoading ? `${this.wrapperClass}_loading` : '';
  }
}

export default ButtonStylerUtil;
