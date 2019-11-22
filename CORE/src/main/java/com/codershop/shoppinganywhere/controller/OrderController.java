package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    @Autowired
    OrderService orderService;
}
