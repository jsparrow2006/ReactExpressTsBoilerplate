import passport from 'passport';

const isAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false})(req, res, next)
};

export default isAuth;