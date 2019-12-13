import React, {Component} from 'react';
import BaseComponent from "../../components/BaseComponent";
import OrderManagementService from "../../services/OrderManagementService";
import Input from "antd/es/input";
import Label from "../../components/Label";
import ModalBody from "reactstrap/es/ModalBody";
import DataTable from "../../components/DataTable";
import Button from "antd/es/button";
import ModalFooter from "reactstrap/es/ModalFooter";
import Constants from "../../configs/Constants";
import {withTranslation} from "react-i18next";
import Select from "antd/es/select";
import {showMessageBox} from "../../components/MessageBox";

const {Option} = Select;

class DetailForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new OrderManagementService();
  }

  componentWillMount() {
    this.setState({
      action: this.props.options.action,
      data: this.props.options.data,
      lstOrder: this.props.options.lstOrder,
      errors: {},
      disabledAll: this.props.options.action === Constants.ACTION.VIEW
    });
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.focusFirstElement("mainForm");
    }, 0);
  };

  focusFirstElement = (id) => {
    const form = document.getElementById(id);
    if (!form || !form.elements)
      return false;
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type !== 'hidden' && !elements[i].disabled) {
        elements[i].focus();
        break;
      }
    }
  };

  genOrderCols = () => {
    return [
      {title: this.trans("common.num"), key: 'stt', render: (text, record, index) => index + 1},
      {title: this.trans("orders:orderId"), dataIndex: 'idOrder', key: 'idOrder'},
      {title: this.trans("orders:userId"), dataIndex: 'idUser', key: 'idUser'},
      {title: this.trans("shipper:name"), dataIndex: 'idShipper', key: 'idShipper'},
      {title: this.trans("orders:createdDate"), dataIndex: 'createTime', key: 'createTime'},
      {title: this.trans("orders:totalMoney"), dataIndex: 'totalMoney', key: 'totalMoney'},
      {title: this.trans("orders:status"), dataIndex: 'status', key: 'status', render: this.genStatusCol},
    ];
  };

  validate() {
    let data = this.state.data;
    let errors = {};
    let formIsValid = true;
    this.setState({errors: errors});
    return formIsValid;
  }

  onSubmit = () => {
    if (this.validate()) {
      if (this.state.action === Constants.ACTION.UPDATE) {
        // this.service.update(this.state.data, () => {
        //   showMessageBox(this.trans("common.message.updateSuccess"));
        //   this.props.options.onComplete();
        // })
        console.log("data", this.state.data);
      }
      if (this.state.action === Constants.ACTION.INSERT) {
        // this.service.insert(this.state.data, () => {
        //   showMessageBox(this.trans("common.message.insertSuccess"));
        //   this.props.options.onComplete();
        // })
      }
    }
  };

  onCancel = () => {
    this.props.options.onCancel();
  };

  onChangeSelectProvinceCustom = name => async value => {
    if (value === undefined || value === null) {
      value = null
    }
    await this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      },
    }));
  };

  render() {
    return (
      <div>
        <ModalBody>
          <div className="modal-body">
            <form className="form-group" noValidate autoComplete="off" id={"mainForm"}>
              <div className="row">
                <div className="col-md-12">
                  <Input
                    className="material"
                    id="idShipper"
                    maxLength={30}
                    allowClear
                    disabled={this.state.disabledAll}
                    name="idShipper"
                    placeholder={this.trans("beacons:placeholder.province")}
                    onChange={this.onChangeTextField.bind(this, "idShipper")}
                    value={this.state.data.idShipper}
                  />
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            hidden={this.state.disabledAll}
            onClick={this.onSubmit}
          >
            {this.trans("common.save")}
          </Button>
          <Button color="secondary" onClick={this.onCancel}>
            {this.trans("common.close")}
          </Button>
        </ModalFooter>
      </div>
    );
  }
}

export default withTranslation(["common", "orders"])(DetailForm);
