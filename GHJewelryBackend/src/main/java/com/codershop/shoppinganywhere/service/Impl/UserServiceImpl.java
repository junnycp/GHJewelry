package com.codershop.shoppinganywhere.service.Impl;

import com.codershop.shoppinganywhere.common.generics.impl.ComplexQueryServiceImpl;
import com.codershop.shoppinganywhere.dao.repo.UserRepo;
import com.codershop.shoppinganywhere.exception.AuthenticationFailedException;
import com.codershop.shoppinganywhere.model.User;
import com.codershop.shoppinganywhere.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;

@Service("UserServiceImpl")
@Transactional
public class UserServiceImpl extends ComplexQueryServiceImpl<User, Long> implements UserService {
    @Autowired
    private UserRepo repo;

    @Override
    public User authentication(String username, String password) throws AuthenticationFailedException, NoSuchAlgorithmException {
        User user = repo.findByUsername(username);
        if (user != null) {
            if (user.getPassword().equals(password)) {
                System.out.println(user.getIdUser());
                return user;
            } else {
                throw new AuthenticationFailedException();
            }

        } else {
            throw new AuthenticationFailedException();
        }
    }

    @Override
    public boolean isDuplicate(String userName, Long idUser) {
        return repo.countUser(userName, idUser) > 0;
    }

}
