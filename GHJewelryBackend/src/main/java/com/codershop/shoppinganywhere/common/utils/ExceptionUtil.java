package com.codershop.shoppinganywhere.common.utils;

import com.codershop.shoppinganywhere.common.contant.AppConstants;
import com.codershop.shoppinganywhere.common.exceptions.AppException;
import org.springframework.dao.DataAccessException;

/**
 * Author: PhucVM
 * Date: 21/10/2019
 */
public class ExceptionUtil {

    public static RuntimeException getDuplicateException() {
        return new AppException(AppConstants.DUPLICATE, "Duplicate");
    }

    public static RuntimeException getDeleteChildFirstException() {
        return new AppException(AppConstants.DELETE_CHILD_FIRST, "Delete child first");
    }

    public static RuntimeException getRuntimException(RuntimeException ex) {
        try {
            if (ex instanceof DataAccessException) {
                String code = getErrorCode(ex);
                if (code.equals(AppConstants.SYSTEM_ERROR_CODE.ORACLE_UNIQUE_CONSTRAINT_VIOLATED)) {
                    return getDuplicateException();
                }
                if (code.equals(AppConstants.SYSTEM_ERROR_CODE.ORACLE_MAX_LENGTH)) {
                    return new AppException(AppConstants.MAX_LENGHTH, getErrorMessage(ex));
                }
                if (code.equals(AppConstants.SYSTEM_ERROR_CODE.ORACLE_INVALID_ROWID)) {
                    return new AppException(AppConstants.SYSTEM_ERROR, getErrorMessage(ex));
                }
            }
        } catch (Exception e) {
            return ex;
        }

        return ex;
    }

    private static String getErrorCode(Exception ex) {
        String exMsg = ex.getCause().getCause().getMessage();
        return exMsg.substring(0, exMsg.indexOf(":"));
    }

    private static String getErrorMessage(Exception ex){
        return ex.getCause().getCause().getMessage();
    }
}
