package com.rnfcm.modules;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/**
 * Project: rnfcm
 * Created by DuongHV.
 * Copyright (c) 2018 - HUST.
 */
public class RNFCM extends ReactContextBaseJavaModule implements ActivityEventListener {

    public static final String LOG_TAG = "RNFCM";// all logging should use this tag

    private RNPushNotificationHelper mRNPushNotificationHelper;

    public RNFCM(ReactApplicationContext reactContext) {
        super(reactContext);

        reactContext.addActivityEventListener(this);
        Application applicationContext = (Application) reactContext.getApplicationContext();

        // The @ReactNative methods use this
        mRNPushNotificationHelper = new RNPushNotificationHelper(applicationContext);
        // This is used to delivery callbacks to JS
        mJsDelivery = new RNPushNotificationJsDelivery(reactContext);

        registerNotificationsRegistration();
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public String getName() {
        return null;
    }
}
