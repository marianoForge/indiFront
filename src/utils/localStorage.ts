const isLocalStorageAvailable = () => {
  try {
    const key = "storage_test";
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error("Local storage is not available!");
    return false;
  }
};

export const getItemFromLocalStorage = (key: string) => {
  if (isLocalStorageAvailable()) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }
  return null;
};

export const setItemToLocalStorage = (key: string, value: any) => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeItemFromLocalStorage = (key: string) => {
  if (isLocalStorageAvailable()) {
    localStorage.removeItem(key);
  }
};
