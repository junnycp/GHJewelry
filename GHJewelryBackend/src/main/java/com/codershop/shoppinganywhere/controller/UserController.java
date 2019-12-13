package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.common.utils.ExceptionUtil;
import com.codershop.shoppinganywhere.exception.AuthenticationFailedException;
import com.codershop.shoppinganywhere.model.MessagesResponse;
import com.codershop.shoppinganywhere.model.User;
import com.codershop.shoppinganywhere.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Map;

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
    @PreAuthorize("@appAuthorizer.authorize(authentication, 'LOGIN', this)")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public
    ResponseEntity<Object> login(@RequestBody @Valid Map map) throws AuthenticationFailedException, NoSuchAlgorithmException {
        MessagesResponse mess = new MessagesResponse();
        User users = userService.authentication(map.get("userName").toString(),map.get("password").toString());
        if (users != null) {
            mess.setCode("LOGIN");
            mess.setData(users);
            mess.setStatus("SUCCESS");
            mess.setMessage("Đăng nhập thành công");
        } else {
            mess.setMessage("Đăng nhập thất bại");
        }
        return new ResponseEntity(mess, HttpStatus.OK);
    }

}
