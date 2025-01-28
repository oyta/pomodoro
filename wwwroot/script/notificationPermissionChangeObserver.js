import { Observer } from "observer.js";
export class NotificationPermissionChangeObserver extends Observer {
  notify(data) {
    super(data);
    console.log("Notification received");
  }
}
