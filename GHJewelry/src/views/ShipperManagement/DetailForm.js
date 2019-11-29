import React from 'react';
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import {ModalBody, ModalFooter} from "reactstrap";
import {Icon, Input, Modal, Select, Upload} from 'antd';
import Label from "../../components/Label";
import Button from "../../components/Button";
import Constants from "../../configs/Constants";
import {showMessageBox} from "../../components/MessageBox";
import ShipperManagementService from "../../services/ShipperManagementService";

const Option = Select.Option;
const TextArea = Input.TextArea;

class DetailForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new ShipperManagementService();
  }

  componentWillMount() {
    this.setState({
      action: this.props.options.action,
      data: this.props.options.data,
      errors: {},
      disabledAll: this.props.options.action === Constants.ACTION.VIEW
    });
  }

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

  componentDidMount() {
    setTimeout(() => {
      this.focusFirstElement("mainForm");
    }, 0);
  };

  onCancel = () => {
    this.props.options.onCancel();
  };

  validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  validatePhoneNum = (number) => {
    const numberRegex = /(03|01[2|6|8|9])+([0-9]{8})\b/;
    return numberRegex.test(number);
  };

  validate() {
    let data = this.state.data;
    let errors = {};
    let formIsValid = true;
    if (!data["name"]) {
      formIsValid = false;
      errors["name"] = this.trans("common.message.notEmpty", {
        field: this.trans("shipper:name")
      })
    }
    if (!data["idCard"]) {
      formIsValid = false;
      errors["idCard"] = this.trans("common.message.notEmpty", {
        field: this.trans("shipper:idCard")
      })
    }
    if (!data["email"]) {
      formIsValid = false;
      errors["email"] = this.trans("common.message.notEmpty", {
        field: this.trans("shipper:email")
      })
    }
    if (!data["phone"]) {
      formIsValid = false;
      errors["phone"] = this.trans("common.message.notEmpty", {
        field: this.trans("shipper:phone")
      })
    }
    if (data["email"] && !this.validateEmail(data["email"])) {
      formIsValid = false;
      errors["email"] = this.trans("common.message.invalidEmail", {
        field: this.trans("shipper:email")
      })
    }
    if (data["phone"] && !this.validatePhoneNum(data["phone"])) {
      formIsValid = false;
      errors["phone"] = this.trans("common.message.invalidPhone", {
        field: this.trans("shipper:phone")
      })
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  onSubmit = () => {
    if (this.validate()) {
      if (this.state.action === Constants.ACTION.UPDATE) {
        this.service.update(this.state.data, () => {
          showMessageBox(this.trans("common.message.updateSuccess"));
          this.props.options.onComplete();
        })
      }
      if (this.state.action === Constants.ACTION.INSERT) {
        console.log("data insert", this.state.data);
        this.service.insert(this.state.data, () => {
          showMessageBox(this.trans("common.message.insertSuccess"));
          this.props.options.onComplete();
        })
      }
    }
  };

  onChangeSelectCustom = name => value => {
    if (value === undefined) {
      value = null
    }
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }))
  };

  onChangeTextFieldCustom = (name, e) => {
    let value = e.target.value;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value === "" ? null : value
      }
    }))
  };
  render() {
    return (
      <div>
        <ModalBody>
          <div className="modal-body">
            <form className="form-group" noValidate autoComplete="off" id={"mainForm"}>
              <div className="row">
                <div className="col-md-6">
                  <Label>{this.trans("shipper:name")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input id="name"
                         disabled={this.state.disabledAll}
                         maxLength={500}
                         name="name"
                         allowClear
                         addonAfter={<i className="fa fa-user-circle-o fa-fw"
                                        style={this.state.errors["name"] ? {color: 'red'} : null}/>}
                         placeholder={this.trans("shipper:placeholder.name")}
                         onChange={this.onChangeTextField.bind(this, "name")}
                         defaultValue={this.state.data.name}
                  />
                  <span className="errorMessage">
                    {this.state.errors["name"]}
                  </span>
                </div>
                <div className="col-md-6">
                  <Label>{this.trans("shipper:idCard")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input id="idCard"
                         disabled={this.state.disabledAll}
                         maxLength={500}
                         name="idCard"
                         allowClear
                         addonAfter={<i className="fa fa-id-card-o fa-fw"
                                        style={this.state.errors["idCard"] ? {color: 'red'} : null}/>}
                         placeholder={this.trans("shipper:placeholder.idCard")}
                         onChange={this.onChangeTextField.bind(this, "idCard")}
                         defaultValue={this.state.data.idCard}
                  />
                  <span className="errorMessage">
                    {this.state.errors["idCard"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("shipper:email")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input id="email"
                         disabled={this.state.disabledAll}
                         maxLength={500}
                         name="email"
                         allowClear
                         addonAfter={<i className="fa fa-envelope fa-fw"
                                        style={this.state.errors["email"] ? {color: 'red'} : null}/>}
                         placeholder={this.trans("shipper:placeholder.email")}
                         onChange={this.onChangeTextField.bind(this, "email")}
                         defaultValue={this.state.data.email}
                  />
                  <span className="errorMessage">
                    {this.state.errors["email"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("shipper:phone")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input id="phone"
                         disabled={this.state.disabledAll}
                         maxLength={500}
                         name="phone"
                         allowClear
                         addonAfter={<i className="fa fa-phone fa-fw"
                                        style={this.state.errors["phone"] ? {color: 'red'} : null}/>}
                         placeholder={this.trans("shipper:placeholder.phone")}
                         onChange={this.onChangeTextField.bind(this, "phone")}
                         defaultValue={this.state.data.phone}
                  />
                  <span className="errorMessage">
                    {this.state.errors["phone"]}
                  </span>
                </div>
                <div className="col-md-12" style={{marginTop: 5}}>
                  <Label>{this.trans("shipper:address")}:</Label>
                  <TextArea id="address"
                            disabled={this.state.disabledAll}
                            maxLength={500}
                            name="address"
                            addonAfter={<i className="fa fa-map-pin fa-fw"
                                           style={this.state.errors["address"] ? {color: 'red'} : null}/>}
                            placeholder={this.trans("shipper:placeholder.address")}
                            allowClear
                            onChange={this.onChangeTextField.bind(this, "address")}
                            defaultValue={this.state.data.address}
                  />
                  <span className="errorMessage">
                    {this.state.errors["address"]}
                  </span>
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

export default withTranslation(["common", "product", "shipper"])(DetailForm);
