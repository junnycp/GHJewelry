package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.exception.AuthenticationFailedException;
import com.codershop.shoppinganywhere.model.Administrator;
import com.codershop.shoppinganywhere.model.MessageResponse;
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
    public @ResponseBody ResponseEntity<Administrator> login(@RequestBody Administrator administrator) throws AuthenticationFailedException, NoSuchAlgorithmException {
        MessageResponse mess = new MessageResponse();
        administratorService.authentication(administrator.getUserName(),administrator.getPassword());
        System.out.println(administrator.getUserName());
        if (administrator != null) {
            mess.setCode("LOGIN");
            mess.setData(administrator);
            mess.setStatus("SUCCESS");
            mess.setMessage("Đăng nhập thành công");
        }
        return new ResponseEntity(mess, HttpStatus.OK);
    }
    @RequestMapping(value = "admin/getAllUser", method = RequestMethod.GET)
    public
    ResponseEntity<List<Administrator>> getCustomer(){
        MessageResponse mess = new MessageResponse();
        List<Administrator> administrators = administratorService.getAll();
        mess.setData(administrators);
        mess.setMessage("Lấy tất cả người dùng thàng công");
        return new ResponseEntity(mess, HttpStatus.FOUND);
    }


}
