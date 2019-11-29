import React from 'react';
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import {ModalBody, ModalFooter} from "reactstrap";
import {Icon, Input, Modal, Select, Upload} from 'antd';
import Label from "../../components/Label";
import Button from "../../components/Button";
import ProductManagementService from "../../services/ProductManagementService";
import Constants from "../../configs/Constants";
import {showMessageBox} from "../../components/MessageBox";

const Option = Select.Option;
const TextArea = Input.TextArea;

class DetailForm extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new ProductManagementService();
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'http://product.hstatic.net/1000213320/product/img_2936_copy_master.jpg',
        }
      ]
    }
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
    if (!data["nameProduct"]) {
      formIsValid = false;
      errors["nameProduct"] = this.trans("common.message.notEmpty", {
        field: this.trans("product:name")
      })
    }
    if (!data["idCategory"]) {
      formIsValid = false;
      errors["idCategory"] = this.trans("common.message.notEmpty", {
        field: this.trans("category:name")
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

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  handleCancel = () => {
    this.setState({previewVisible: false})
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj)
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({fileList}) => this.setState({fileList});

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    console.log("fileList", fileList);
    return (
      <div>
        <ModalBody>
          <div className="modal-body">
            <form className="form-group" noValidate autoComplete="off" id={"mainForm"}>
              <div className="row">
                <div className="col-md-6">
                  <Label>{this.trans("product:name")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input id="nameProduct"
                         disabled={this.state.disabledAll}
                         maxLength={500}
                         name="nameProduct"
                         allowClear
                         addonAfter={<i className="fa fa-cubes fa-fw"
                                        style={this.state.errors["nameProduct"] ? {color: 'red'} : null}/>}
                         placeholder={this.trans("product:placeholder.name")}
                         onChange={this.onChangeTextField.bind(this, "nameProduct")}
                         defaultValue={this.state.data.nameProduct}
                  />
                  <span className="errorMessage">
                    {this.state.errors["nameProduct"]}
                  </span>
                </div>
                <div className="col-md-6">
                  <Label>{this.trans("category:name")}: <span style={{color: 'red'}}> *</span></Label>
                  <Select id="idCategory"
                          disabled={this.state.disabledAll}
                          maxLength={500}
                          name="idCategory"
                          placeholder={this.trans("category:placeholder.selectName")}
                          onChange={this.onChangeSelect("idCategory")}
                          value={this.state.data.idCategory}
                  >
                    {this.props.options.lstCategory.map((category) => (
                      <Option key={category.idCategory}
                              value={category.idCategory}>{category.nameCategory}</Option>
                    ))}
                  </Select>
                  <span className="errorMessage">
                    {this.state.errors["idCategory"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("product:price")}: <span style={{color: 'red'}}> *</span></Label>
                  <Input id="price"
                         disabled={this.state.disabledAll}
                         maxLength={500}
                         name="price"
                         allowClear
                         addonAfter={<i className="fa fa-dollar fa-fw"
                                        style={this.state.errors["price"] ? {color: 'red'} : null}/>}
                         placeholder={this.trans("product:placeholder.insertPrice")}
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
                    <Option key={0} value={'S'}>S</Option>
                    <Option key={1} value={'M'}>M</Option>
                    <Option key={2} value={'L'}>L</Option>
                    <Option key={3} value={'XL'}>XL</Option>
                  </Select>
                  <span className="errorMessage">
                    {this.state.errors["size"]}
                  </span>
                </div>
                <div className="col-md-6" style={{marginTop: 5}}>
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
                <div className="col-md-6" style={{marginTop: 5}}>
                  <Label>{this.trans("product:picture")}: <span style={{color: 'red'}}> *</span></Label>
                  <div className="clearfix">
                    <Upload
                      action="https://www.mocky.io/v2/5185415ba171ea3a00704eed"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {fileList.length >= 2 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleChange}>
                      <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                  </div>
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

export default withTranslation(["common", "product", "category"])(DetailForm);
