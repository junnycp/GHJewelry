package com.codershop.shoppinganywhere.common.utils;

/**
 * Author: PhucVM
 * Date: 30/07/2019
 * Time: 14:32:20
 */
public class ValidationUtil extends AssertionUtil {

    public static boolean isNullOrEmpty(String st) {
        return st == null || st.equals("");
    }
}
