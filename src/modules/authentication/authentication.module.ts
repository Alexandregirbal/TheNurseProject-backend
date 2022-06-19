import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import config from 'src/config'
import { AuthenticationController } from 'src/modules/authentication/authentication.controller'
import { AuthenticationService } from 'src/modules/authentication/authentication.service'
import { LocalStrategy } from 'src/modules/authentication/strategies/local.strategy'
import { UserApplicationModule } from '../user/application/user.application.module'
import { UserDomainModule } from '../user/domain/user.domain.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserApplicationModule,
    UserDomainModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config().jwt.secret,
        signOptions: {
          expiresIn: config().jwt.lifetime,
          algorithm: config().jwt.algorithm,
        },
        verifyOptions: {
          algorithms: [config().jwt.algorithm],
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
