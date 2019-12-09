package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.model.OrderDetail;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/OrderDetails")
public class DetailOrderController extends GenericController<OrderDetail, Long> {
}
