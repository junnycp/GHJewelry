package com.codershop.shoppinganywhere.common.generics.impl;

import com.codershop.shoppinganywhere.common.generics.ComplexQueryRepository;
import com.codershop.shoppinganywhere.common.generics.ComplexQueryService;
import com.codershop.shoppinganywhere.common.message.OrderBy;
import com.codershop.shoppinganywhere.common.message.Paging;
import com.codershop.shoppinganywhere.common.service.impl.JpaGenericServiceImpl;

import java.io.Serializable;
import java.util.List;

@SuppressWarnings({"unchecked"})
public abstract class ComplexQueryServiceImpl<E, P extends Serializable> extends JpaGenericServiceImpl<E, P> implements ComplexQueryService<E, P> {

    @Override
    public List<E> findByExample(E e) {
        return ((ComplexQueryRepository<E>) getGenericRepos()).findByExample(e);
    }

    @Override
    public Object queryByExamplePageAndSort(E e, Paging pageInfo, List<OrderBy> orderBys) {
        return ((ComplexQueryRepository<E>) getGenericRepos()).query(e, pageInfo, orderBys);
    }
}
