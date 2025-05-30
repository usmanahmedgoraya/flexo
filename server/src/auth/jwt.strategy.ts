import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport"
import { User } from './schema/user.schemas';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });

    }

    async validate(payload: { id: string}) {

        const { id } = payload;
        // Get the user from id
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint');
        }
        // Returning user
        return user
    }

}