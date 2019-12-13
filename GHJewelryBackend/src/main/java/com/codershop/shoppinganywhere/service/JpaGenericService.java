package com.codershop.shoppinganywhere.service;

import com.codershop.shoppinganywhere.common.exceptions.AppException;
import com.codershop.shoppinganywhere.common.message.OrderBy;
import com.codershop.shoppinganywhere.common.message.Paging;
import com.codershop.shoppinganywhere.common.message.QueryRequest;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.List;

public interface JpaGenericService<E , P extends Serializable> {

    E save(E e);

    E findById(P key) throws AppException;

    void delete(P e);

    List<E> queryAllAndSort(List<OrderBy> orderBys);

    void saveByBatch(List<E> items);

    List<E> findByExample(E e);

    List<E> findLimit(int numberSkip, int limit);

    Page<E> findPage(int numberSkip, int limit);

    Object query(QueryRequest<E> request);

    Object queryByExamplePageAndSort(E e, Paging pageInfo, List<OrderBy> orderBys);
}