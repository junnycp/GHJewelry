package com.codershop.shoppinganywhere.common.service.impl;

import com.codershop.shoppinganywhere.common.contant.AppConstants;
import com.codershop.shoppinganywhere.common.exceptions.AppException;
import com.codershop.shoppinganywhere.common.message.OrderBy;
import com.codershop.shoppinganywhere.common.message.Paging;
import com.codershop.shoppinganywhere.common.message.QueryRequest;
import com.codershop.shoppinganywhere.common.service.JpaGenericService;
import com.codershop.shoppinganywhere.common.utils.SortUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

/**
 * Author: PhucVM
 * Date: 21/10/2019
 */
@Transactional
public class JpaGenericServiceImpl<E, P extends Serializable> implements JpaGenericService<E, P> {

    @Autowired
    JpaRepository<E, P> genericRepos;

    public JpaGenericServiceImpl() {
        super();
    }

    public JpaGenericServiceImpl(JpaRepository<E, P> repos) {
        this.genericRepos = repos;
    }

    public JpaRepository<E, P> getGenericRepos() {
        return genericRepos;
    }

    public void setGenericRepos(JpaRepository<E, P> genericRepos) {
        this.genericRepos = genericRepos;
    }

    @SuppressWarnings("unchecked")
    public <G> G getRepository(Class<G> repostioryType) {
        return (G) genericRepos;
    }

    @Override
    public E save(E e) {
        return genericRepos.save(e);
    }

    @Override
    public E findById(P key) throws AppException {
        return genericRepos.findById(key)
                .orElseThrow(() -> new AppException(AppConstants.NOT_FOUND, "Object Not Found"));
    }

    @Override
    public void delete(P e) {
        genericRepos.deleteById(e);
    }

    @Override
    public List<E> saveByBatch(List<E> items) {
        return genericRepos.saveAll(items);
    }

    @Override
    public List<E> findByExample(E e) {
        return genericRepos.findAll(Example.of(e));
    }

    @Override
    public List<E> findLimit(int numberSkip, int limit) {
        return genericRepos.findAll(PageRequest.of(numberSkip, limit)).getContent();
    }

    @Override
    public Page<E> findPage(int page, int size, List<OrderBy> orderBys) {
        if (orderBys == null || orderBys.isEmpty()) {
            return genericRepos.findAll(PageRequest.of(page, size));
        }
        return genericRepos.findAll(PageRequest.of(page, size, SortUtil.buildSort(orderBys)));
    }

    @Override
    public Object query(QueryRequest<E> request) {
        if (request == null) {
            throw new RuntimeException("Query Object must not be null");
        }
        if (request.getSample() == null) {
            return queryAllPageAndSort(request.getOrders(), request.getPageInfo());
        }
        return queryByExamplePageAndSort(request.getSample(), request.getPageInfo(), request.getOrders());
    }

    public Object queryAllPageAndSort(List<OrderBy> orderBys, Paging pageInfo) {
        if (pageInfo == null) {
            return queryAllAndSort(orderBys);
        }
        return genericRepos.findAll(PageRequest.of(pageInfo.getIndex(), pageInfo.getSize(), SortUtil.buildSort(orderBys)));
    }

    @Override
    public Object queryByExamplePageAndSort(E e, Paging pageInfo, List<OrderBy> orderBys) {
        if (pageInfo == null) {
            return genericRepos.findAll(Example.of(e), SortUtil.buildSort(orderBys));
        }
        return genericRepos.findAll(Example.of(e),
                PageRequest.of(pageInfo.getIndex(), pageInfo.getSize(), SortUtil.buildSort(orderBys)));
    }

    @Override
    public List<E> queryAllAndSort(List<OrderBy> orderBys) {
        if (orderBys == null || orderBys.isEmpty()) {
            return genericRepos.findAll();
        }
        return genericRepos.findAll(Sort.by(SortUtil.buildOrders(orderBys)));
    }

    @Override
    public boolean existsById(P key) {
        return genericRepos.existsById(key);
    }
}
