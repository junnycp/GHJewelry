package com.codershop.shoppinganywhere.model;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "products", catalog = "datawebbh")
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
    private Float price;
    @Column(name = "note")
    private String note;
    @Column(name = "image")
    private String image;

    public Product(Long idProduct, String idCategory, String nameProduct, String size, Float price, String note, String image) {
        this.idProduct = idProduct;
        this.idCategory = idCategory;
        this.nameProduct = nameProduct;
        this.size = size;
        this.price = price;
        this.note = note;
        this.image = image;
    }

    public Product() {
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

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
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
