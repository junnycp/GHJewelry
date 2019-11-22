package com.codershop.shoppinganywhere.common.generics;


import com.codershop.shoppinganywhere.common.message.OrderBy;
import com.codershop.shoppinganywhere.common.message.QueryRequest;

import java.util.List;

/**
 * Author: PhucVM
 * Date: 22/10/2019
 */
public interface ComplexNativeQueryService<T> {

    Object query(QueryRequest<T> queryRequest);

    T create(T example);

    T update(T example);

    int delete(String id);

    List<T> getAll(List<OrderBy> orders);

    List<T> findByExample(T example);

    T findById(String id);
}
