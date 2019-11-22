package com.codershop.shoppinganywhere.common.message;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

/**
 * Author: PhucVM
 * Date: 21/10/2019
 */
@XmlRootElement(name = "error")
public class ErrorResponse {

    public ErrorResponse(String message, List<String> details) {
        this.message = message;
        this.details = details;
    }

    public ErrorResponse(String code, String message, List<String> details) {
        this(message, details);
        this.code = code;
    }

    private String code;

    //General error message about nature of error
    private String message;

    //Specific errors in API request processing
    private List<String> details;

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

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }
}
