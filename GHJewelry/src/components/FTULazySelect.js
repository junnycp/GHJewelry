import React from 'react';
import PropTypes from 'prop-types';
import {Select} from "antd";
import BaseComponent from "./BaseComponent";
import {withTranslation} from 'react-i18next';

const {Option} = Select;

const _ = require('lodash');

class FTULazySelect extends BaseComponent {
    constructor(props) {
        super(props);
        let {value, getPopupContainer, ...restProps} = props;
        let renderParams = props.renderParams ? props.renderParams : [];
        this.setParameters(renderParams);
        if (props.id) {
            restProps.getPopupContainer = () => document.getElementById(props.id);
        }
        this.restProps = restProps;
        this.listData = renderParams[0] ? renderParams[0] : [];
        this.state = {
            visibleData: [],
            searchValue: "",
            fullData: this.listData,
            scrollHeight: props.scrollHeight ? props.scrollHeight : 20,
            rowNumber: props.rowNumber ? props.rowNumber : 20
        };
    }

    setParameters = (list) => {
        this.renderParams = [
            list[1] ? list[1] : "code",
            list[2] ? list[2] : "name",
            list[3] ? list[3] : ["code", "name"],
            list[4] ? list[4] : ["Mã", "Tên"],
            list[5] ? list[5] : [4, 8],
            list[6] ? list[6] : true,
            list[7] ? list[7] : true,
        ];
    };

    handleScroll = async e => {
        e.persist();
        const {target} = e;
        if (this.state.visibleData.length !== this.listData.length && target.scrollTop + target.offsetHeight > target.scrollHeight - 100) {
            this.setState({scrollHeight: this.state.scrollHeight + this.state.rowNumber});
            await this.getDropdownList();
        }
    };

    fetchData = async value => {
        const fields = this.renderParams[2];
        this.listData = await _.filter(this.state.fullData, item => {
            for (let i = 0; i < fields.length; i++) {
                if (String(item[fields[i]]).toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    return true;
                }
            }
            return false;
        });
        await this.setState({scrollHeight: this.state.rowNumber});
        this.getDropdownList();
    };

    componentWillMount() {
        this.setState({
            visibleData: _.filter(this.state.fullData,
                (item) => item[this.renderParams[0]] == this.props.value)
        });
    }

    componentDidMount() {
        this.getDropdownList();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.renderParams[0] !== prevProps.renderParams[0]) {
            this.listData = this.props.renderParams[0] ? this.props.renderParams[0] : [];
            await this.setState({
                fullData: this.listData,
                visibleData: _.filter(this.listData, (item) => item[this.renderParams[0]] == this.props.value)
            });
        }
        if (prevProps.value !== this.props.value) {
            this.setState({
                visibleData: _.filter(this.state.fullData,
                    (item) => item[this.renderParams[0]] == this.props.value)
            });
        }
    }

    getDropdownList = async () => {
        let lst = this.listData;
        this.setState({
            visibleData: _.slice(lst, 0, this.state.scrollHeight)
        })
    };

    reloadDropdownList = async (isOpen) => {
        if (isOpen) {
            this.listData = this.state.fullData;
            await this.setState({
                visibleData: _.slice(this.state.fullData, 0, this.state.rowNumber),
                scrollHeight: 20
            });
        }
    };

    render() {
        const value = this.props.value ? this.props.value : "";
        return (
            <Select
                mode={"single"}
                style={{width: "100%"}}
                showSearch={true}
                {...this.restProps}
                value={value}
                onDropdownVisibleChange={this.reloadDropdownList}
                defaultActiveFirstOption={false}
                onSearch={this.fetchData}
                filterOption={() => true}
                onPopupScroll={this.handleScroll}
                disabled={this.props.disabled}
            >
                {renderSelectComponentMultiColumn(this.state.visibleData, this.renderParams[0], this.renderParams[1],
                    this.renderParams[2], this.renderParams[3], this.renderParams[4], this.renderParams[5], this.renderParams[6])}
            </Select>
        )
            ;
    }
}

export const renderSelectComponentMultiColumn = (data, id = "code", label = "name", lstField = ["code", "name"], lstHeader = ["Mã", "Tên"], lstCol = [4, 8], nullItem = true, header = true) => {
    let children = [];
    if (header) {
        children.push(
            <Option disabled key={"select"} label="-- Lựa chọn --">
                <div>
                    {lstHeader.map((item, index) => <div key={"header" + index}
                                                        
                                                         title={item}><b>{item}</b>
                    </div>)}
                </div>
            </Option>
        );
    }
    if (nullItem) {
        children.push(
            <Option key={null} label={" "}>
                <div>
                    {lstHeader.map((item, index) => <div key={"nullItem" + index}
                    >
                        <b>{""}</b>
                    </div>)}
                </div>
            </Option>
        );
    }
    if (data && data.length > 0) data.forEach(item => {
        children.push(
            <Option value={String(item[id])} key={String(item[id])}
                    label={String(item[label])}
                    ftuitem={item}>
                <div>
                    {lstField.map((itemField, index) =>
                        <div
                            key={"item" + item[id] + index}
                            title={item[itemField]}>{item[itemField]}
                        </div>)}
                </div>
            </Option>
        );
    });
    return children;
};

FTULazySelect.propTypes = {
    onChange: PropTypes.func,
    renderParams: PropTypes.array.isRequired
};

export default withTranslation(["common", "beacons"])(FTULazySelect);
