import React from "react";
import {Modal} from "reactstrap";
import {Spin, Icon} from 'antd';

export var showProgress = function () {
    this.setState({open: true});
};
export var hideProgress = function () {
    this.setState({open: false});
};

class ProgressCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        showProgress = showProgress.bind(this);
        hideProgress = hideProgress.bind(this);
    }

    onClose = () => {
    };

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.open}
                    toggle={this.onClose}
                    style={{width: '100px', top: '30%'}}
                >
                    <br/>
                    <center>
                        <Spin indicator={<Icon type="loading" style={{fontSize: 40}} spin/>}/>
                    </center>
                    <br/>
                </Modal>
            </div>
        );
    }
}

export default ProgressCustom;
