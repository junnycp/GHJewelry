import React from 'react';
import {Select, Input, Button} from "antd";
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import DisplayBox from "../../components/DisplayBox";
import Label from "../../components/Label";
import DataTable from "../../components/DataTable";
import {showConfirm, showMessageBox} from "../../components/MessageBox";
import ActionFormatter from "../../components/ActionFormatter";
import StatusFormatter from "../../components/StatusFormatter";
import {hideDialog, showDialog} from "../../components/Dialog";
import Constants from "../../configs/Constants";
import DetailForm from "../UsersManagement/DetailForm";
import UsersManagementService from "../../services/UsersManagementService";
import openNotification from "../../components/Notification";

const Option = Select.Option;

class UsersManagement extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new UsersManagementService();
    this.state = {
      lstUser: [],
      data: {}
    }
  }

  componentWillMount = () => {
    this.onFetchUsers();
  };

  getDetailForm(_action, _data) {
    return (
      <DetailForm
        options={{
          action: _action,
          data: _data,
          onComplete: () => {
            hideDialog(false);
            this.onFetchUsers();
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

  onFetchUsers = async () => {
    let result = await this.service.fetchUsers();
    if (result) {
      this.setState({
        lstUser: result.data
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
                            label={row.status === 1 ? this.trans("common.active") : this.trans("common.inactive")}/>
  };

  genCols = () => {
    return [
      {title: this.trans("common.num"), key: 'stt', render: (text, record, index) => index + 1},
      {title: this.trans("common.action"), key: 'action', render: this.genActionCol},
      {title: this.trans("users:userId"), dataIndex: 'userId', key: 'userId'},
      {title: this.trans("users:username"), dataIndex: 'username', key: 'username'},
      {title: this.trans("users:password"), dataIndex: 'password', key: 'password'},
      {title: this.trans("users:status"), dataIndex: 'status', key: 'status', render: this.genStatusCol},
    ];
  };

  onSearch = () => {
    console.log(this.state.data);
    openNotification('success', this.trans("common.message.found"), this.trans("users:message.found", {result: this.state.lstUser.length}));
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
              <Label>{this.trans("users:username")}:</Label>
              <Input id="name"
                     maxLength={20}
                     name="name"
                     allowClear
                     addonAfter={<i className="fa fa-vcard fa-fw"/>}
                     placeholder={this.trans("users:placeholder.username")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "username")}
              />
            </div>
            <div className="col-md-4">
              <Label>{this.trans("users:email")}:</Label>
              <Input id="email"
                     maxLength={20}
                     name="email"
                     allowClear
                     addonAfter={<i className="fa fa-envelope fa-fw"/>}
                     placeholder={this.trans("users:placeholder.email")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "email")}
              />
            </div>
            <div className="col-md-4">
              <Label>{this.trans("users:status")}:</Label>
              <Select id="status"
                      maxLength={20}
                      name="status"
                      allowClear
                      placeholder={this.trans("users:status")}
                      onChange={this.onChangeSelectCustom("status")}
              >
                <Option key={1} value={1}>{this.trans("common.active")}</Option>
                <Option key={0} value={0}>{this.trans("common.inactive")}</Option>
              </Select>
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("users:phone")}:</Label>
              <Input id="phone"
                     maxLength={20}
                     name="phone"
                     allowClear
                     addonAfter={<i className="fa fa-phone-square fa-fw"/>}
                     placeholder={this.trans("users:placeholder.phone")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "phone")}
              />
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("users:address")}:</Label>
              <Input id="address"
                     maxLength={20}
                     name="address"
                     allowClear
                     addonAfter={<i className="fa fa-map-marker fa-fw"/>}
                     placeholder={this.trans("users:placeholder.address")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "address")}
              />
            </div>
            <div className="col-md-12" style={{textAlign: "right", marginTop: 10}}>
              <Button type="primary" onClick={this.onSearch}><i className="fa fa-search"/>&nbsp;{this.trans("common.search")}</Button>
            </div>
          </div>
        </DisplayBox>
        <DisplayBox title={<strong>{this.trans("users:title")}</strong>} expanded={true}>
          <DataTable options={{
            columns: this.genCols(),
            dataSource: this.state.lstUser.length === 0 ? null : this.state.lstUser,
            loading: this.state.lstUser.length === 0
          }}
                     onInsert={this.onOpenInsert}/>
        </DisplayBox>
      </div>
    );
  }
}

export default withTranslation(["common", "users"])(UsersManagement);
