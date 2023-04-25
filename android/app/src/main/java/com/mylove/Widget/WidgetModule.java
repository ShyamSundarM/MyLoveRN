package com.mylove.Widget;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.widget.RemoteViews;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mylove.LoverPhotoWidget;
import com.mylove.R;

import java.net.URL;

public class WidgetModule extends ReactContextBaseJavaModule {
    @NonNull
    @Override
    public String getName() {
        return "WidgetModule";
    }
    Context ctx;

    WidgetModule(ReactApplicationContext ctx){
        super(ctx);
        this.ctx = ctx;
    }

    @ReactMethod
    public void setWidgetData(String message, String url){
        //Toast.makeText(ctx, message, Toast.LENGTH_SHORT).show();
        try{
            Bitmap bitmap = BitmapFactory.decodeStream(new URL(url).openConnection().getInputStream());
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(ctx);
            ComponentName provider = new ComponentName(ctx, LoverPhotoWidget.class);
            int[] ids = appWidgetManager.getAppWidgetIds(provider);
            if(ids.length > 0){
                RemoteViews views = new RemoteViews(ctx.getPackageName(), R.layout.lover_photo_widget);
                views.setTextViewText(R.id.widget_text,message);
                views.setImageViewBitmap(R.id.widget_pic, bitmap);
                for (int id:ids) {
                    appWidgetManager.updateAppWidget(id,views);
                }
            }else{
                Toast.makeText(ctx, "Add Widget to see data", Toast.LENGTH_LONG).show();
            }

        }catch (Exception e){
            Toast.makeText(ctx, "Widget Error", Toast.LENGTH_SHORT).show();
        }
    }
}
