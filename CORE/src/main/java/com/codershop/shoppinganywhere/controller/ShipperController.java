package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.model.Shipper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shippers")
public class ShipperController extends GenericController<Shipper, Long> {

}
