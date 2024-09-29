import { promises as fs } from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default async (req, res) => {
    const filePath = path.join(process.cwd(), 'data/products.csv');
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.status(200).json(results);
        });
};
