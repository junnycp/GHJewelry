import React from "react";
import {Modal, ModalHeader} from "reactstrap";
import {showConfirm} from "./MessageBox";
import {Trans} from "./BaseComponent";

const lodash = require('lodash');
export var showDialog = function (_content, _title) {
    this.setState({
        open: true,
        title: _title,
        content: _content
    });
};

export var hideDialog = function (_showConfirm = true) {
    let oldData = lodash.pickBy(this.state.content.props.options.data);
    let newData = lodash.pickBy(this.state.content.props.options.dataNew);
    if (_showConfirm && this.state.content.props.options.dataNew
        && !lodash.isEqual(oldData, newData)) {
        showConfirm(<Trans ns="common" name="common.message.confirmCancelDialog"/>, () => {
            this.setState({open: false});
        }, <Trans ns="common" name="common.confirm"/>);
    } else {
        this.setState({open: false});
    }
};

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        showDialog = showDialog.bind(this);
        hideDialog = hideDialog.bind(this);
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.open}
                    className="modal-primary"
                    size={"lg"}
                >
                    <ModalHeader toggle={hideDialog}>{this.state.title}</ModalHeader>
                    {this.state.content}
                </Modal>
            </div>
        );
    }
}

export default Dialog;
