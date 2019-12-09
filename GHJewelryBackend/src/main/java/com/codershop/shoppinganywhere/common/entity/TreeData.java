package com.codershop.shoppinganywhere.common.entity;

import com.codershop.shoppinganywhere.common.utils.ValidationUtil;

import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.List;

/**
 * Author: PhucVM
 * Date: 22/10/2019
 */
@MappedSuperclass
public abstract class TreeData {

    @Transient
    protected Long level;

    @Transient
    private boolean hasChild;

    @Transient
    private List<TreeData> children;

    public abstract Long getLevel();

    public abstract Long getNodeId();

    public abstract Long getParentNodeId();

    public abstract boolean isRoot();

    public boolean isHasChild() {
        if (!ValidationUtil.isNullOrEmpty(children)) {

            return true;
        }
        return hasChild;
    }

    public void setHasChild(boolean hasChild) {
        this.hasChild = hasChild;
    }

    public List<TreeData> getChildren() {
//		if (isHasChild()){
//			children = new ArrayList<TreeData>();
//		}
        return children;
    }

    public void addChild(TreeData child) {
        if (children == null) {
            children = new ArrayList<TreeData>();
        }
        children.add(child);
    }

    public void setLevel(Long level) {
        this.level = level;
    }
}
