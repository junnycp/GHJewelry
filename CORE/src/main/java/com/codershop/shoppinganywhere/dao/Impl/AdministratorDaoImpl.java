package com.codershop.shoppinganywhere.dao.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.GenericDaoImpl;
import com.codershop.shoppinganywhere.dao.AdministratorDao;
import com.codershop.shoppinganywhere.model.Administrator;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class AdministratorDaoImpl extends GenericDaoImpl<Administrator, Integer> implements AdministratorDao{
    private final EntityManager em;

    public AdministratorDaoImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public Administrator findByUsername(String username) {
        String sql = "SELECT * FROM administrators WHERE username = :username";
        return (Administrator) em.createNativeQuery(sql,Administrator.class).setParameter("username", username);
    }

    @Override
    public List<Administrator> getAll() {
        String queryString = "select * from administrators";
        return (List<Administrator>) em.createNativeQuery(queryString).getResultList();
    }
}
