package com.codershop.shoppinganywhere.common.service.impl;

import com.codershop.shoppinganywhere.common.ApplicationContextProvider;
import com.codershop.shoppinganywhere.common.entity.LogAction;
import com.codershop.shoppinganywhere.common.entity.Permission;
import com.codershop.shoppinganywhere.common.logging.LogManager;
import com.codershop.shoppinganywhere.common.service.AppAuthorizer;
import com.codershop.shoppinganywhere.common.service.PermissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ResolvableType;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

@Service("appAuthorizer")
public class AppAuthorizerImpl implements AppAuthorizer {

    private final Logger logger = LoggerFactory.getLogger(AppAuthorizerImpl.class);

    private final LogManager logManager;

    @Autowired
    public AppAuthorizerImpl(LogManager logManager) {
        this.logManager = logManager;
    }

    PermissionService permissionService = ApplicationContextProvider.getBean("PermissionServiceImpl", PermissionService.class);
//    com.codershop.shoppinganywhere.common.logging.LogManager logManager = ApplicationContextProvider.getBean("logManager", com.codershop.shoppinganywhere.common.logging.LogManager.class);

    @Override
    public boolean authorize(Authentication authentication, String action, Object callerObj) {
        String securedPath = extractSecuredPath(callerObj);
        logger.debug("Do authorize ====>  [resource: {}, action {}, user: {}]", securedPath, action, authentication.getName());
        return true;
//		if (StringUtil.stringIsNullOrEmty(securedPath)) {//login, logout
//			return true;
//		}
//		String menu = securedPath.substring(1);
//		boolean isAllow = false;
//		try {
//			UserAuthenticationToken user = (UserAuthenticationToken) authentication;
//			if (user==null || user.getData()==null){
//				return isAllow;
//			}
//			String userId = user.getData().getUserId();
//			if (StringUtil.stringIsNullOrEmty(userId)) {
//				return isAllow;
//			}
//			Map<String, String> map = new HashMap();
//			map.put("userId", userId);
//			map.put("menuCode", menu);
//			map.put("action", action);
//			List<Permission> lst = permissionService.getListPermission(map);
//			if (!lst.isEmpty()) {
//				String sessionId = StringUtil.nvl(user.getData().getSessionId(), "");
//				String requestPair = StringUtil.nvl(user.getData().getRequestPair(), "");
//				String appCode = StringUtil.nvl(user.getData().getAppCode(), "");
//				logAction(lst.get(0), appCode, sessionId, userId, requestPair);
//				isAllow = true;
//			}
//		} catch (Exception e) {
//			logger.error(e.toString(), e);
//			throw e;
//		}
//		return isAllow;
    }

    // Lay ra securedPath duoc Annotate trong entity
    private String extractSecuredPath(Object callerObj) {
        Class<?> clazz = ResolvableType.forClass(callerObj.getClass()).getRawClass();
        Optional<Annotation> annotation = Arrays.asList(clazz.getAnnotations()).stream().filter((ann) -> {
            return ann instanceof RequestMapping;
        }).findFirst();
        logger.debug("FOUND CALLER CLASS: {}", ResolvableType.forClass(callerObj.getClass()).getType().getTypeName());
        if (annotation.isPresent()) {
            return ((RequestMapping) annotation.get()).value()[0];
        }
        return null;
    }


    public void logAction(Permission obj, String appCode, String sessionId, String userId, String requestPair) {
        try {
            logger.info("=========== BEGIN LOG ACTION ==============");
            Integer menuId = obj.getMenuId();
            Integer privilegeId = obj.getPrivilegeId();
            logger.info("AppCode: " + appCode);
            logger.info("SessionId: " + sessionId);
            logger.info("UserId: " + userId);
            logger.info("RequestPair: " + requestPair);
            logger.info("PrivilegeId: " + privilegeId);
            logger.info("MenuId: " + menuId);
            LogAction logAction = new LogAction();
            logAction.setAppCode(appCode);
            logAction.setSessionId(Integer.valueOf(sessionId));
            logAction.setPrivilegeId(privilegeId);
            logAction.setMenuId(menuId);
            logAction.setUserId(Integer.valueOf(userId));
            logAction.setRequestPair(requestPair);
            logAction.setCreateTime(new Date());
            logManager.submit(logAction);
            logger.info("=========== END LOG ACTION ==============");
        } catch (Exception e) {
            logger.error(e.toString(), e);
        }
    }

}
