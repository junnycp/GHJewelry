package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.common.generics.ComplexQueryService;
import com.codershop.shoppinganywhere.model.User;

public interface UserService extends ComplexQueryService<User,Long> {
    boolean isDuplicate(String userName, Long idUser);
}
