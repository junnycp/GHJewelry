import React, {Component} from 'react';
import {Tree, Input} from "antd";
import i18n from "../i18n";

const {TreeNode} = Tree;
const Search = Input.Search;

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

class SearchTree extends Component {
    state = {
        expandedKeys: [],
        searchValue: "",
        autoExpandParent: true
    };

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    onChange = e => {
        const value = e.target.value;
        const expandedKeys = this.props.dataList
            .map(item => {
                if (item === undefined || item === null || item.title === undefined || item.title === null) {
                    return null;
                }
                if (item.title.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                    return getParentKey(item.key, this.props.data);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true
        });
    };

    render() {
        const {searchValue, expandedKeys, autoExpandParent} = this.state;
        const loop = data =>
            data.map(item => {
                if (item === undefined || item === null || item.title === undefined || item.title === null) {
                    return "";
                }
                const index = item.title.toUpperCase().indexOf(searchValue.toUpperCase());
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
              {beforeStr}
                            <span style={{color: "#f50"}}>{searchValue}</span>
                            {afterStr}
            </span>
                    ) : (
                        <span>{item.title}</span>
                    );
                if (item.children) {
                    return (
                        <TreeNode key={item.key} title={title}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} title={title}/>;
            });
        return (
            <div>
                <Search
                    style={{marginBottom: 8}}
                    placeholder={i18n.t("common.search")}
                    onChange={this.onChange}
                />
                <Tree
                    selectable={true}
                    onExpand={this.onExpand}
                    onSelect={this.props.onSelect}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    // defaultExpandAll={true}
                    // defaultExpandParent={true}
                >
                    {loop(this.props.data)}
                </Tree>
            </div>
        );
    }
}

export default SearchTree;


