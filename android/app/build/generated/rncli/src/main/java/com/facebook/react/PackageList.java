
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.carapp.BuildConfig;
import com.carapp.R;

// react-native-biometrics
import com.rnbiometrics.ReactNativeBiometricsPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-cardview
import com.kishanjvaghela.cardview.RNCardViewPackage;
// react-native-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;
// react-native-fingerprint-scanner
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-touch-id
import com.rnfingerprint.FingerprintAuthPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.reactNativeHost = null;
    this.application = application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new ReactNativeBiometricsPackage(),
      new RNCameraPackage(),
      new RNCardViewPackage(),
      new RNFetchBlobPackage(),
      new ReactNativeFingerprintScannerPackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new ReanimatedPackage(),
      new RNScreensPackage(),
      new FingerprintAuthPackage(),
      new VectorIconsPackage()
    ));
  }
}
