import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import Constants from "../configs/Constants";
import {Icon, Tooltip} from 'antd';
import {LocalStorage} from "../common/StorageUtil";

class ActionFormatter extends Component {
    static defaultProps = {
        showView: false,
        showEdit: false,
        showDelete: false,
        showCopy: false,
        showPlay: false,
        showStop: false
    };
    arrPrivilege = [];

    constructor(props) {
        super(props);
        this.loadPermission();
    }

    loadPermission() {
        let menuCode = this.props.menuCode;
        if (menuCode === undefined) {
            return;
        }
        let pc = LocalStorage.getItem(Constants.STORAGE_KEY.PERMISSION);
        if (pc !== undefined && pc !== null) {
            let privileges = pc[menuCode];
            if (privileges === undefined) {
                return false
            }
            this.arrPrivilege = privileges.split(',');
        }
    }

    hasPermission(action) {
        //Rxxx fix permission
        return true;
        // if (this.arrPrivilege === undefined || this.arrPrivilege.length <= 0) {
        //     return false;
        // }
        // if (this.arrPrivilege.indexOf(action) >= 0) {
        //     return true;
        // }
        // return false;
    };

    render() {
        const {t} = this.props;
        return (
            <div>
                <Tooltip title={t("common.tooltip.button-view")}>
                    <Icon style={{marginRight: 5}} type="file-text" theme="twoTone" twoToneColor="#0388E5"
                          className="iconGrid"
                          hidden={!this.props.showView}
                          onClick={this.props.onClickView}/>
                </Tooltip>
                <Tooltip title={t("common.tooltip.button-update")}>
                    <Icon style={{marginRight: 5}} type="edit" theme="twoTone" twoToneColor="#0388E5"
                          className="iconGrid"
                          hidden={!this.props.showEdit || !this.hasPermission(Constants.ACTION.UPDATE)}
                          onClick={this.props.onClickEdit}/>
                </Tooltip>
                <Tooltip title={t("common.tooltip.button-delete")}>
                    <Icon type="delete" theme="twoTone" twoToneColor="#ff0000"
                          className="iconGrid"
                          hidden={!this.props.showDelete || !this.hasPermission(Constants.ACTION.DELETE)}
                          onClick={this.props.onClickDelete}/>
                </Tooltip>
                <Icon type="play-circle" theme="twoTone" twoToneColor="#20c997"
                      className="iconGrid"
                      hidden={!this.props.showPlay || !this.hasPermission(Constants.ACTION.PLAY)}
                      onClick={this.props.onClickPlay}/>
            </div>
        );
    }
}

export default withTranslation()(ActionFormatter);
