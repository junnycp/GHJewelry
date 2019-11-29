import React from 'react';
import {Select, Input, Button, Icon, DatePicker} from "antd";
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import DisplayBox from "../../components/DisplayBox";
import Label from "../../components/Label";
import DataTable from "../../components/DataTable";
import ProductManagementService from "../../services/ProductManagementService";
import {showConfirm, showMessageBox} from "../../components/MessageBox";
import ActionFormatter from "../../components/ActionFormatter";
import StatusFormatter from "../../components/StatusFormatter";
import {hideDialog, showDialog} from "../../components/Dialog";
import Constants from "../../configs/Constants";
import DetailForm from "./DetailForm";
import openNotification from "../../components/Notification";

const Option = Select.Option;

class ProductManagement extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new ProductManagementService();
    this.state = {
      lstProduct: [],
      lstCategory: [],
      data: {},
    }
  }

  componentWillMount = () => {
    this.onFetchProduct();
    this.onFetchCategory()
  };

  onFetchCategory = async () => {
    let result = await this.service.fetchCategory();
    if (result) {
      this.setState({
        lstCategory: result.data
      })
    }
  };

  getDetailForm(_action, _data) {
    return (
      <DetailForm
        options={{
          lstCategory: this.state.lstCategory,
          action: _action,
          data: _data,
          onComplete: () => {
            hideDialog(false);
            this.onFetchProduct();
          },
          onCancel: () => {
            hideDialog();
          }
        }}/>
    )
  }

  onOpenView = row => {
    showDialog(
      this.getDetailForm(Constants.ACTION.VIEW, row),
      this.trans("common.viewDetail")
    )
  };

  onOpenInsert = () => {
    showDialog(
      this.getDetailForm(Constants.ACTION.INSERT, {
        status: 1
      }),
      this.trans("common.addNew")
    )
  };

  onOpenUpdate = row => {
    showDialog(
      this.getDetailForm(Constants.ACTION.UPDATE, row),
      this.trans("common.update")
    )
  };

  onFetchProduct = async () => {
    let result = await this.service.fetchProduct();
    if (result) {
      this.setState({
        lstProduct: result.data
      })
    }
  };

  genActionCol = (cell, row) => {
    return (
      <ActionFormatter
        menuCode={this.menuCode}
        showView
        showDelete
        showEdit
        onClickView={() => this.onOpenView(row)}
        onClickDelete={() =>
          showConfirm(this.trans("common.message.confirmDelete"), () => {
            showMessageBox(this.trans("common.message.deleteSuccess"));
          })
        }
        onClickEdit={() => this.onOpenUpdate(row)}
      />
    );
  };

  genStatusCol = (cell, row) => {
    return <StatusFormatter value={row.status === 1 ? 'ACTIVE' : 'INACTIVE'}
                            label={row.status === 1 ? this.trans("common.available") : this.trans("common.outOfStock")}/>
  };

  genCols = () => {
    return [
      {title: 'STT', key: 'stt', render: (text, record, index) => index + 1},
      {title: this.trans("common.action"), key: 'action', render: this.genActionCol},
      {title: this.trans("product:code"), dataIndex: 'idProduct', key: 'idProduct'},
      {title: this.trans("category:name"), dataIndex: 'idCategory', key: 'idCategory', render: this.genCategoryName},
      {title: this.trans("product:name"), dataIndex: 'nameProduct', key: 'nameProduct'},
      {title: this.trans("product:size"), dataIndex: 'size', key: 'size'},
      {title: this.trans("product:price"), dataIndex: 'price', key: 'price'},
      {title: this.trans("product:status"), dataIndex: 'status', key: 'status', render: this.genStatusCol},
    ];
  };

  genCategoryName = (cell, row) => {
    for (let category of this.state.lstCategory) {
      if (cell === category.idCategory) {
        return category.nameCategory;
      }
    }
  };

  onSearch = () => {
    console.log(this.state.data);
    openNotification('success', this.trans("common.message.found"), this.trans("product:message.found", {result: this.state.lstProduct.length}));
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
      <div className="animated fadeIn">
        <DisplayBox title={<strong>{this.trans("common.search")}</strong>} expanded={true}>
          <div className="row">
            <div className="col-md-4">
              <Label>{this.trans("product:name")}:</Label>
              <Input id="name"
                     maxLength={20}
                     name="name"
                     allowClear
                     addonAfter={<i className="fa fa-cubes fa-fw"/>}
                     placeholder={this.trans("product:placeholder.name")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "name")}
              />
            </div>
            <div className="col-md-4">
              <Label>{this.trans("category:name")}:</Label>
              <Select id="category"
                      maxLength={30}
                      name="category"
                      allowClear
                      placeholder={this.trans("category:placeholder.selectName")}
                      onChange={this.onChangeSelectCustom("category")}
              >
                {this.state.lstCategory.map((category) => (
                  <Option key={category.idCategory}
                          value={category.idCategory}>{category.nameCategory}</Option>
                ))}
              </Select>
            </div>
            <div className="col-md-4">
              <Label>{this.trans("product:createdDate")}:</Label>
              <DatePicker
                id="createdDate"
                maxLength={20}
                name="createdDate"
                allowClear
                style={{width: '100%'}}
                placeholder={this.trans("product:placeholder.createdDate")}
                onChange={this.onChangeDate.bind(this, "createdDate")}
                format={'DD/MM/YYYY'}
              />
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("product:price")}:</Label>
              <Input id="price"
                     maxLength={20}
                     name="price"
                     allowClear
                     addonAfter={<i className="fa fa-dollar fa-fw"/>}
                     placeholder={this.trans("product:placeholder.price")}
                     onChange={this.onChangeTextFieldCustom.bind(this, 'price')}
              />
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("product:size")}:</Label>
              <Select id="size"
                      maxLength={20}
                      name="size"
                      allowClear
                      placeholder={this.trans("product:placeholder.size")}
                      onChange={this.onChangeTextFieldCustom.bind(this, 'size')}
              >
                <Option key={0} value={0}>S</Option>
                <Option key={1} value={1}>M</Option>
                <Option key={2} value={2}>L</Option>
                <Option key={3} value={3}>XL</Option>
              </Select>
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("product:status")}:</Label>
              <Select id="status"
                      maxLength={20}
                      name="status"
                      allowClear
                      placeholder={this.trans("product:placeholder.status")}
                      onChange={this.onChangeSelectCustom("status")}
              >
                <Option key={1} value={1}>{this.trans("common.available")}</Option>
                <Option key={0} value={0}>{this.trans("common.outOfStock")}</Option>
              </Select>
            </div>
            <div className="col-md-12" style={{textAlign: "right", marginTop: 10}}>
              <Button type="primary" onClick={this.onSearch}><i
                className="fa fa-search"/>&nbsp;{this.trans("common.search")}</Button>
            </div>
          </div>
        </DisplayBox>
        <DisplayBox title={<strong>{this.trans("product:title")}</strong>} expanded={true}>
          <DataTable options={{
            columns: this.genCols(),
            dataSource: this.state.lstProduct.length === 0 ? null : this.state.lstProduct,
            loading: this.state.lstProduct.length === 0
          }}
                     onInsert={this.onOpenInsert}/>
        </DisplayBox>
      </div>
    );
  }
}

export default withTranslation(["common", "product", "category"])(ProductManagement);
