
const getLastUpdateOn = (key: string): Date | undefined => {
  if (!localStorage.getItem(`${key}-last-update`)) return undefined;
  return new Date(localStorage.getItem(`${key}-last-update`) ?? '');
}
const getValuesIn = <T>(key: string): T | undefined => JSON.parse(localStorage.getItem(key)?? '')[key] || undefined;
const saveTo = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify({ [key]: value }));
  localStorage.setItem(`${key}-last-update`, new Date().toISOString());
}

export {
  getLastUpdateOn,
  getValuesIn,
  saveTo,
};
