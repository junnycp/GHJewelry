package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.dao.UserDao;
import com.codershop.shoppinganywhere.model.User;
import com.codershop.shoppinganywhere.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("UserServiceImpl")
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;

    @Override
    public List<User> getAllUser() {
        return userDao.getAllUser();
    }

    @Override
    public User insert(User user) {
        return userDao.insert(user);
    }

    @Override
    public User update(User user) {
        return userDao.update(user);
    }

    @Override
    public boolean delete(Long idUser) {
        return userDao.delete(idUser);
    }

    @Override
    public User findById(Long idUser) {
        return userDao.findById(idUser);
    }
}
