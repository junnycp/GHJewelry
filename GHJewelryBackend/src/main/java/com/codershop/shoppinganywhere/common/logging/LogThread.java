package com.codershop.shoppinganywhere.common.logging;

import com.codershop.shoppinganywhere.common.ApplicationContextProvider;
import com.codershop.shoppinganywhere.common.entity.LogAction;
import com.codershop.shoppinganywhere.common.entity.LogApi;
import com.codershop.shoppinganywhere.common.entity.LogSend;
import com.codershop.shoppinganywhere.common.entity.ScheduleLog;
import com.codershop.shoppinganywhere.common.service.LogActionService;
import com.codershop.shoppinganywhere.common.service.LogApiService;
import com.codershop.shoppinganywhere.common.service.LogSendService;
import com.codershop.shoppinganywhere.common.service.ScheduleLogService;
import com.codershop.shoppinganywhere.common.thread.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class LogThread extends Task {
    private final Logger logger = LoggerFactory.getLogger(LogThread.class);

    LogApiService logApiService = ApplicationContextProvider.getBean("LogApiServiceImpl", LogApiService.class);
    LogActionService logActionService = ApplicationContextProvider.getBean("LogActionServiceImpl", LogActionService.class);
    LogSendService logSendService = ApplicationContextProvider.getBean("LogSendServiceImpl", LogSendService.class);
    ScheduleLogService scheduleLogService = ApplicationContextProvider.getBean("ScheduleLogServiceImpl", ScheduleLogService.class);

    @Override
    public Integer call() throws Exception {
        List lstLog = getItems();
        try {
            if (lstLog != null && !lstLog.isEmpty()) {
                List<LogApi> lstApi = new ArrayList();
                List<LogAction> lstAction = new ArrayList();
                List<LogSend> lstSend = new ArrayList();
                List<ScheduleLog> lstSchedule = new ArrayList();
                for (Object item : lstLog) {
                    if (item instanceof LogApi) {
                        lstApi.add((LogApi) item);
                    } else if (item instanceof LogAction) {
                        lstAction.add((LogAction) item);
                    } else if (item instanceof LogSend) {
                        lstSend.add((LogSend) item);
                    } else if (item instanceof ScheduleLog) {
                        lstSchedule.add((ScheduleLog) item);
                    }
                }
                if (!lstApi.isEmpty()) {
                    logApiService.save(lstApi);
                }
                if (!lstAction.isEmpty()) {
                    logActionService.save(lstAction);
                }
                if (!lstSend.isEmpty()) {
                    logSendService.save(lstSend);
                }
                if (!lstSchedule.isEmpty()) {
                    scheduleLogService.save(lstSchedule);
                }
            }
        } catch (Exception e) {
            logger.error(e.toString(), e);
            return 0;
        }
        return 1;
    }
}
