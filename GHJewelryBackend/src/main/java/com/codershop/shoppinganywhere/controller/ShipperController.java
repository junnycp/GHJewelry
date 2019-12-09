package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.common.utils.ExceptionUtil;
import com.codershop.shoppinganywhere.model.Shipper;
import com.codershop.shoppinganywhere.service.ShipperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/shippers")
public class ShipperController extends GenericController<Shipper, Long> {
    @Autowired
    private ShipperService service;

    @Override
    @PreAuthorize("@appAuthorizer.authorize(authentication, 'CREATE', this)")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody @Valid Shipper shipper) {
        if (service.isDuplicate(shipper.getIdCard(), shipper.getIdShipper())) {
            throw ExceptionUtil.getDuplicateException();
        }
        return super.create(shipper);
    }

    @PreAuthorize("@appAuthorizer.authorize(authentication, 'UPDATE', this)")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @Override
    public ResponseEntity<Object> update(@RequestBody @Valid Shipper shipper) {
        if (service.isDuplicate(shipper.getIdCard(), shipper.getIdShipper())) {
            throw ExceptionUtil.getDuplicateException();
        }
        return super.update(shipper);
    }
}