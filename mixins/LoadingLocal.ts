import { Component, Vue } from 'vue-property-decorator';
import { LOADING_STATUS } from '~/enums/ui';

@Component({
  name: 'LoadingLocal'
})

export default class LoadingLocal extends Vue {
  private loadingStatusLocal: LOADING_STATUS = LOADING_STATUS.NONE;

  protected get IsLoadingLocal(): boolean {
    return this.loadingStatusLocal === LOADING_STATUS.LOADING;
  }

  protected StartLoadingLocal():void {
    this.loadingStatusLocal = LOADING_STATUS.LOADING;
  }

  protected FinishLoadingLocal():void {
    this.loadingStatusLocal = LOADING_STATUS.NONE;
  }

  protected ChangeLoadingStatusLocal(status: LOADING_STATUS):void {
    const methods: Record<LOADING_STATUS, () => void> = {
      [LOADING_STATUS.LOADING]: this.StartLoadingLocal,
      [LOADING_STATUS.NONE]: this.FinishLoadingLocal
    };
    methods[status]();
  }
}
