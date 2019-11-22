package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.model.MessageResponse;
import com.codershop.shoppinganywhere.model.Product;
import com.codershop.shoppinganywhere.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    ProductService productService;

    @RequestMapping(value = "product/getAll", method = RequestMethod.GET)
    public ResponseEntity<List<Product>> getAll() {
        MessageResponse mess = new MessageResponse();
        List<Product> productsList = productService.getAllProduct();
        mess.setData(productsList);
        mess.setMessage("Đã lấy tất cả sản phẩm thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/{idCategory}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseEntity<?> getByCategory(@PathVariable String idCategory) {
        MessageResponse mess = new MessageResponse();
        mess.setData(productService.finByCategory(idCategory));
        return new ResponseEntity<>(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/insert", method = RequestMethod.POST)
    public ResponseEntity<Product> insertUser(@RequestBody Product product) {
        MessageResponse mess = new MessageResponse();
        mess.setData(productService.insert(product));
        mess.setMessage("Đã thêm sản phẩm thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/update", method = RequestMethod.POST)
    public ResponseEntity<Product> updateUser(@RequestBody Product product) {
        MessageResponse mess = new MessageResponse();
        if (product.getIdProduct() != null) {
            mess.setData(productService.update(product));
            mess.setMessage("Đã thay đổi thông tin sản phẩm thành công");
        }
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/delete", method = RequestMethod.GET)
    public ResponseEntity<?> deleteUser(@RequestParam Long idProduct) {
        MessageResponse mess = new MessageResponse();
        mess.setData(productService.delete(idProduct));
        mess.setMessage("Đã xóa ID: " + idProduct + " sản phẩm thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/findByID", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@RequestParam Long idProduct) {
        MessageResponse mess = new MessageResponse();
        Product user = productService.findById(idProduct);
        mess.setData(user);
        mess.setMessage("Đã tìm thấy ID: " + idProduct + " thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }
}
