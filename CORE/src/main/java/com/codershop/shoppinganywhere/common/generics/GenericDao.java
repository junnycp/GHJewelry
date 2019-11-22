package com.codershop.shoppinganywhere.common.generics;
/**
 * com.fis.fw.common.exceptions.AppException
 * TungHuynh
 * Created by sondt18@fpt.com.vn
 * Date 11/05/2019 9:47 AM
 */
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface GenericDao<T, ID extends Serializable>{
    CrudRepository<T, ID> getRepo();
    T findOne(ID id);
    T findBy(Long id);
    Iterable<T> findAll(Iterable<ID> ids);
    T save(T obj);
    void save(Iterable<T> lst) throws Exception;
    void delete(ID key);
    void delete(Iterable<T> lst);
    void deleteAll();
    boolean exists(ID key);
    List<T> getByCondition(Map map);
    boolean existsCode(String code);
    Iterable<T> findAll();
}
