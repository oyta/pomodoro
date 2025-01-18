import {
  PersistentStorageBase,
  LocalStorageHandler,
} from "./persistentStorage.js";
export class Program {
  static keyNotificationSubscriptionStatus =
    "keyNotificationSubscriptionStatus";
  async run() {
    this.configureServiceWorker();
    this.configureEventListeners();
    this.storage = new LocalStorageHandler();
  }

  configureEventListeners() {
    const button = document.getElementById("toggleNotificationsButton");
    button.addEventListener("click", async () => {
      const result = await window.Notification.requestPermission();
      if (result === "granted") {
        await registration.showNotification("🍅", {
          body: "Notification from Pomo is set up.",
        });
        this.storage.set(
          LocalStorageHandler.getKey("keyNotificationSubscriptionStatus"),
          "granted",
        );
      } else if (result === "denied") {
        this.storage.set(
          LocalStorageHandler.getKey("keyNotificationSubscriptionStatus"),
          "denied",
        );
      }
    });
  }

  async configureServiceWorker() {
    this.registration = await navigator.serviceWorker.register(
      "serviceworker.js",
      {
        scope: "./",
      },
    );
  }
}
