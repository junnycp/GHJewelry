package com.codershop.shoppinganywhere.common.dao;

import com.codershop.shoppinganywhere.common.entity.Permission;

import java.util.List;
import java.util.Map;

public interface PermissionDao {
    List<Permission> getListPermission(Map map);
}
