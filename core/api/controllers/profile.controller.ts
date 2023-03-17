import type { IUserUpdatePayload, IUserProfile } from '../types/profile';
import type { IApiControllerOptions } from '../types';

import ApiController from './api.controller';

class ProfileController extends ApiController<IApiControllerOptions> {
  public async fetchUserInfo(): Promise<IUserProfile> {
    return this.get<IUserProfile>('/me');
  }

  public async updateUserInfo(payload: IUserUpdatePayload): Promise<IUserProfile> {
    return this.put<IUserProfile>('/me', payload);
  }
}

export default ProfileController;
