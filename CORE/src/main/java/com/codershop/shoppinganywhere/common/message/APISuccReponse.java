package com.codershop.shoppinganywhere.common.message;

import com.codershop.shoppinganywhere.common.contant.AppConstants;

/**
 * Author: PhucVM
 * Date: 21/10/2019
 */
public class APISuccReponse extends APIResponse {

    public APISuccReponse() {
        setCode(AppConstants.SUCC_CODE);
    }
}
