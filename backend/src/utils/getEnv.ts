import config from 'config';

export function getEnv(envName:string):any {
  try {
    return config.get(envName);
  } catch (err) {
    console.error("NO ENV FOUND ", err);
    return null;
  }
}
