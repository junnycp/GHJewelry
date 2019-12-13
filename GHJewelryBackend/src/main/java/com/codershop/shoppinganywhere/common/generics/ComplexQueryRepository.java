package com.codershop.shoppinganywhere.common.generics;

import com.codershop.shoppinganywhere.common.message.OrderBy;
import com.codershop.shoppinganywhere.common.message.Paging;

import java.util.List;

/**
 * Author: PhucVM
 * Date: 22/10/2019
 */
public interface ComplexQueryRepository<T> {

    List<T> findByExample(T example);

    Object query(T example, Paging pageInfo, List<OrderBy> lstOrder);
}
