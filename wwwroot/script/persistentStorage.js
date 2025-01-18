export class PersistentStorageBase {
  get(key) {
    throw new Error("Not implemented yet");
  }

  set(key, value) {
    throw new Error("Not implemented yet");
  }

  getKey(itemName) {
    throw new Error("Not implemented yet");
  }
}

export class LocalStorageHandler extends PersistentStorageBase {
  static lsKeyBase = "pomo";
  static lsPathName = location.pathName;
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getKey(itemName) {
    return `${LocalStorageHandler.lsKeyBase}_${LocalStorageHandler.lsPathName}_${itemName}`;
  }
}
