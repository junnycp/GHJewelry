package com.codershop.shoppinganywhere.controller;

import com.codershop.shoppinganywhere.model.Category;
import com.codershop.shoppinganywhere.model.MessageResponse;
import com.codershop.shoppinganywhere.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = "category/getAll", method = RequestMethod.GET)
    public ResponseEntity<List<Category>> getAll(){
        MessageResponse mess = new MessageResponse();
        List<Category> categoriesList = categoryService.getAllCategory();
        mess.setData(categoriesList);
        mess.setMessage("Đã lấy tất cả các danh mục sản phẩm");
        return new ResponseEntity(mess, HttpStatus.OK);
    }
    @RequestMapping(value = "category/{idCategory}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseEntity<?> getByCategory(@PathVariable String idCategory) {
        MessageResponse mess = new MessageResponse();
        mess.setData(categoryService.finByCategory(idCategory));
        mess.setMessage("Đã tìm thấy ID:  "+idCategory+" của danh mục");
        return new ResponseEntity<>(mess, HttpStatus.OK);
    }
    @RequestMapping(value = "category/insert", method = RequestMethod.POST)
    public ResponseEntity<Category> insertUser(@RequestBody Category category) {
        MessageResponse mess = new MessageResponse();
        mess.setData(categoryService.insert(category));
        mess.setMessage("Đã thêm thành công danh mục sản phẩm");
        return new ResponseEntity(mess, HttpStatus.OK);
    }
}
