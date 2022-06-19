import { Algorithm } from 'jsonwebtoken'

interface ConfigInterface {
  node: string
  port: number
  databaseUri: string
  jwt: {
    secret: string
    lifetime: string
    algorithm: Algorithm
  }
}

export default (): ConfigInterface => ({
  node: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 5000,
  databaseUri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jfvqv.mongodb.net/nursepower`,
  jwt: {
    secret: process.env.JWT_SECRET,
    lifetime: process.env.JWT_LIFETIME ?? '1d',
    algorithm: (process.env.JWT_ALGORITHM as any) ?? 'HS384',
  },
})
