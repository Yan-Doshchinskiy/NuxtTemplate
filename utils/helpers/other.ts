import { DATA_TYPE } from '~/enums/formats';

export const getVariableType = (val: any): DATA_TYPE => Object.prototype.toString.apply(val) as DATA_TYPE;

export const checkIsMobile = ():boolean => (typeof window !== 'undefined' ? window.matchMedia('(any-pointer:coarse)').matches : false);

export const openNewLink = (url: string, target?: string):void => {
  if (typeof document !== 'undefined') {
    const a = document.createElement('a');
    a.href = url;
    if (target) {
      a.target = target;
    }
    document.body.appendChild(a);
    a.click();
    a.remove();
  } else {
    console.error('document is not defined');
  }
};
