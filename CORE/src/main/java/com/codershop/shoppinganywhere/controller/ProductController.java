package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.model.MessagesResponse;
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
        MessagesResponse mess = new MessagesResponse();
        List<Product> productsList = productService.getAllProduct();
        mess.setData(productsList);
        mess.setMessage("Đã lấy tất cả sản phẩm thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/{idCategory}", method = RequestMethod.GET)
    public ResponseEntity<?> getByCategory(@PathVariable String idCategory) {
        MessagesResponse mess = new MessagesResponse();
        mess.setData(productService.finByCategory(idCategory));
        return new ResponseEntity<>(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/insert", method = RequestMethod.POST)
    public ResponseEntity<Product> insertProduct(@RequestBody Product product) {
        MessagesResponse mess = new MessagesResponse();
        mess.setData(productService.insert(product));
        mess.setMessage("Đã thêm sản phẩm thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/update", method = RequestMethod.POST)
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        MessagesResponse mess = new MessagesResponse();
        if (product.getIdProduct() != null) {
            mess.setData(productService.update(product));
            mess.setMessage("Đã thay đổi thông tin sản phẩm thành công");
        }
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/delete", method = RequestMethod.GET)
    public ResponseEntity<?> deleteProduct(@RequestParam Long idProduct) {
        MessagesResponse mess = new MessagesResponse();
        mess.setData(productService.delete(idProduct));
        mess.setMessage("Đã xóa ID: " + idProduct + " sản phẩm thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }

    @RequestMapping(value = "product/findByID", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@RequestParam Long idProduct) {
        MessagesResponse mess = new MessagesResponse();
        Product user = productService.findById(idProduct);
        mess.setData(user);
        mess.setMessage("Đã tìm thấy ID: " + idProduct + " thành công");
        return new ResponseEntity(mess, HttpStatus.OK);
    }
}
