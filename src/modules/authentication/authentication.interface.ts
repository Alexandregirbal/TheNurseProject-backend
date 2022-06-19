interface JWT {
  iat: number
  exp: number
}

export interface UserJWT extends JWT {
  _id: string
  email: string
  firstName: string
  lastName: string
  accountType: string
  isAdmin: boolean
}

export interface LoginResponse {
  accessToken: string
}
