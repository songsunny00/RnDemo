package com.cjspd.hjxStore;

import android.app.Application;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.banli17.RNUpdateAppPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnfs.RNFSPackage;
import com.zmxv.RNSound.RNSoundPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication {

  // 设置为 true 将不会弹出 toast
  private boolean SHUTDOWN_TOAST = false;
  // 设置为 true 将不会打印 log
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNUpdateAppPackage(),
            new RNFSPackage(),
            new RNDeviceInfo(),
            new BackgroundTimerPackage(),
            new SvgPackage(),
            new BaiduMapPackage(getApplicationContext()),
            new PickerPackage(),
            new RNSoundPackage(),
            new RNCameraPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),   //  <-- 添加 JPushPackage
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new RNFetchBlobPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
