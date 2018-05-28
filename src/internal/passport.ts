import config from './config'
import bcrypt from 'bcryptjs'
import db from './db'

import passport from 'passport'
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'

const
    LocalStrategy = passportLocal.Strategy,
    JwtStrategy = passportJWT.Strategy,
    ExtractJwt = passportJWT.ExtractJwt;

import logger from './logger'
const log = logger(module);

passport.use(new LocalStrategy((username, password, done) => {

    findUserByUsername(username, (err, user) => {

        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        verifyPassword(user, password, result => {

            if (result) {

                clearUserReauth(user.id);
                return done(null, user);

            } else {
                return done(null, false);
            }

        });

    });

}));

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwt:secretKey')
};

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {

    const expirationDate = new Date(jwtPayload.exp * 1000);
    if (expirationDate < new Date()) {
        return done(null, false);
    }

    findUserByUsername(jwtPayload.username, (err, user) => {
        return done(null, user ? (user.reauth ? false : user) : false);
    });

}));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function findUserByUsername(username: string, callback: (err: Error, user: any) => void) {

    db('users')
        .where({ username })
        .then(users => Promise.resolve(callback(null, users[0])))
        .catch(err => Promise.resolve(callback(err, false)))

}

function findUserById(id: string, callback: (err: Error, user: any) => void) {

    db('users')
        .where({ id })
        .then(users => Promise.resolve(callback(null, users[0])))
        .catch(err => Promise.resolve(callback(err, false)));

}

function verifyPassword(user: any, password: string, callback: (result: boolean) => void) {

    bcrypt.compare(password, user.hash, (err, result) => {
        callback(result);
    });

}

function clearUserReauth(id: string) {

    db('users')
        .update({ reauth: false })
        .where({ id })
        .then(() => log.info(`clearUserReauth ${ id } success`))
        .catch(err => log.info(`clearUserReauth ${id} error ${err}`));

}

function serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user.id);
}

function deserializeUser(id: string, done: (err: Error, user: any) => void) {
    findUserById(id, (err, user) => { done(err, user); });
}

export default passport;