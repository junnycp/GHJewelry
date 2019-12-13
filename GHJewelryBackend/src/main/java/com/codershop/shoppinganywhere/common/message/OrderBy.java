package com.codershop.shoppinganywhere.common.message;

import javax.validation.constraints.NotEmpty;

/**
 * Author: PhucVM
 * Date: 21/10/2019
 */
public class OrderBy {

    @NotEmpty(message = "Property field must be not null")
    private String property;

    @NotEmpty(message = "Property direction must be not null")
    private String direction;

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }
}
