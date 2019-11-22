import React, {Component} from "react";
import {Button} from "reactstrap";
import PropTypes from "prop-types";
import Constants from "../configs/Constants";

let propTypes = {
    children: PropTypes.node
};

class ButtonCustom extends Component {

    hasPermission() {
        let privilege = this.props.privilege;
        if (privilege === undefined) {
            return true;
        }
        let arr = privilege.split('.');
        if (arr.length < 2) {
            return true;
        }
        if (arr[1] === Constants.ACTION.SEARCH) {
            return true;
        }
        //Rxxx fix permission
        // let pc = LocalStorage.getItem(Constants.STORAGE_KEY.PERMISSION);
        // if (pc !== undefined && pc !== null) {
        //     let privileges = pc[arr[0]];
        //     if (privileges === undefined) {
        //         return false
        //     }
        //     let arrPrivilege = privileges.split(',');
        //     if (arrPrivilege.indexOf(arr[1]) >= 0) {
        return true;
        //     }
        // }
        // return false;
    };

    render() {
        return <Button hidden={!this.hasPermission()} {...this.props} >{this.props.children}</Button>;
    }
}

ButtonCustom.propTypes = propTypes;

export default ButtonCustom;
