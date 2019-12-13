package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.dao.AdministratorDao;
import com.codershop.shoppinganywhere.exception.AuthenticationFailedException;
import com.codershop.shoppinganywhere.model.Administrator;
import com.codershop.shoppinganywhere.model.MessagesResponse;
import com.codershop.shoppinganywhere.service.AdministratorService;
import com.codershop.shoppinganywhere.util.ShaHashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@Service("AdministratorServiceImpl")
@Transactional
public class AdministratorServiceImpl implements AdministratorService {
    @Autowired
    AdministratorDao administratorDao;

    @Override
    public Administrator authentication(String username, String password) throws AuthenticationFailedException, NoSuchAlgorithmException {
        Administrator administrator = administratorDao.findByUsername(username);
        if (administrator != null) {
            if (administrator.getPassword().equals(ShaHashing.encrypted(password))) {
                return administrator;
            } else {
                throw new AuthenticationFailedException();
            }

        } else {
            throw new AuthenticationFailedException();
        }
    }

    @Override
    public List<Administrator> getAll() {
        return administratorDao.getAll();
    }

    @Override
    public Administrator findById(Long id) {
        return administratorDao.findById(id);
    }

    @Override
    public Administrator updateAdmin(String username, String password) throws NoSuchAlgorithmException, AuthenticationFailedException {
        Administrator administrator = administratorDao.findByUsername(username);
        if (administrator.getUserName().equals(username)) {
            administrator.setPassword(ShaHashing.encrypted(password));
            return administratorDao.updateAdmin(administrator);
        } else {
            throw new AuthenticationFailedException();
        }
    }
}
