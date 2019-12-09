package com.codershop.shoppinganywhere.common.exceptions;
/**
 * com.fis.fw.common.exceptions.AppException
 * TungHuynh
 * Created by sondt18@fpt.com.vn
 * Date 11/05/2019 9:47 AM
 */
public class AppException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private String code;
    private String message;

    public AppException(String code) {
        this.code = code;
    }

    public AppException(String strReason, String strContext) {
        this.code = strReason;
        this.message = strContext;
    }

    public AppException(Exception e, String message) {
        super(e);
        this.message = message;
    }

    public AppException(Exception e, String code, String message) {
        super(e);
        this.code = code;
        this.message = message;
    }

    public AppException withErrorCode(String code) {
        this.code = code;
        return this;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    @Override
    public String toString() {
        return getCode() + ": " + this.message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
