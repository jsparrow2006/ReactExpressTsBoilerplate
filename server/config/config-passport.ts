import passport from 'passport';
import passportJWT from 'passport-jwt'
import moment from 'moment'
import  models from '../models';
import SHA256 from 'crypto-js/sha256';
import env from 'dotenv';

import { IUser } from '../models/user/types/IUser';

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

env.config();

const JWT_KEY = process.env.JWT_KEY || 'jwtKey'

passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : JWT_KEY
    },
    async (user, done) => {
        if (user.expired > Date.now()) {
            try {
                return done(null, user);
            } catch (error) {
                done(error);
            }
        } else {
            return done(null, false);
        }
    }
));

passport.serializeUser(function (user: IUser, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id: string, done) {
    models.user.findOne({
        rejectOnEmpty: true,
        where: {
            id: id
        }
    })
        .then((user) => {
            if (user) {
                done(null, user);
            } else {
                return done(null, false);
            }
        })
});

passport.use('login', new LocalStrategy( {
        usernameField: 'phoneNumber',
    },
    async function (phoneNumber: string, passwordUser: string, done) {

            const user = await models.user.findOne({
                rejectOnEmpty: true,
                where: {
                    phoneNumber: phoneNumber,
                    password: SHA256(passwordUser).toString()
                }
            })

            if (!user) {
                return done(null, false);
            }

            await user.save();
            const { password, ...userObj } = user.toJSON();
            return done(null, {
                ...userObj,
                expired: Date.now() + (1000 * 60 * 60 * 4)
            });
    }
));
