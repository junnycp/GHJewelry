package com.codershop.shoppinganywhere.common.contant;

public interface AppConstants {

    // Ma code tra ve cho cac API thanh cong
    String SUCC_CODE = "API000";
    // Ma code tra ve cho cac exception khong phai la AppException
    String SYSTEM_ERROR = "APP001";

    String NOT_FOUND = "APP002";

    String DUPLICATE = "APP003";

    String LOGIC_ERROR = "APP004";

    String DELETE_CHILD_FIRST = "APP021";

    // Cac app exception thi phai tra ve theo ma loi qui dinh
    String NULL_OBJ = "APP100";
    String MAX_LENGHTH = "APP300";

    interface DATE_FORMAT {

        String GLOBAL_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
        String ORACLE_DATE_FORMAT = "yyyy-mm-dd hh24:mi:ss";
        String TIME_ZONE = "GMT+7";
    }

    interface MESSAGE {

        String SUCCESS = "Success";
        String CREAT_SUCCESS = "Create success";
        String UPDATE_SUCCESS = "Update success";
        String DELETE_SUCCESS = "Update success";
    }

    interface SYSTEM_ERROR_CODE {

        String ORACLE_UNIQUE_CONSTRAINT_VIOLATED = "ORA-00001";
        String ORACLE_MAX_LENGTH = "ORA-12899";
        String ORACLE_INVALID_ROWID = "ORA-01410";
    }
}
