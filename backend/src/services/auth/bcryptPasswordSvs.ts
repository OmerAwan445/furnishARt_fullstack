import bcrypt from 'bcrypt';

const saltRounds = 12;

export async function hashPassword(password:string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password:string, hash:string) {
  return await bcrypt.compare(password, hash);
}
