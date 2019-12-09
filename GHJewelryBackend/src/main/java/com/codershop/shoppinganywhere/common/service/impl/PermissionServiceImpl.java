package com.codershop.shoppinganywhere.common.service.impl;

import com.codershop.shoppinganywhere.common.dao.PermissionDao;
import com.codershop.shoppinganywhere.common.entity.Permission;
import com.codershop.shoppinganywhere.common.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service("PermissionServiceImpl")
@Transactional
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    @Qualifier("PermissionDaoImpl")
    PermissionDao permissionDao;

    public List<Permission> getListPermission(Map<String, String> params){
        return permissionDao.getListPermission(params);
    }
}
