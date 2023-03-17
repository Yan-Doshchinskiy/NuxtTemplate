import type { IApiControllerOptions } from '../types';

import ApiController from './api.controller';

export interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string,
}

export type TPostArray = Array<IPost>

class PostsController extends ApiController<IApiControllerOptions> { // TODO remove example
  public async fetchPostsArray(): Promise<TPostArray> {
    return this.get<TPostArray>('/');
  }

  public async fetchPostById(id: number): Promise<IPost> {
    return this.get<IPost>(`/${id}`);
  }

  public async createPost(payload: IPost): Promise<IPost> {
    return this.post<IPost>('/', payload);
  }
}

export default PostsController;
