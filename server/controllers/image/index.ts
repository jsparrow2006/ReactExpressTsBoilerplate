import express from 'express';
import { Fields, Files, File } from 'formidable';
import md5 from 'crypto-js/md5';
import fs from 'fs';

import path from 'path';

interface IFormFile extends File {
    type: string;
    path: string
}

const IMAGES_PATH = path.join(__dirname, '../..', 'images/').replace('dist/', '');
const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'svg']

export const addImages = async (req: express.Request, res: express.Response) => {
    // @ts-ignore
    const fields: Fields = req.fields;
    // @ts-ignore
    const files: IFormFile = req.files;

    Object.keys(files).forEach((imageKey: string) => {
        const imageName = md5(`${imageKey}${new Date()}`).toString()
        try {
            const image = files[imageKey];
            fs.renameSync(image.path, IMAGES_PATH + imageName + '.' + image.type.split('/')[1])
        } catch (err) {
            res.status(500).json({ error: err });
            return err
        }
    })

    res.status(200).json({})
    return true
}

export const getImage = (req, res) => {
    let file = '';
    IMAGE_TYPES.forEach((type) => {
        if(fs.existsSync(IMAGES_PATH + `${req.params.id}.${type}`)) {
            file = IMAGES_PATH + `${req.params.id}.${type}`;
        }
    })
    if(file) {
        res.sendFile(file);
    } else {
        res.status(404).json({})
    }
}



export default {
    addImages,
    getImage
}