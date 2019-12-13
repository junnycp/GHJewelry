package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.exception.AuthenticationFailedException;
import com.codershop.shoppinganywhere.model.Administrator;
import com.codershop.shoppinganywhere.model.MessagesResponse;
import com.codershop.shoppinganywhere.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@RestController
public class AdministratorsController {
    @Autowired
    AdministratorService administratorService;

    @RequestMapping(value = "admin/login", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<Administrator> login(@RequestBody Map map) throws AuthenticationFailedException, NoSuchAlgorithmException {
        MessagesResponse mess = new MessagesResponse();
        Administrator administrator = administratorService.authentication(map.get("userName").toString(), map.get("password").toString());
        if (administrator != null) {
            mess.setCode("LOGIN");
            mess.setData(administrator);
            mess.setStatus("SUCCESS");
            mess.setMessage("Đăng nhập thành công");
        } else {
            mess.setMessage("Đăng nhập thất bại");
        }
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "admin/getAllAdmin", method = RequestMethod.GET)
    public ResponseEntity<List<Administrator>> getAdmin() {
        MessagesResponse mess = new MessagesResponse();
        List<Administrator> administrators = administratorService.getAll();
        mess.setData(administrators);
        mess.setMessage("Lấy tất cả admin thàng công");
        return new ResponseEntity(mess, HttpStatus.FOUND);
    }

    @RequestMapping(value = "admin/updateAdmin", method = RequestMethod.POST)
    public ResponseEntity<Administrator> updateAdmin(@RequestBody Administrator administrator) throws NoSuchAlgorithmException,AuthenticationFailedException {
        MessagesResponse mess = new MessagesResponse();
        administrator = administratorService.updateAdmin(administrator.getUserName(),administrator.getPassword());
        if (administrator.getId_admin() != null) {
            mess.setCode("UPDATE");
            mess.setData(administrator);
            mess.setStatus("SUCCESS");
            mess.setMessage("Cập nhật tài khoản admin thành công");
        }else{
            mess.setMessage("Cập nhật tài khoản admin thất bại");
        }
        return new ResponseEntity(mess, HttpStatus.FOUND);
    }

}
