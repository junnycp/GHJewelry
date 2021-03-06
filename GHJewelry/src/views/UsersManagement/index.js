import React from 'react';
import {Select, Input, Button, DatePicker} from "antd";
import BaseComponent from "../../components/BaseComponent";
import {withTranslation} from "react-i18next";
import DisplayBox from "../../components/DisplayBox";
import Label from "../../components/Label";
import DataTable from "../../components/DataTable";
import {showConfirm, showMessageBox} from "../../components/MessageBox";
import ActionFormatter from "../../components/ActionFormatter";
import {hideDialog, showDialog} from "../../components/Dialog";
import Constants from "../../configs/Constants";
import DetailForm from "../UsersManagement/DetailForm";
import UsersManagementService from "../../services/UsersManagementService";
import openNotification from "../../components/Notification";
import moment from "moment";

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

  onFetchUsers = async () => {
    let result = await this.service.fetchUsers([{
      direction: 'asc',
      property: 'userName'
    }]);
    if (result) {
      this.setState({
        lstUser: result.data
      })
    }
  };

  onDelete = async row => {
    await this.service.delete(row.idUser);
    showMessageBox(this.trans("common.message.deleteSuccess"));
    this.onFetchUsers();
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
            this.onDelete(row)
          })
        }
        onClickEdit={() => this.onOpenUpdate(row)}
      />
    );
  };

  // genStatusCol = (cell, row) => {
  //   return <StatusFormatter value={row.status === 1 ? 'ACTIVE' : 'INACTIVE'}
  //                           label={row.status === 1 ? this.trans("common.active") : this.trans("common.inactive")}/>
  // };

  genCols = () => {
    return [
      {title: this.trans("common.num"), key: 'stt', render: (text, record, index) => index + 1},
      {title: this.trans("common.action"), key: 'action', render: this.genActionCol},
      {title: this.trans("users:username"), dataIndex: 'userName', key: 'userName'},
      {title: this.trans("users:password"), dataIndex: 'password', key: 'password'},
      {title: this.trans("users:email"), dataIndex: 'email', key: 'email'},
      {title: this.trans("users:phone"), dataIndex: 'phone', key: 'phone'},
      {title: this.trans("users:address"), dataIndex: 'address', key: 'address'},
      {title: this.trans("common.createdDate"), dataIndex: 'createTime', key: 'createTime', render: this.formatDate},
    ];
  };

  onSearch = async () => {
    // let data = this.state.data;
    // await data.createTime ? data.createTime = moment(this.state.data.createTime).format("DD-MM-YYYY") : data.createTime = null;
    console.log("data search",this.state.data);
    let result = await this.service.search(this.state.data);
    if (result.data.length === 0 || !result.data) {
      showMessageBox("Không tìm thấy kết quả!")
    }else {
      this.setState({
        lstUser: result.data
      });
      openNotification('success', this.trans("common.message.found"), this.trans("users:message.found", {result: this.state.lstUser.length}));
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

  formatDate = (cell, row) => {
    for (let data of this.state.lstUser) {
      if (cell === data.createTime) {
        return moment(data.createTime).format("DD/MM/YYYY")
      }
    }
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
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("common.createdDate")}</Label>
              <DatePicker
                id="createTime"
                style={{width: '100%'}}
                name="createTime"
                placeholder={this.trans("common.createdDate")}
                onChange={this.onChangeDate.bind(this, "createTime")}
                format={'DD/MM/YYYY'}/>
            </div>
            <div className="col-md-12" style={{textAlign: "right", marginTop: 10}}>
              <Button type="primary" onClick={this.onSearch}><i
                className="fa fa-search"/>&nbsp;{this.trans("common.search")}</Button>
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
