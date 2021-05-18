package com.rnapptemplate.circularProgressBar;

import android.view.View;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.yoga.YogaMeasureFunction;
import com.facebook.yoga.YogaMeasureMode;
import com.facebook.yoga.YogaMeasureOutput;
import com.facebook.yoga.YogaNode;

import fr.castorflex.android.circularprogressbar.CircularProgressBar;



public class CircularProgressBarShadowNode extends LayoutShadowNode implements YogaMeasureFunction {
    private static final String TAG = CircularProgressBarShadowNode.class.getSimpleName();

    public CircularProgressBarShadowNode() {
        setMeasureFunction(this);
    }

    @Override
    public long measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode) {
        CircularProgressBar circularProgressBar = CircularProgressbarViewManager.createCircularProgressBar(getThemedContext());
        circularProgressBar.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED);
        YogaMeasureOutput.make(circularProgressBar.getMeasuredWidth(), circularProgressBar.getMeasuredHeight());
        return 0;
    }
}
