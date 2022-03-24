import express, { Express, Response, Request } from 'express';
import fs from 'fs';
import { Config } from '../Config';
import axios from 'axios';

/**
 * New York Times controller
 */
export class NewYorkTimesAPI {

    route(express: Express) {
        express.get('/api/books', this.getBookTypes());
        express.get('/api/books/:type', this.getBooks());
        express.get('/api/books/reviews/:title', this.getReviews());
    }

    getBookTypes() {
        return async (req: Request, res: Response) => {
            try {
                const results = await axios.get(`${Config.services.nyt.url}/lists/names.json?api-key=${Config.services.nyt.key}`);
                res.status(200).send(results.data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    getBooks() {
        return async (req: Request, res: Response) => {
            try {
                const bookType = req.params.type;
        
                const results = await axios.get(`${Config.services.nyt.url}/lists/current/${bookType}.json?api-key=${Config.services.nyt.key}`);
                res.status(200).send(results.data.results.books.slice(0,10));
            } catch (error) {
                console.error(error);
            }
        }
    }

    getReviews() {
        return async (req: Request, res: Response) => {
            try {
                const title = req.params.title;
        console.log(title);
                const results = await axios.get(`${Config.services.nyt.url}reviews?title=${title}&api-key=${Config.services.nyt.key}`);
        console.log(results);
                res.status(200).send(results.data);
            } catch (error) {
                console.error(error);
            }
        }
    }

}