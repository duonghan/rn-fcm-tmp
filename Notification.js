'use strict';
import { NativeModules, DeviceEventEmitter } from 'react-native';

let RNPushNotification = NativeModules.RNPushNotification;
let _notifHandlers = new Map();

const DEVICE_NOTIF_EVENT = 'remoteNotificationReceived';
const NOTIF_REGISTER_EVENT = 'remoteNotificationsRegistered';
const REMOTE_FETCH_EVENT = 'remoteFetch';

class NotificationsComponent {

    getInitialNotification = () =>
        RNPushNotification.getInitialNotification()
            .then(notification => {
                if (notification && notification.dataJSON) {
                    return JSON.parse(notification.dataJSON);
                }
                return null;
            });

    requestPermissions = senderID => RNPushNotification.requestPermissions(senderID);

    subscribeToTopic = topic => RNPushNotification.subscribeToTopic(topic);

    presentLocalNotification = details => RNPushNotification.scheduleLocalNotification(details);

    setApplicationIconBadgeNumber = number => {
        if (!RNPushNotification.setApplicationIconBadgeNumber) {
            return;
        }
        RNPushNotification.setApplicationIconBadgeNumber(number);
    };

    checkPermissions = callback => RNPushNotification.checkPermissions().then(alert => callback({ alert }));

    addEventListener = (type, handle) => {
        let listener;
        if (type === 'notification') {
            listener = DeviceEventEmitter.addListener(
                DEVICE_NOTIF_EVENT,
                function (notifData) {
                    let data = JSON.parse(notifData.dataJSON);
                    handler(data);
                }
            );
        } else if (type === 'register') {
            listener = DeviceEventEmitter.addListener(
                NOTIF_REGISTER_EVENT,
                function (registrationInfo) {
                    handler(registrationInfo.deviceToken);
                }
            );
        } else if (type === 'remoteFetch') {
            listener = DeviceEventEmitter.addListener(
                REMOTE_FETCH_EVENT,
                function (notifData) {
                    let notificationData = JSON.parse(notifData.dataJSON)
                    handler(notificationData);
                }
            );
        }

        _notifHandlers.set(type, listener);

    };

    removeEventListener = (type, handle) => {
        let listener = _notifHandlers.get(type);
        if (!listener) {
            return;
        }
        listener.remove();
        _notifHandlers.delete(type);
    }

    registerNotificationActions = details => RNPushNotification.registerNotificationActions(details);
}

module.exports =  {state: false,
	                component: new NotificationsComponent()}