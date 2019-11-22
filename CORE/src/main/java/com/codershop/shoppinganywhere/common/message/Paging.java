package com.codershop.shoppinganywhere.common.message;

/**
 * Author: PhucVM
 * Date: 21/10/2019
 */
public class Paging {

    private int index;

    private int size;

    public Paging() {
        super();
    }

    public Paging(int index, int size) {
        super();
        this.index = index;
        this.size = size;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
