import { randomBytes, scryptSync } from 'crypto';

export function hash(pass) {
  const salt = randomBytes(8).toString('hex');
  const hash = scryptSync(pass, salt, 32).toString('hex');
  return `${salt}.${hash}`;
}

export function checkHash(pass, original) {
  const [salt, originalHash] = original.split('.');
  const hash = scryptSync(pass, salt, 32).toString('hex');
  return hash === originalHash;
}
