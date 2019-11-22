import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import i18n from "../i18n";
import {withTranslation} from "react-i18next";

export var showMessageBox = function (
    _message,
    _title = i18n.t("common.message.title")
) {
    this.setState({
        open: true,
        color: "modal-primary",
        showConfirmBtn: false,
        title: _title,
        message: _message
    });
};

export var showErrorBox = function (
    _message,
    _title = i18n.t("common.message.title")
) {
    this.setState({
        open: true,
        color: "modal-danger",
        showConfirmBtn: false,
        title: _title,
        message: _message
    });
};

export var showWarningBox = function (
    _message,
    _title = i18n.t("common.message.title")
) {
    this.setState({
        open: true,
        color: "modal-warning",
        showConfirmBtn: false,
        title: _title,
        message: _message
    });
};

export var showConfirm = function (
    _message,
    _onConfirm,
    _title = i18n.t("common.confirm")
) {
    this.setState({
        open: true,
        color: "modal-primary",
        showConfirmBtn: true,
        title: _title,
        message: _message,
        onConfirm: _onConfirm
    });
};

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showConfirmBtn: false
        };
        showMessageBox = showMessageBox.bind(this);
        showErrorBox = showErrorBox.bind(this);
        showWarningBox = showWarningBox.bind(this);
        showConfirm = showConfirm.bind(this);
    }

    onClose = () => {
        this.setState({open: false});
    };

    onConfirm = () => {
        this.setState({open: !this.state.open});
        this.state.onConfirm();
    };

    render() {
        const {t} = this.props;
        return (
            <div>
                <Modal
                    isOpen={this.state.open}
                    toggle={this.onClose}
                    className={this.state.color}
                >
                    <ModalHeader toggle={this.onClose}>{this.state.title}</ModalHeader>
                    <ModalBody>{this.state.message}</ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.onConfirm}
                            hidden={!this.state.showConfirmBtn}
                        >
                            {t("common.confirm")}
                        </Button>
                        <Button color="secondary" onClick={this.onClose}>
                            {t("common.close")}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withTranslation()(MessageBox);
