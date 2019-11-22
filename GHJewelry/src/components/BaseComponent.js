import React, {Component} from "react";
import Constants from "../configs/Constants";
import {useTranslation} from 'react-i18next';

export function Trans(props) {
    const {t} = useTranslation(props.ns);

    if (props.params) {
        return t(props.name, props.params);
    } else {
        return t(props.name);
    }
}

export default class BaseComponent extends Component {
    menuCode = "";
    pageCurr = 1;
    pageSize = Constants.TABLE.SIZE_PER_PAGE;

    constructor(props, menuCode) {
        super(props);
        this.menuCode = menuCode;
        this.options = {
            sizePerPageList: Constants.TABLE.SIZE_PER_PAGE_LIST,
            sizePerPage: Constants.TABLE.SIZE_PER_PAGE,
            noDataText: this.trans('common.nodata'),
            onPageChange: this.onPageChange.bind(this)
        };
    }

    onPageChange(page, sizePerPage) {
        this.pageCurr = page;
        this.pageSize = sizePerPage;
    }

    trans(name, params) {
        let value;
        if (params) {
            value = this.props.t(name, params);
        } else {
            value = this.props.t(name);
        }
        return value;
    };

    genNoCol = (cell, row, enumObject, index) => {
        return <div>{(this.pageCurr - 1) * this.pageSize + index + 1}</div>;
    };

    onChangeTextField = (name, e) => {
        const filter = e.target.getAttribute("filter");
        if (filter)
            e.target.value = this.formatInput(e.target.value, filter);
        this.onChangeValue(this, name, e.target);
    };
    onChangeNumberField = (name, e) => {
        e.target.value = this.formatInput(e.target.value, "number");
        this.onChangeValue(this, name, e.target);
    };
    onChangeSelect = name => value => {
        this.onChangeValue(this, name, value);
    };

    async onChangeValue(context, name, value) {
        let realValue = "";
        if (value === undefined || value === null || value === "") {
            return;
        }
        if (typeof value.value === "undefined") {
            if (value === 'null') {
                realValue = "";
            } else {
                realValue = value;
            }
        } else {
            realValue = value.value;
        }

        await context.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: realValue
            },
            errors: {
                ...prevState.errors,
                [name]: ""
            }
        }));
        if (context.props.options) {
            context.props.options.dataNew = context.state.data;
        }
    }

    onChangeDate = async (name, value) => {
        if (value === undefined || value === "") {
            value = null;
        }
        await this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: ""
            }
        }));
        if (this.props.options) {
            this.props.options.dataNew = this.state.data;
        }
    }
}
