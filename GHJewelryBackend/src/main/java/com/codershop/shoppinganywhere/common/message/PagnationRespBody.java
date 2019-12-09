package com.codershop.shoppinganywhere.common.message;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

/**
 * Author: PhucVM
 * Date: 21/10/2019
 */
@JsonInclude
public class PagnationRespBody<E> {

    private long numRec;

    private long totalPage;

    private List<E> content;

    public PagnationRespBody() {
        super();
    }

    public PagnationRespBody<E> withContent(List<E> content) {
        this.content = content;
        return this;
    }

    public PagnationRespBody<E> withNumRec(long numRec) {
        this.numRec = numRec;
        return this;
    }

    public PagnationRespBody<E> withTotalPage(long totalPage) {
        this.totalPage = totalPage;
        return this;
    }

    public long getNumRec() {
        return numRec;
    }

    public void setNumRec(long numRec) {
        this.numRec = numRec;
    }

    public long getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(long totalPage) {
        this.totalPage = totalPage;
    }

    public List<E> getContent() {
        return content;
    }

    public void setContent(List<E> content) {
        this.content = content;
    }
}
