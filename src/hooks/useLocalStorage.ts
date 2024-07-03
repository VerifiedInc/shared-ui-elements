export function useLocalStorage(key: string) {
  const get = () => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return null;
  };

  const set = (value: any) => {
    const _value = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, _value);
  };

  const remove = () => {
    localStorage.removeItem(key);
  };

  return { set, get, remove };
}
