import { compare, genSalt, hash } from 'bcrypt'

export class PasswordUtil {
  static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt()
    if (!/^\$2a\$\d+\$/.test(password)) {
      return await hash(password, salt)
    } else {
      throw Error('Password regex failed')
    }
  }

  static async checkPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    if (plainPassword && hashedPassword) {
      return await compare(plainPassword, hashedPassword)
    }
    return false
  }
}
