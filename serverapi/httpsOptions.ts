import { readFileSync } from 'fs';

const keyFile = readFileSync('./key.pem');
const certFile = readFileSync('./certificate.pem');

const httpsOptions = {
  key: keyFile,
  cert: certFile,
};
