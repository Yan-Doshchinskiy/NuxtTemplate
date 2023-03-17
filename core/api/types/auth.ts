export interface IAuthTokensResponse {
  accessToken: string,
  refreshToken: string
}

export interface IEmailPayload {
  email: string,
  password: string
}

export interface ITelegramPayload {
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  photo_url?: string,
  auth_date: string,
  hash: string,
}

export interface IWeb3Payload {
  address: string,
  message: string,
  signature: string
}

export interface IEmailPayloadSignUp { // TODO replace with actual interface
  email: string,
  password: string
}

export interface ITelegramPayloadSignUp { // TODO replace with actual interface
  username: string
}

export interface IWeb3PayloadSignUp { // TODO replace with actual interface
  address: string,
}

export enum AUTH_METHODS {
  EMAIL = 'EMAIL',
  TELEGRAM = 'TELEGRAM',
  WEB3 = 'WEB3',
}

export interface IAuthPayloads {
  [AUTH_METHODS.EMAIL]: IEmailPayload
  [AUTH_METHODS.TELEGRAM]: ITelegramPayload,
  [AUTH_METHODS.WEB3]: IWeb3Payload,
}

export interface IAuthPayloadsSignUp {
  [AUTH_METHODS.EMAIL]: IEmailPayloadSignUp
  [AUTH_METHODS.TELEGRAM]: ITelegramPayloadSignUp,
  [AUTH_METHODS.WEB3]: IWeb3PayloadSignUp,
}

export enum COOKIE_TOKEN_TYPE {
  ACCESS = 'accessToken',
  REFRESH = 'refreshToken',
}
