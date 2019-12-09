import React from 'react';
import {Select, Input, Button, Icon, DatePicker, notification} from "antd";
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import DisplayBox from "../../components/DisplayBox";
import Label from "../../components/Label";
import DataTable from "../../components/DataTable";
import ShipperManagementService from "../../services/ShipperManagementService";
import {showConfirm, showMessageBox} from "../../components/MessageBox";
import ActionFormatter from "../../components/ActionFormatter";
import StatusFormatter from "../../components/StatusFormatter";
import {hideDialog, showDialog} from "../../components/Dialog";
import Constants from "../../configs/Constants";
import DetailForm from "./DetailForm";
import openNotification from "../../components/Notification";

const Option = Select.Option;

class ShipperManagement extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new ShipperManagementService();
    this.state = {
      lstShipper: [],
      data: {}
    }
  }

  componentWillMount = () => {
    this.onFetchShipper();
  };

  getDetailForm(_action, _data) {
    return (
      <DetailForm
        options={{
          lstShipper: this.state.lstShipper,
          action: _action,
          data: _data,
          onComplete: () => {
            hideDialog(false);
            this.onFetchShipper();
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
      this.getDetailForm(Constants.ACTION.INSERT, {}),
      this.trans("common.addNew")
    )
  };

  onOpenUpdate = row => {
    showDialog(
      this.getDetailForm(Constants.ACTION.UPDATE, row),
      this.trans("common.update")
    )
  };

  onFetchShipper = async () => {
    let result = await this.service.fetchShipper([{direction: "asc", property: "name"}]);
    if (result) {
      this.setState({
        lstShipper: result.data
      })
    }
  };

  onSearch = async () => {
    console.log(this.state.data);
    let result = await this.service.search(this.state.data);
    if (result.data.length === 0) {
      showMessageBox("Không tìm thấy kết quả")
    }
    this.setState({
      lstShipper: result.data
    });
    if (result.data.length !== 0) {
      openNotification('success', this.trans("common.message.found"), this.trans("shipper:message.found", {result: this.state.lstShipper.length}));
    }
  };

  onDelete = async row => {
    await this.service.delete(row.idShipper);
    showMessageBox(this.trans("common.message.deleteSuccess"));
    this.onFetchShipper();
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
            this.onDelete(row);
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
      {title: this.trans("common.num"), key: 'stt', render: (text, record, index) => index + 1},
      {title: this.trans("common.action"), key: 'action', render: this.genActionCol},
      {title: this.trans("shipper:idShipper"), dataIndex: 'idShipper', key: 'idShipper'},
      {title: this.trans("shipper:name"), dataIndex: 'name', key: 'name'},
      {title: this.trans("shipper:idCard"), dataIndex: 'idCard', key: 'idCard'},
      {title: this.trans("shipper:email"), dataIndex: 'email', key: 'email'},
      {title: this.trans("shipper:phone"), dataIndex: 'phone', key: 'phone'},
      {title: this.trans("shipper:address"), dataIndex: 'address', key: 'address'},
    ];
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
              <Label>{this.trans("shipper:idShipper")}:</Label>
              <Input id="idShipper"
                     maxLength={20}
                     name="idShipper"
                     allowClear
                     addonAfter={<i className="fa fa-address-card-o fa-fw"/>}
                     placeholder={this.trans("shipper:placeholder.idShipper")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "idShipper")}
              />
            </div>
            <div className="col-md-4">
              <Label>{this.trans("shipper:name")}:</Label>
              <Input id="name"
                     maxLength={20}
                     name="name"
                     allowClear
                     addonAfter={<i className="fa fa-user-circle-o fa-fw"/>}
                     placeholder={this.trans("shipper:placeholder.name")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "name")}
              />
            </div>
            <div className="col-md-4">
              <Label>{this.trans("shipper:idCard")}:</Label>
              <Input id="idCard"
                     maxLength={20}
                     name="idCard"
                     allowClear
                     addonAfter={<i className="fa fa-id-card-o fa-fw"/>}
                     placeholder={this.trans("shipper:placeholder.idCard")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "idCard")}
              />
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("shipper:email")}:</Label>
              <Input id="email"
                     maxLength={50}
                     name="email"
                     allowClear
                     addonAfter={<i className="fa fa-envelope fa-fw"/>}
                     placeholder={this.trans("shipper:placeholder.email")}
                     onChange={this.onChangeTextFieldCustom.bind(this, 'email')}
              />
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("shipper:phone")}:</Label>
              <Input id="phone"
                     maxLength={15}
                     name="phone"
                     allowClear
                     addonAfter={<i className="fa fa-phone fa-fw"/>}
                     placeholder={this.trans("shipper:placeholder.phone")}
                     onChange={this.onChangeTextFieldCustom.bind(this, 'phone')}
              />
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("shipper:address")}:</Label>
              <Input id="address"
                     maxLength={100}
                     name="address"
                     allowClear
                     addonAfter={<i className="fa fa-map-pin fa-fw"/>}
                     placeholder={this.trans("shipper:placeholder.address")}
                     onChange={this.onChangeTextFieldCustom.bind(this, 'address')}
              />
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
            dataSource: this.state.lstShipper.length === 0 ? null : this.state.lstShipper,
          }}
                     onInsert={this.onOpenInsert}/>
        </DisplayBox>
      </div>
    );
  }
}

export default withTranslation(["common", "product", "shipper"])(ShipperManagement);
