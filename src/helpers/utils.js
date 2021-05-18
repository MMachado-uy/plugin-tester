const LOCAL_STORAGE_KEY = 'pluginTesterWarningDismissal';
// const STORAGE_TTL = 1000 * 60 * 60 * 24 * 14;
const STORAGE_TTL = 1000 * 10;

export const dismissWarning = () => {
  const store = {
    val: true,
    expiration: new Date().getTime() + STORAGE_TTL
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
}

export const hasArleadyDismissed = () => {
  let stored = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!stored) return false;
  else {
    stored = JSON.parse(stored);
    const now = new Date().getTime();

    if (stored.val && stored.expiration >= now) return true
    else return false;
  }
}
