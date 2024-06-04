export function getCookieExpirationTimer(sessionInDays:number){
    const sessionInMilliSeconds = Math.floor(sessionInDays * 24 * 60 * 60 * 1000);
    const expirationDate = new Date(Date.now() + sessionInMilliSeconds );
    return expirationDate;
  }