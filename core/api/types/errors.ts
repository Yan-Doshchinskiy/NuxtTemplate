import type { AxiosError, AxiosRequestConfig } from 'axios';

export interface IBackendErrorResult {
  message: string,
  statusCode: number,
  timestamp: string
}

interface IBackendErrorData {
  ok: boolean,
  result: IBackendErrorResult
}

interface IBackendErrorConfig extends AxiosRequestConfig{
  _retry?: boolean
}

export interface IBackendError extends AxiosError<IBackendErrorData> {
  config: IBackendErrorConfig
}
