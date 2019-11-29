import React from 'react';
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import {ModalBody, ModalFooter} from "reactstrap";
import {Input, Select} from 'antd';
import Label from "../../components/Label";
import Button from "../../components/Button";
import CategoryManagementService from "../../services/CategoryManagementService";
import Constants from "../../configs/Constants";
import {showMessageBox} from "../../components/MessageBox";

const Option = Select.Option;

class DetailForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new CategoryManagementService();
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
    if (!data["nameCategory"]) {
      formIsValid = false;
      errors["nameCategory"] = this.trans("common.message.notEmpty", {
        field: this.trans("category:name")
      });
    }
    if (!data["idCategory"]) {
      formIsValid = false;
      errors["idCategory"] = this.trans("common.message.notEmpty", {
        field: this.trans("category:categoryId")
      });
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
        console.log("data",this.state.data);
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
                <div className="col-md-6" style={{marginTop: 10}}>
                  <Label>{this.trans("category:categoryId")} <span style={{color: 'red'}}> *</span></Label>
                  <Input
                    id="idCategory"
                    maxLength={1000}
                    disabled={this.state.disabledAll}
                    name="idCategory"
                    allowClear
                    addonAfter={<i className="fa fa-list-alt fa-fw" style={this.state.errors["idCategory"] ? {color: 'red'} : null}/>}
                    placeholder={this.trans("category:placeholder.insertCategoryId")}
                    onChange={this.onChangeTextFieldCustom.bind(this, "idCategory")}
                    defaultValue={this.state.data.idCategory}
                  />
                  <span className="errorMessage">
                    {this.state.errors["idCategory"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 10}}>
                  <Label>{this.trans("category:name")} <span style={{color: 'red'}}> *</span></Label>
                  <Input
                    id="nameCategory"
                    maxLength={1000}
                    disabled={this.state.disabledAll}
                    name="nameCategory"
                    allowClear
                    addonAfter={<i className="fa fa-list-alt fa-fw" style={this.state.errors["nameCategory"] ? {color: 'red'} : null}/>}
                    placeholder={this.trans("category:placeholder.insertName")}
                    onChange={this.onChangeTextFieldCustom.bind(this, "nameCategory")}
                    defaultValue={this.state.data.nameCategory}
                  />
                  <span className="errorMessage">
                    {this.state.errors["nameCategory"]}
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

export default withTranslation(["common", "category"])(DetailForm);
