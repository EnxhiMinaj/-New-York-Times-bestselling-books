import dotenv from 'dotenv';
import Fs from 'fs';
import { Logger } from './Utils/Log';

dotenv.config();

if (!process.env.PORT) {
    throw new Error('Project is not configured properly!');
}
/**
 * Minimum length of allowed API keys. Shorter ones will be ignored
 */
const API_KEY_MIN_LENGTH = 11;

export const Config = {
    nyt: {
        port: parseInt(process.env.PORT),
    },

    services: {
        nyt: {
            url: process.env.NYT_URL,
            key: process.env.NYT_API_KEY,
        },
    },
    
    api_key: process.env.SERVICE_API_KEY || '',

};
