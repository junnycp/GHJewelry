package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.common.service.JpaGenericService;
import com.codershop.shoppinganywhere.model.MessageResponse;
import com.codershop.shoppinganywhere.model.User;
import com.codershop.shoppinganywhere.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "user/getAll", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Object> getAll() {
        MessageResponse mess = new MessageResponse();
        List<User> userList = userService.getAllUser();
        mess.setData(userList);
        mess.setMessage("Đã lấy thông tin khách hàng thành công");
        return new ResponseEntity<>(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "user/insert", method = RequestMethod.POST)
    public ResponseEntity<User> insertUser(@RequestBody User user) {
        MessageResponse mess = new MessageResponse();
        mess.setData(userService.insert(user));
        mess.setMessage("Đã thêm khách hàng thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "user/update", method = RequestMethod.POST)
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        MessageResponse mess = new MessageResponse();
        if (user.getIdUser() != null) {
            mess.setData(userService.update(user));
            mess.setMessage("Đã thay đổi thông tin khách hàng thành công");
        }
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "user/delete", method = RequestMethod.GET)
    public ResponseEntity<?> deleteUser(@RequestParam Long idUser) {
        MessageResponse mess = new MessageResponse();
        mess.setData(userService.delete(idUser));
        mess.setMessage("Đã xóa ID: " + idUser + " khách hàng thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }
    @RequestMapping(value = "user/findByID", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> findById(@RequestParam Long idUser) {
        MessageResponse mess = new MessageResponse();
        User user = userService.findById(idUser);
        mess.setData(user);
        mess.setMessage("Đã tìm thấy ID: " + idUser + " của khách hàng thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "user/findByExample", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> findByExample(@RequestBody User user) {
        MessageResponse mess = new MessageResponse();
        mess.setData(userService.finByExample(user));
        return new ResponseEntity<>(mess, HttpStatus.OK);
    }
}
