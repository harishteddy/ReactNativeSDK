package com.reactsdk;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import com.netcore.android.Smartech;
import com.netcore.android.logger.SMTDebugLevel;
import com.netcore.android.smartechpush.SmartPush;
import com.netcore.android.smartechpush.notification.SMTNotificationOptions;

import java.lang.ref.WeakReference;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
      Smartech.getInstance(new WeakReference<>(this)).initializeSdk(this);
      Smartech.getInstance(new WeakReference<>(this)).trackAppInstallUpdateBySmartech();
      Smartech smartech = Smartech.getInstance(new WeakReference<>(this.getApplicationContext()));
      smartech.setDebugLevel(SMTDebugLevel.Level.VERBOSE);



      try {
          SmartPush smartPush = SmartPush.getInstance(new WeakReference<>(this));
          smartPush.fetchAlreadyGeneratedTokenFromFCM();
      } catch (Exception e) {

      }

      SMTNotificationOptions options = new SMTNotificationOptions(this);
      options.setBrandLogo("logo"); //e.g.logo is sample name for brand logo
      options.setLargeIcon("icon_nofification");//e.g.ic_notification is sample name for large icon
      options.setSmallIcon("ic_action_play"); //e.g.ic_action_play is sample name for icon
      options.setSmallIconTransparent("ic_action_play"); //e.g.ic_action_play is sample name for transparent small icon
      options.setTransparentIconBgColor("#FF0000");
      options.setPlaceHolderIcon("ic_notification");//e.g.ic_notification is sample name for placeholder icon
      SmartPush.getInstance(new WeakReference(this)).setNotificationOptions(options);
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
