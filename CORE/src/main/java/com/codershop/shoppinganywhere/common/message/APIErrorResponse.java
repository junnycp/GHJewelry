package com.codershop.shoppinganywhere.common.message;

import com.codershop.shoppinganywhere.common.contant.AppConstants;
import com.codershop.shoppinganywhere.common.exceptions.AppException;

/**
 * Author: PhucVM
 * Date: 21/10/2019
 */
public class APIErrorResponse extends APIResponse {

    public APIErrorResponse() {
        super();
    }

    public APIErrorResponse(String code) {
        super();
        setCode(code);
        setMessage(code);
    }

    public APIErrorResponse forException(Exception exception) {
        if(exception==null) {
            setCode(AppConstants.SYSTEM_ERROR);
            setMessage("Unkown error. Exception is null");
            return this;
        }
        if(exception instanceof AppException) {
            setCode(((AppException)exception).getCode());
            setMessage(exception.getMessage());
            return this;
        }
        setCode(AppConstants.SYSTEM_ERROR);
        setMessage(exception.getMessage());
        return this;
    }
}
