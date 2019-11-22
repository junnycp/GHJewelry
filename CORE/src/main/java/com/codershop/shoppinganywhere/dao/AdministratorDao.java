package com.codershop.shoppinganywhere.dao;

import com.codershop.shoppinganywhere.common.generics.GenericDao;
import com.codershop.shoppinganywhere.model.Administrator;

import java.util.List;

public interface AdministratorDao extends GenericDao<Administrator, Integer> {
    Administrator findByUsername(String username);
    List<Administrator> getAll();
}
