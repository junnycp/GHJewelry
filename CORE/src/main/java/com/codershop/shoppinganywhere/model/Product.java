package com.codershop.shoppinganywhere.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "products", catalog = "datawebbh")
@JsonPropertyOrder({"idProduct", "idCategory", "nameProduct", "size", "price", "note", "image"})
public class Product {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id_product", unique = true, nullable = false)
    private Long idProduct;
    @Column(name = "id_category")
    private String idCategory;
    @Column(name = "name")
    private String nameProduct;
    @Column(name = "size")
    private String size;
    @Column(name = "price")
    private String price;
    @Column(name = "note")
    private String note;
    @Column(name = "image")
    private String image;

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

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
