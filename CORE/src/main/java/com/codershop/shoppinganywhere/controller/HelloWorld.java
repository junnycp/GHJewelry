package com.codershop.shoppinganywhere.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {

    @ResponseBody
    @RequestMapping("/")
    public String index(){
        return "HelloWorld";
    }

}
