import React from 'react';
import {Select, Input, Button, Card} from "antd";
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
import DetailForm from "../CategoryManagement/DetailForm";
import UsersManagementService from "../../services/UsersManagementService";
import openNotification from "../../components/Notification";

const Option = Select.Option;
const {Meta} = Card;

class UsersManagement extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new UsersManagementService();
    this.state = {
      lstCategory: [],
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
        lstCategory: result.data
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
      {title: this.trans("category:name"), dataIndex: 'name', key: 'name'},
    ];
  };

  onSearch = () => {
    console.log(this.state.data);
    openNotification('success', this.trans("common.message.found"), this.trans("category:message.found", {result: this.state.lstCategory.length}));
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
            <div className="col-md-8">
              <Label>{this.trans("category:name")}</Label>
              <Input id="name"
                     maxLength={20}
                     name="name"
                     allowClear
                     addonAfter={<i className="fa fa-list-alt fa-fw"/>}
                     placeholder={this.trans("category:placeholder.insertName")}
                     onChange={this.onChangeSelectCustom("name")}
              />
            </div>
            <div className="col-md-4">
              <Card hoverable
                    style={{width: 400}}
                    cover={<img alt="example"
                                src="https://shopbylook.cf/storage/27rmzlqRihgWr3tqVmduzYbysHKF0wT7jdQjZziV.jpeg"/>}>
                <Meta title="GH Jewelry" description="Cam kết hàng chính hãng chất lượng cao"/>
              </Card>
            </div>
            <div className="col-md-12" style={{textAlign: "right", marginTop: 10}}>
              <Button type="primary" onClick={this.onSearch}><i
                className="fa fa-search"/>&nbsp;{this.trans("common.search")}</Button>
            </div>
          </div>
        </DisplayBox>
        <DisplayBox title={<strong>{this.trans("category:title")}</strong>} expanded={true}>
          <DataTable options={{
            columns: this.genCols(),
            dataSource: this.state.lstCategory.length === 0 ? null : this.state.lstCategory,
            loading: this.state.lstCategory.length === 0
          }}
                     onInsert={this.onOpenInsert}/>
        </DisplayBox>
      </div>
    );
  }
}

export default withTranslation(["common", "category"])(UsersManagement);
