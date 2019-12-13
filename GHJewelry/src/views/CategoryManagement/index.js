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
import CategoryManagementService from "../../services/CategoryManagementService";
import openNotification from "../../components/Notification";

const Option = Select.Option;
const {Meta} = Card;

class UsersManagement extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new CategoryManagementService();
    this.state = {
      lstCategory: [],
      data: {}
    }
  }

  componentWillMount = () => {
    this.onFetchCategory();
  };

  getDetailForm(_action, _data) {
    return (
      <DetailForm
        options={{
          action: _action,
          data: _data,
          onComplete: () => {
            hideDialog(false);
            this.onFetchCategory();
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

  onFetchCategory = async () => {
    let result = await this.service.fetchCategory([{
      direction: 'asc',
      property: 'nameCategory'
    }]);
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
          showConfirm(this.trans("common.message.confirmDelete"),  () => {
            this.onDelete(row);
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
      {title: this.trans("category:name"), dataIndex: 'nameCategory', key: 'nameCategory'},
    ];
  };

  onSearch = async () => {
    let result = await this.service.search(this.state.data);
    if (result.data.length === 0) {
      showMessageBox("Không tìm thấy kết quả!")
    } else {
      this.setState({
        lstCategory: result.data
      });
      openNotification('success', this.trans("common.message.found"), this.trans("category:message.found", {result: this.state.lstCategory.length}));
    }
  };

  onDelete = async row => {
    console.log("row", row);
    await this.service.delete(row.idCategory);
    showMessageBox(this.trans("common.message.deleteSuccess"));
    this.onFetchCategory();

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
        <DisplayBox title={<strong>{this.trans("common.search")}</strong>} expanded={false}>
          <div className="row">
            <div className="col-md-6" style={{marginBottom: 10}}>
              <Label>{this.trans("category:name")}</Label>
              <Input id="nameCategory"
                     maxLength={20}
                     name="nameCategory"
                     allowClear
                     addonAfter={<i className="fa fa-list-alt fa-fw"/>}
                     placeholder={this.trans("category:placeholder.insertName")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "nameCategory")}
              />
            </div>
            <div className="col-md-6">
              <Card hoverable
                    style={{width: '100%'}}
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
