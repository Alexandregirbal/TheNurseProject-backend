import { Schema } from '@nestjs/mongoose'

export const Entity = () => {
  return Schema({ timestamps: true })
}
