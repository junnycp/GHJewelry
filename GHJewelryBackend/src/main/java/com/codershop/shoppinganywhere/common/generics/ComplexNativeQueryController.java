package com.codershop.shoppinganywhere.common.generics;

import com.codershop.shoppinganywhere.common.message.OrderBy;
import com.codershop.shoppinganywhere.common.message.QueryRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

/**
 * Author: PhucVM
 * Date: 22/10/2019
 */
public interface ComplexNativeQueryController<T> {

    ResponseEntity<Object> getAll(@RequestBody List<OrderBy> orders);

    ResponseEntity<Object> findByExample(@RequestBody T example);

    ResponseEntity<Object> query(@RequestBody QueryRequest<T> queryRequest);

    ResponseEntity<Object> create(@Valid @RequestBody T example);

    ResponseEntity<Object> update(@Valid @RequestBody T example);

    ResponseEntity<Object> delete(@PathVariable String id);

    ResponseEntity<Object> findById(@PathVariable String id);
}
