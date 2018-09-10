package com.rnfcm;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.rnfcm.modules.RNFCM;

import java.util.Collections;
import java.util.List;

/**
 * Project: rnfcm
 * Created by DuongHV.
 * Copyright (c) 2018 - HUST.
 */
public class ReactNativeFCMPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(
        ReactApplicationContext reactContext) {
        return Collections.<NativeModule>singletonList(new RNFCM(reactContext));
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
