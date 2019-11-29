package com.codershop.shoppinganywhere.common.dao.impl;

import com.codershop.shoppinganywhere.common.dao.PermissionDao;
import com.codershop.shoppinganywhere.common.entity.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("PermissionDaoImpl")
public class PermissionDaoImpl implements PermissionDao {
    @Autowired
    protected NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    @Override
    public List<Permission> getListPermission(Map map) {
        String sql = "select p.MENU_ID menuId, p.PRIVILEGE_ID privilegeId" +
                "   from AD_PERMISSION p" +
                "        join AD_MENU m on (m.MENU_ID = p.MENU_ID and m.STATUS='ACTIVE') " +
                "        join AD_PRIVILEGE pr on (pr.PRIVILEGE_ID = p.PRIVILEGE_ID and pr.STATUS='ACTIVE')" +
                "        join AD_USER_GROUP ug on (ug.GROUP_ID = p.GROUP_ID and ug.STATUS='ACTIVE')" +
                "   where ug.USER_ID = :userId " +
                "   and m.MENU_CODE = :menuCode and pr.CODE = :action ";
        return namedParameterJdbcTemplate.query(sql, map, new BeanPropertyRowMapper(Permission.class));
    }

}
