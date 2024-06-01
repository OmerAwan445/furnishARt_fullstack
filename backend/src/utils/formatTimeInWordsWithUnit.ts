
function formatTimeInWordsWithUnit(timeInSeconds: number) {
  const timeUnit = timeInSeconds >= 3600 ? `hour` : 'minute';
  const timeValue = timeInSeconds >= 3600 ?
   timeInSeconds / 3600 : timeInSeconds / 60;
  return `${timeValue} ${timeUnit+(timeValue > 1 ? 's' : '')}`;
}


export { formatTimeInWordsWithUnit };

