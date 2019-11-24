package com.codershop.shoppinganywhere.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categories", catalog = "datawebbh")
@JsonPropertyOrder({"idCategory", "nameCategory", "idProduct"})
public class Category {
    @Id
    @Column(name = "id_category", unique = true, nullable = false)
    private String idCategory;
    @Column(name = "name")
    private String nameCategory;
    @Column(name = "id_product")
    private Long idProduct;

    public Category(String idCategory, String nameCategory,Long idProduct) {
        this.idCategory = idCategory;
        this.nameCategory = nameCategory;
        this.idProduct = idProduct;
    }

    public Category() {
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public String getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }

    public String getNameCategory() {
        return nameCategory;
    }

    public void setNameCategory(String nameCategory) {
        this.nameCategory = nameCategory;
    }
}
