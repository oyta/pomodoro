export class Notifier {
  observerCollection;
  constructor() {
    this.observerCollection = new Array();
  }

  notifyObservers(data) {
    for (const observer of this.observerCollection) {
      observer.notify(data);
    }
  }

  addObserver(observer) {
    this.observerCollection.push(observer);
  }
}

export class Notification {
  name;
  data;
  constructor(initName, initData) {
    this.name = initName;
    this.data = initData;
  }
}
