package com.codershop.shoppinganywhere.common.logging;

import com.codershop.shoppinganywhere.common.thread.ThreadManager;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * com.fis.fw.common.logging.LogManager
 * TungHuynh
 * Created by sondt18@fpt.com.vn
 * Date 11/05/2019 9:47 AM
 */
@Component
public class LogManager extends ThreadManager {
    @Override
    public void doProcess(ArrayList items) {
        LogThread logThread = new LogThread();
        logThread.setItems(items);
        executorService.submit(logThread);
    }
}
