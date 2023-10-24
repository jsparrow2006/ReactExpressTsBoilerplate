import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import models from '../../models';

export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate('login', {}, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).json({ error: 'Укажите правильный логин или пароль!' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const token = jwt.sign(user, process.env.JWT_KEY);
            return res.status(200).json({token: token});
        });
    })(req, res, next);
}


export const signUp = async (req: express.Request, res: express.Response) => {
    const isUserExist = await models.user.findOne({
        where: { phoneNumber: req.body.phoneNumber }
    })
    if(!isUserExist) {
        try {
            const newUser = await models.user.create({
                ...req.body,
            })
            res.status(200).json({
                id: newUser.id
            })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(409)
        res.send({error: 'User already exist'})
    }
}


export const logout = async (req: express.Request, res: express.Response) => {
    req.logOut(() => {});
    res.status(200).json({message: 'logout'});
}

export default {
    login,
    signUp,
    logout
}