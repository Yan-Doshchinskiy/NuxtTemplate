export interface IUserProfile {
  id: number,
  name: string,
  type: string,
  country: string,
  city: string
}

export interface IUserUpdatePayload {
  name: string,
  type: string,
  country: string,
  city: string
}
