package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.model.Order;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Orders")
public class OrderController extends GenericController<Order, Long>{
}
