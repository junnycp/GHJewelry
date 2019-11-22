import React, {Component} from "react";
import {Badge} from "reactstrap";
import Constants from "../configs/Constants";

export default class StatusFormatter extends Component {
    render() {
        if (this.props.value === undefined) {
            return;
        }
        switch (this.props.value) {
            case Constants.STATUS.ACTIVE:
                return <Badge color="success">{this.props.label}</Badge>;
            case Constants.STATUS.INACTIVE:
                return <Badge color="secondary">{this.props.label}</Badge>;
            case Constants.STATUS.ASSIGN:
                return <Badge color="warning">{this.props.label}</Badge>;
            case Constants.STATUS.UNAVAILABLE:
                return <Badge color="secondary">{this.props.label}</Badge>;
            case Constants.STATUS.PENDING:
                return <Badge color="warning">{this.props.label}</Badge>;
            case Constants.STATUS.WATTING:
                return <Badge color="success">{this.props.label}</Badge>;
            case Constants.STATUS.BUSY:
                return <Badge color="danger">{this.props.label}</Badge>;
            case Constants.STATUS.REPAIR:
                return <Badge color="info">{this.props.label}</Badge>;
            default:
                return <Badge color="primary">{this.props.label}</Badge>;
        }
    }
}
