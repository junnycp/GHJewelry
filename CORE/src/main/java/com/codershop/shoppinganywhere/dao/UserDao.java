package com.codershop.shoppinganywhere.dao;

import com.codershop.shoppinganywhere.common.generics.GenericDao;
import com.codershop.shoppinganywhere.model.Category;
import com.codershop.shoppinganywhere.model.User;

import java.util.List;

public interface UserDao extends GenericDao<User, Integer> {
    List<User> getAllUser();
    User insert(User user);
    User update(User user);
    boolean delete(Long idUser);
    User findById(Long idUser);
}
