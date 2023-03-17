import PostsController from '../controllers/posts.controller';
import type { IApiModuleOptions } from '../types';
import ApiModule from './api.module';

export interface IPlaceholderControllers {
  PostsController: PostsController
}

enum CONTROLLER_URL {
  POSTS = '/posts',
}

interface IPlaceholderModuleOptions extends IApiModuleOptions {}

const JsonPlaceholderURL = 'https://jsonplaceholder.typicode.com/';

class PlaceholderModule extends ApiModule<IPlaceholderControllers, IPlaceholderModuleOptions> { // TODO Remove example module
  constructor() {
    // define URL and default response interceptor
    super(JsonPlaceholderURL, {}, { defaultResponseInterceptor: true });

    this.controllers = {
      PostsController: new PostsController(
        this.apiClient,
        {
          controllerUrl: CONTROLLER_URL.POSTS
        }
      )
    };
  }
}

export default PlaceholderModule;
