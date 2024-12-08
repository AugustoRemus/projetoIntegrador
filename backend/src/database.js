import dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config();
const pgp = pgPromise({});
const banco = pgp(process.env.URL_BANCO);
export default banco;
