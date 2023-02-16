import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token: string | null = null;
          if (req && req.cookies) {
            token = req.cookies['access_token'];
          }
          return token;
        },
      ]),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(req: Request, payload: { sub: number; email: string }) {
    return { sub: payload.sub, email: payload.email };
  }
}
