package com.codershop.shoppinganywhere.common.generics.impl;

import com.codershop.shoppinganywhere.common.generics.GenericDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * com.fis.fw.common.exceptions.AppException
 * TungHuynh
 * Created by sondt18@fpt.com.vn
 * Date 11/05/2019 9:47 AM
 */
@SuppressWarnings("unchecked")
public class GenericDaoImpl<T, ID extends Serializable> implements GenericDao<T, ID> {
    @Autowired
    protected NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    protected JdbcTemplate jdbcTemplate;

    @Autowired
    protected DataSource dataSource;

    @Autowired
    protected CrudRepository<T, ID> repository;

    public CrudRepository<T, ID> getRepo() {
        return repository;
    }

    public T findOne(ID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public T findBy(Long id) {
        return repository.findById((ID) id).orElse(null);
    }

    public Iterable<T> findAll(Iterable<ID> ids) {
        return repository.findAllById(ids);
    }

    public T save(T obj) {
        return repository.save(obj);
    }

    public void save(Iterable<T> lst) throws Exception{
        repository.saveAll(lst);
    }

    public void delete(ID key) {
        repository.deleteById(key);
    }

    public void delete(Iterable<T> lst) {
        repository.deleteAll(lst);
    }

    public void deleteAll() {
        repository.deleteAll();
    }

    public boolean exists(ID key) {
        return repository.existsById(key);
    }

    public List<T> getByCondition(Map map) {
        return null;
    }

    public List<T> getByCondition(Map map, String sql, Class mappedClass) {
        return namedParameterJdbcTemplate.query(sql, map, new BeanPropertyRowMapper(mappedClass));
    }

    public boolean existsCode(String code) {
        return false;
    }

    @Override
    public Iterable<T> findAll() {
        return repository.findAll();
    }
}
