package com.codershop.shoppinganywhere.common.entity;

public class MessagesResponse {

    public interface RESPONSE_CODE {
        String SUCCESS = "SUCCESS";
        String EXCEPTION = "EXCEPTION";
        String DUPLICATE_KEY = "DUPLICATE_KEY";
        String NOT_EXISTS = "NOT_EXISTS";
        String DUPLICATE_REQUEST = "DUPLICATE_REQUEST";
        String REQUIRED_DATA = "REQUIRED_DATA";
    }

    public interface RESPONSE_STATUS {
        String SUCCESS = "SUCCESS";
        String ERROR = "ERROR";
        String ERROR_WITH_PAR = "ERROR_WITH_PAR";
    }


    private String code;
    private String[] paramCode;
    private String message;
    private String status;
    private Object data;

    public MessagesResponse(){
        this.code = RESPONSE_CODE.SUCCESS;
        this.status = RESPONSE_STATUS.SUCCESS;
    }

    public MessagesResponse error(Exception e){
        this.setCode(RESPONSE_CODE.EXCEPTION);
        this.setStatus(RESPONSE_STATUS.ERROR);
        this.setMessage(e.toString());
        return this;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String[] getParamCode() {
        return paramCode;
    }

    public void setParamCode(String[] paramCode) {
        this.paramCode = paramCode;
    }
}
