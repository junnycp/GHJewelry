package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.common.utils.ExceptionUtil;
import com.codershop.shoppinganywhere.model.User;
import com.codershop.shoppinganywhere.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/users")
public class UserController extends GenericController<User, Long> {
    @Autowired
    private UserService userService;

    @Override
    @PreAuthorize("@appAuthorizer.authorize(authentication, 'CREATE', this)")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody @Valid User user) {
        if (userService.isDuplicate(user.getUserName(), user.getIdUser())) {
            throw ExceptionUtil.getDuplicateException();
        }
        user.setCreateTime(new Date());
        return super.create(user);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'UPDATE', this)")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Object> update(@RequestBody @Valid User user) {
        if (userService.isDuplicate(user.getUserName(), user.getIdUser())) {
            throw ExceptionUtil.getDuplicateException();
        }
        return super.update(user);
    }
}
