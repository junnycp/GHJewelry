import React from 'react';
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import {ModalBody, ModalFooter} from "reactstrap";
import {Icon, Input, Select} from 'antd';
import Label from "../../components/Label";
import Button from "../../components/Button";
import ProductManagementService from "../../services/ProductManagementService";
import Constants from "../../configs/Constants";

const Option = Select.Option;
const TextArea = Input.TextArea;

class DetailForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new ProductManagementService();
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

  validate() {
    let data = this.state.data;
    let errors = {};
    let formIsValid = true;
    if (!data["name"]) {
      formIsValid = false;
      errors["name"] = this.trans("common.message.notEmpty", {
        field: this.trans("product:name")
      })
    }
    if (!data["price"]) {
      formIsValid = false;
      errors["price"] = this.trans("common.message.notEmpty", {
        field: this.trans("product:price")
      })
    }
    if (!data["size"]) {
      formIsValid = false;
      errors["size"] = this.trans("common.message.notEmpty", {
        field: this.trans("product:size")
      })
    }
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
      }
      if (this.state.action === Constants.ACTION.INSERT) {
        console.log("data insert", this.state.data);
        // this.service.insert(this.state.data, () => {
        //   showMessageBox(this.trans("common.message.updateSuccess"));
        //   this.props.options.onComplete();
        // })
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
                  <Label>{this.trans("product:name")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input id="name"
                         disabled={this.state.disabledAll}
                         maxLength={500}
                         name="name"
                         allowClear
                         addonAfter={<i className="fa fa-cubes fa-fw" style={this.state.errors["name"] ? {color: 'red'} : null}/>}
                         placeholder={this.trans("product:placeholder.name")}
                         onChange={this.onChangeTextField.bind(this, "name")}
                         defaultValue={this.state.data.name}
                  />
                  <span className="errorMessage">
                    {this.state.errors["name"]}
                  </span>
                </div>
                <div className="col-md-6">
                  <Label>{this.trans("product:status")}: <span style={{color: 'red'}}> *</span></Label>
                  <Select id="status"
                          disabled={this.state.disabledAll || this.state.action === Constants.ACTION.INSERT}
                          maxLength={500}
                          name="status"
                          placeholder={this.trans("product:placeholder.status")}
                          onChange={this.onChangeSelect("status")}
                          defaultValue={this.state.data.status}
                  >
                    <Option key={1} value={1}>{this.trans("common.active")}</Option>
                    <Option key={0} value={0}>{this.trans("common.inactive")}</Option>
                  </Select>
                  <span className="errorMessage">
                    {this.state.errors["status"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("product:price")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input id="price"
                         disabled={this.state.disabledAll}
                         maxLength={500}
                         name="price"
                         allowClear
                         addonAfter={<i className="fa fa-dollar fa-fw" style={this.state.errors["price"] ? {color: 'red'} : null}/>}
                         placeholder={this.trans("product:placeholder.price")}
                         onChange={this.onChangeTextField.bind(this, "price")}
                         defaultValue={this.state.data.price}
                  />
                  <span className="errorMessage">
                    {this.state.errors["price"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("product:size")}: <span style={{color: 'red'}}> *</span></Label>
                  <Select id="size"
                          disabled={this.state.disabledAll}
                          maxLength={500}
                          name="size"
                          placeholder={this.trans("product:placeholder.size")}
                          onChange={this.onChangeSelect("size")}
                          defaultValue={this.state.data.size}
                  >
                    <Option key={1} value={1}>{this.trans("common.active")}</Option>
                    <Option key={0} value={0}>{this.trans("common.inactive")}</Option>
                  </Select>
                  <span className="errorMessage">
                    {this.state.errors["size"]}
                  </span>
                </div>
                <div className="col-md-12" style={{marginTop: 5}}>
                  <Label>{this.trans("product:note")}: <span style={{color: 'red'}}> *</span></Label>
                  <TextArea id="note"
                            disabled={this.state.disabledAll}
                            maxLength={500}
                            name="note"
                            placeholder={this.trans("product:placeholder.note")}
                            allowClear
                            onChange={this.onChangeTextField.bind(this, "note")}
                            defaultValue={this.state.data.note}
                  />
                  <span className="errorMessage">
                    {this.state.errors["note"]}
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

export default withTranslation(["common", "product"])(DetailForm);
