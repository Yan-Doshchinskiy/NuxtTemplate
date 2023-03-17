import MainStylerUtil from '~/tests/unit/prototypes/utils/main.styler.util';

import type { TBadgeSize, TBadgeVariant } from '~/components/shared/UiBadge/index.vue';

class BadgeStylerUtil extends MainStylerUtil {
  public getWrapperClass(variant: TBadgeVariant, size: TBadgeSize): Array<string> {
    const variantClass = this.getChildClassName({ modifier: variant });
    const sizeClass = this.getChildClassName({ modifier: size });
    return [this.wrapperClass, variantClass, sizeClass];
  }
}

export default BadgeStylerUtil;
