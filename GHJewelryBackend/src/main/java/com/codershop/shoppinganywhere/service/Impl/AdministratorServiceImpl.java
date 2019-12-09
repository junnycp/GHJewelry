package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.dao.AdministratorDao;
import com.codershop.shoppinganywhere.exception.AuthenticationFailedException;
import com.codershop.shoppinganywhere.model.Administrator;
import com.codershop.shoppinganywhere.service.AdministratorService;
import com.codershop.shoppinganywhere.util.ShaHashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service("AdministratorServiceImpl")
@Transactional
public class AdministratorServiceImpl implements AdministratorService {
    @Autowired
    AdministratorDao administratorDao;


    @Override
    public Administrator authentication(String username, String password) throws AuthenticationFailedException, NoSuchAlgorithmException {
        Administrator administrator = administratorDao.findByUsername(username);
    if(administrator.getPassword().equals(password)) {
        return administrator;
    }
    else
        throw new AuthenticationFailedException();
    }

    @Override
    public List<Administrator> getAll() {
        return administratorDao.getAll();
    }
}
