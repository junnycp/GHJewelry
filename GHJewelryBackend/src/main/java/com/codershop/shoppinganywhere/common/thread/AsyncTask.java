package com.codershop.shoppinganywhere.common.thread;

import com.codershop.shoppinganywhere.common.logging.LogThread;

import java.util.ArrayList;

/**
 * com.fis.fw.common.thread.AsyncTask
 * TungHuynh
 * Created by sondt18@fpt.com.vn
 * Date 19/07/2019 3:28 PM
 */
public class AsyncTask extends ThreadManager {
    @Override
    public void doProcess(ArrayList items) {
        LogThread logThread = new LogThread();
        logThread.setItems(items);
        executorService.submit(() -> {
            for(Object item : items){
                ((Listener)item).execute();
            }
            return null;
        });
    }

    public interface Listener<O>{
        public O execute() throws Exception;
    }
}
