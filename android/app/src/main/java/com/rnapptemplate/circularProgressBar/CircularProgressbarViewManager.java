package com.rnapptemplate.circularProgressBar;

import android.content.Context;
import android.graphics.Color;
import android.text.TextUtils;
import android.util.Log;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.Interpolator;
import android.view.animation.LinearInterpolator;

import androidx.interpolator.view.animation.FastOutSlowInInterpolator;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.BaseViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import fr.castorflex.android.circularprogressbar.CircularProgressBar;
import fr.castorflex.android.circularprogressbar.CircularProgressDrawable;


public class CircularProgressbarViewManager extends BaseViewManager<CircularProgressBar, CircularProgressBarShadowNode> {
    private static final String NAME = "CircularProgressBar";
    private static final String TAG = CircularProgressbarViewManager.class.getSimpleName();
    public static final Object lock = new Object();

    private CircularProgressDrawable.Builder builder;

    public static CircularProgressBar createCircularProgressBar(Context context){
        synchronized (lock){
            return new CircularProgressBar(context);
        }
    }

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public CircularProgressBarShadowNode createShadowNodeInstance() {
        return new CircularProgressBarShadowNode();
    }

    @Override
    public Class<? extends CircularProgressBarShadowNode> getShadowNodeClass() {
        return CircularProgressBarShadowNode.class;
    }

    @Override
    protected CircularProgressBar createViewInstance(ThemedReactContext reactContext) {
        builder = new CircularProgressDrawable.Builder(reactContext, true);
        CircularProgressBar circularProgressBar = createCircularProgressBar(reactContext);
        circularProgressBar.setIndeterminate(true);
        circularProgressBar.setIndeterminateDrawable(builder.build());
        return circularProgressBar;
    }

    @ReactProp(name = "color")
    public void setColor(CircularProgressBar circularProgressBar, String color){
        if (TextUtils.isEmpty(color)){
            return;
        }
        try {
            circularProgressBar.setIndeterminateDrawable(builder.color(Color.parseColor(color)).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    @ReactProp(name = "colors")
    public void setColors(CircularProgressBar circularProgressBar, ReadableArray readableArrayColors){
        if (readableArrayColors != null && readableArrayColors.size() > 0){
            try {
                int[] colors = new int[readableArrayColors.size()];
                for (int i = 0; i < readableArrayColors.size(); i++){
                    try {
                        colors[i] = Color.parseColor(readableArrayColors.getString(i));
                    }catch (Exception e){
                        Log.e(TAG, "", e);
                    }
                }
                Utils.checkColors(colors);
                circularProgressBar.setIndeterminateDrawable(builder.colors(colors).build());
            }catch (Exception e){
                Log.e(TAG, "", e);
            }

        }
    }

    @ReactProp(name = "sweepSpeed")
    public void setSweepSpeed(CircularProgressBar circularProgressBar, float sweepSpeed){
        try {
            Utils.checkSpeed(sweepSpeed);
            circularProgressBar.setIndeterminateDrawable(builder.sweepSpeed(sweepSpeed).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    @ReactProp(name = "rotationSpeed")
    public void setRotationSpeed(CircularProgressBar circularProgressBar, float rotationSpeed){
        try {
            Utils.checkSpeed(rotationSpeed);
            circularProgressBar.setIndeterminateDrawable(builder.rotationSpeed(rotationSpeed).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    @ReactProp(name = "minSweepAngle")
    public void setMinSweepAngle(CircularProgressBar circularProgressBar, int minSweepAngle){
        try {
            Utils.checkAngle(minSweepAngle);
            circularProgressBar.setIndeterminateDrawable(builder.minSweepAngle(minSweepAngle).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    @ReactProp(name = "maxSweepAngle")
    public void setMaxSweepAngle(CircularProgressBar circularProgressBar, int maxSweepAngle){
        try {
            Utils.checkAngle(maxSweepAngle);
            circularProgressBar.setIndeterminateDrawable(builder.maxSweepAngle(maxSweepAngle).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    @ReactProp(name = "strokeWidth")
    public void strokeWidth(CircularProgressBar circularProgressBar, float strokeWidth){
        Interpolator interpolator;
        try {
            Utils.checkPositiveOrZero(strokeWidth, "strokeWidth");
            circularProgressBar.setIndeterminateDrawable(builder.strokeWidth(strokeWidth).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    @ReactProp(name = "circularProgressBarStyle")
    public void setStyle(CircularProgressBar circularProgressBar, String style){
        if (TextUtils.isEmpty(style)){
            return;
        }
        try{
            circularProgressBar.setIndeterminateDrawable(builder.style(CircularProgressDrawable.Style.valueOf(style)).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    @ReactProp(name = "sweepInterpolator")
    public void setSweepInterpolator(CircularProgressBar circularProgressBar, String interpolatorName){
        if (TextUtils.isEmpty(interpolatorName)){
            return;
        }
        try {
            Interpolator interpolator = getInterpolator(interpolatorName);
            Utils.checkNotNull(interpolator, "");
            circularProgressBar.setIndeterminateDrawable(builder.sweepInterpolator(interpolator).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    @ReactProp(name = "angleInterpolator")
    public void setAngleInterpolator(CircularProgressBar circularProgressBar, String interpolatorName){
        if (TextUtils.isEmpty(interpolatorName)){
            return;
        }
        try {
            Interpolator interpolator = getInterpolator(interpolatorName);
            Utils.checkNotNull(interpolator, "");
            circularProgressBar.setIndeterminateDrawable(builder.angleInterpolator(interpolator).build());
        }catch (Exception e){
            Log.e(TAG, "", e);
        }
    }

    private Interpolator getInterpolator(String interpolatorName){
        switch (interpolatorName){
            case "linear":
                return new LinearInterpolator();
            case "accelerateDecelerate":
                return new AccelerateDecelerateInterpolator();
            case "decelerate":
                return new DecelerateInterpolator();
            case "accelerate":
                return new AccelerateInterpolator();
            case "fastOutSlowIn":
                return new FastOutSlowInInterpolator();
            default:
                throw new RuntimeException(interpolatorName + " not supported yet");
        }
    }

    @Override
    public void updateExtraData(CircularProgressBar root, Object extraData) {} // Do nothing
}
