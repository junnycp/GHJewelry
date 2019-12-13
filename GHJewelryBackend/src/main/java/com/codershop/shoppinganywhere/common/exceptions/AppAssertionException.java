package com.codershop.shoppinganywhere.common.exceptions;
import com.codershop.shoppinganywhere.common.contant.AppConstants;
public class AppAssertionException extends AppException {
    private static final long serialVersionUID = 1L;

    public AppAssertionException(String messages) {
        super(AppConstants.NULL_OBJ, messages);
    }
}
