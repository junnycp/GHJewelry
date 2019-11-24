package com.codershop.shoppinganywhere.dao.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.GenericDaoImpl;
import com.codershop.shoppinganywhere.dao.AdministratorDao;
import com.codershop.shoppinganywhere.dao.repo.AdministratorRepo;
import com.codershop.shoppinganywhere.model.Administrator;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class AdministratorDaoImpl extends GenericDaoImpl<Administrator, Integer> implements AdministratorDao{
    private AdministratorRepo administratorRepo;
    private final EntityManager em;

    public AdministratorDaoImpl(EntityManager em, AdministratorRepo administratorRepo) {
        this.em = em;
        this.administratorRepo = administratorRepo;
    }

    @Override
    public Administrator findByUsername(String username) {
        return administratorRepo.findByUsername(username);
    }

    @Override
    public List<Administrator> getAll() {
        return administratorRepo.getAllAdministrator();
    }
}
