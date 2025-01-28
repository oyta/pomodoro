import { Observer } from "./observer.js";
import { Notifier, Notification } from "./notifier.js";
export class NotificationPermissionHandler extends Notifier {
  _state = "";
  constructor() {
    super();
    PermissionHandler.queryAndTrackPermission(
      "notifications",
      this.stateResultCallback.bind(this),
    );
  }

  stateResultCallback(permissionStatus) {
    this.state = permissionStatus.state;
  }

  isGranted() {
    return this.state === "granted";
  }

  get state() {
    return this._state;
  }

  set state(value) {
    const isNewValue = value !== this._state;
    if (isNewValue) {
      this._state = value;
      super.notifyObservers(
        new Notification("notificationPermission.stateChange", value),
      );
    }
  }
}

class PermissionHandler {
  static queryAndTrackPermission(permissionName, callback) {
    navigator.permissions
      .query({ name: permissionName })
      .then((permissionStatus) => {
        console.log(
          `${permissionName} permission state is ${permissionStatus.state}`,
        );
        callback(permissionStatus);
        permissionStatus.onchange = () => {
          console.log(
            `${permissionName} permission status has changed to ${permissionStatus.state}`,
          );
          callback(permissionStatus);
        };
      });
  }
}
