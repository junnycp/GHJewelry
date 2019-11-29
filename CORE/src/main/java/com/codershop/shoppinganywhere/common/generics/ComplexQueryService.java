package com.codershop.shoppinganywhere.common.generics;

import com.codershop.shoppinganywhere.common.service.JpaGenericService;

import java.io.Serializable;

public interface ComplexQueryService<E, P extends Serializable> extends JpaGenericService<E, P> {

}