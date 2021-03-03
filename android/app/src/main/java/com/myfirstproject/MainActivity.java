package com.myfirstproject;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);

        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                SplashScreen.hide(MainActivity.this);
            }
        }, 2000);
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RNDemo";
    }

    @Override
    public int checkPermission(String permission, int pid, int uid) {
        return 0;
    }

    @Override
    public int checkSelfPermission(String permission) {
        return 0;
    }

    @Override
    public boolean shouldShowRequestPermissionRationale(String permission) {
        return false;
    }
}
