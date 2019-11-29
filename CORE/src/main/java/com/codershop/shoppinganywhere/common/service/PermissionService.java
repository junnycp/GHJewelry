package com.codershop.shoppinganywhere.common.service;

import com.codershop.shoppinganywhere.common.entity.Permission;

import java.util.List;
import java.util.Map;

public interface PermissionService {
    List<Permission> getListPermission(Map<String, String> params);
}
