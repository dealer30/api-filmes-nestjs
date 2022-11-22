import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { configService } from "src/config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
        secretOrKey: configService.getJwtConfig()['secret'],
    });
}

    async validate(payload: any) {
        return { id: payload.id, name: payload.name };
    }
}