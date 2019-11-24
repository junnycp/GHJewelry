import React from 'react';
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import {ModalBody, ModalFooter} from "reactstrap";
import {Form, Input, Select} from 'antd';
import Label from "../../components/Label";
import Button from "../../components/Button";
import Constants from "../../configs/Constants";
import {showMessageBox} from "../../components/MessageBox";
import UsersManagementService from "../../services/UsersManagementService";

const Option = Select.Option;

class DetailForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new UsersManagementService();
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
    if (!data["userName"]) {
      formIsValid = false;
      errors["userName"] = this.trans("common.message.notEmpty", {
        field: this.trans("users:username")
      })
    }
    if (!data["password"]) {
      formIsValid = false;
      errors["password"] = this.trans("common.message.notEmpty", {
        field: this.trans("users:password")
      })
    }
    if (!data["email"]) {
      formIsValid = false;
      errors["email"] = this.trans("common.message.notEmpty", {
        field: this.trans("users:email")
      })
    }
    if (data["email"] && !this.validateEmail(data["email"])) {
      formIsValid = false;
      errors["email"] = this.trans("common.message.invalidEmail", {
        field: this.trans("users:email")
      })
    }
    if (data["phone"] && !this.validatePhoneNum(data["phone"])) {
      formIsValid = false;
      errors["phone"] = this.trans("common.message.invalidPhone", {
        field: this.trans("users:phone")
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
        });
      }
      if (this.state.action === Constants.ACTION.INSERT) {
        this.service.insert(this.state.data, () => {
          showMessageBox(this.trans("common.message.insertSuccess"));
          this.props.options.onComplete();
        });
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
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("users:username")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input
                    id="userName"
                    maxLength={1000}
                    disabled={this.state.disabledAll}
                    name="userName"
                    allowClear
                    addonAfter={<i className="fa fa-vcard fa-fw"
                                   style={this.state.errors["userName"] ? {color: 'red'} : null}/>}
                    placeholder={this.trans("users:placeholder.username")}
                    onChange={this.onChangeTextFieldCustom.bind(this, "userName")}
                    defaultValue={this.state.data.userName}
                  />
                  <span className="errorMessage">
                    {this.state.errors["userName"]}
                  </span>
                </div>

                <div className="col-md-6">
                  <Label>{this.trans("users:password")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input.Password
                    id="password"
                    maxLength={1000}
                    disabled={this.state.disabledAll}
                    name="password"
                    allowClear
                    addonAfter={<i className="fa fa-lock fa-fw"
                                   style={this.state.errors["password"] ? {color: 'red'} : null}/>}
                    placeholder={this.trans("users:placeholder.password")}
                    onChange={this.onChangeTextFieldCustom.bind(this, "password")}
                    defaultValue={this.state.data.password}
                  />
                  <span className="errorMessage">
                    {this.state.errors["password"]}
                  </span>
                </div>
                <div className="col-md-6">
                  <Label>{this.trans("users:email")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input
                    id="email"
                    maxLength={1000}
                    disabled={this.state.disabledAll}
                    name="email"
                    allowClear
                    validateStatus="error"
                    addonAfter={<i className="fa fa-envelope fa-fw"
                                   style={this.state.errors["email"] ? {color: 'red'} : null}/>}
                    placeholder={this.trans("users:placeholder.email")}
                    onChange={this.onChangeTextFieldCustom.bind(this, "email")}
                    defaultValue={this.state.data.email}
                  />
                  <span className="errorMessage">
                    {this.state.errors["email"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("users:phone")}:</Label>
                  <Input
                    id="phone"
                    maxLength={1000}
                    disabled={this.state.disabledAll}
                    name="phone"
                    allowClear
                    addonAfter={<i className="fa fa-phone-square fa-fw"/>}
                    placeholder={this.trans("users:placeholder.phone")}
                    onChange={this.onChangeTextFieldCustom.bind(this, "phone")}
                    defaultValue={this.state.data.phone}
                  />
                  <span className="errorMessage">
                    {this.state.errors["phone"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("users:address")}:</Label>
                  <Input
                    id="address"
                    maxLength={1000}
                    disabled={this.state.disabledAll}
                    name="address"
                    allowClear
                    addonAfter={<i className="fa fa-map-marker fa-fw"/>}
                    placeholder={this.trans("users:placeholder.address")}
                    onChange={this.onChangeTextFieldCustom.bind(this, "address")}
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
            disabled={this.state.disabled}
            onDoubleClick={() => showMessageBox("Đang thực hiện. Vui lòng đợi", "Thông báo")}
          ><i className="fa fa-plus-circle"/>&nbsp;
            {this.trans("common.save")}
          </Button>
          <Button color="secondary" onClick={this.onCancel}>
            <i className="fa fa-window-close"/>&nbsp;
            {this.trans("common.close")}
          </Button>
        </ModalFooter>
      </div>
    );
  }
}

export default withTranslation(["common", "users"])(DetailForm);
