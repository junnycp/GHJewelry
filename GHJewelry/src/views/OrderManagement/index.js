import React from 'react';
import {Select, Input, Button, DatePicker, Card} from "antd";
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
import openNotification from "../../components/Notification";
import OrderManagementService from "../../services/OrderManagementService";
import BrandLogo from "../../assets/img/GHJewelry.png";
import StatusFormatter from "../../components/StatusFormatter";

const Option = Select.Option;
const {Meta} = Card;

class OrderManagement extends BaseComponent {
  constructor(props) {
    super(props);
    this.service = new OrderManagementService();
    this.state = {
      lstOrder: [],
      lstDetail: [],
      data: {}
    }
  }

  componentWillMount = () => {
    this.onFetchOrders();
  };

  getDetailForm(_action, _data) {
    return (
      <DetailForm
        options={{
          action: _action,
          data: _data,
          onComplete: () => {
            hideDialog(false);
            this.onFetchOrders();
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

  onFetchOrders = async () => {
    let result = await this.service.fetchOrders([]);
    if (result) {
      this.setState({
        lstOrder: result.data
      })
    }
  };

  onDelete = async row => {
    await this.service.delete(row.idUser);
    showMessageBox(this.trans("common.message.deleteSuccess"));
    this.onFetchOrders();
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

  genStatusCol = (cell, row) => {
    return <StatusFormatter value={row.status === 1 ? 'ACTIVE' : 'INACTIVE'}
                            label={row.status === 1 ? this.trans("common.delivered") : this.trans("common.undelivered")}/>
  };

  genCols = () => {
    return [
      {title: this.trans("common.num"), key: 'stt', render: (text, record, index) => index + 1},
      {title: this.trans("orders:orderId"), dataIndex: 'idOrder', key: 'idOrder'},
      {title: this.trans("orders:userId"), dataIndex: 'idUser', key: 'idUser'},
      {title: this.trans("orders:createdDate"), dataIndex: 'createTime', key: 'createTime'},
      {title: this.trans("orders:totalMoney"), dataIndex: 'totalMoney', key: 'totalMoney'},
      {title: this.trans("orders:status"), dataIndex: 'status', key: 'status', render: this.genStatusCol},
    ];
  };

  genDetailCols = () => {
    return [
      {title: this.trans("common.num"), key: 'stt', render: (text, record, index) => index + 1},
      {title: this.trans("product:name"), dataIndex: 'orderItem.idProduct', key: 'orderItem.idProduct'},
      {title: this.trans("orders:quantity"), dataIndex: 'orderItem.quantity', key: 'orderItem.quantity'},
      {title: this.trans("orders:totalMoney"), dataIndex: 'orderItem.totalMoney', key: 'orderItem.totalMoney'},
    ];
  };

  onSearch = () => {
    console.log(this.state.data);
    openNotification('success', this.trans("common.message.found"), this.trans("users:message.found", {result: this.state.lstOrder.length}));
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

  onRowSelect = async (record) => {
    console.log("record",record);
    await this.setState({
      data: record,
      lstDetail: record.orderDetails,
      isChoosen: true
    })
  };

  render() {
    console.log("kakak",this.state.lstDetail);
    return (
      <div className="animated fadeIn">
        <DisplayBox title={<strong>{this.trans("common.search")}</strong>} expanded={false}>
          <div className="row">
            <div className="col-md-4">
              <Label>{this.trans("orders:orderId")}:</Label>
              <Input id="orderId"
                     maxLength={20}
                     name="orderId"
                     allowClear
                     addonAfter={<i className="fa fa-vcard fa-fw"/>}
                     placeholder={this.trans("orders:placeholder.orderId")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "orderId")}
              />
            </div>
            <div className="col-md-4">
              <Label>{this.trans("orders:userId")}:</Label>
              <Input id="idUser"
                     maxLength={20}
                     name="idUser"
                     allowClear
                     addonAfter={<i className="fa fa-envelope fa-fw"/>}
                     placeholder={this.trans("orders:placeholder.userId")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "idUser")}
              />
            </div>
            <div className="col-md-4">
              <Label>{this.trans("orders:productId")}:</Label>
              <Input id="idProduct"
                     maxLength={20}
                     name="idProduct"
                     allowClear
                     addonAfter={<i className="fa fa-phone-square fa-fw"/>}
                     placeholder={this.trans("orders:placeholder.productId")}
                     onChange={this.onChangeTextFieldCustom.bind(this, "idProduct")}
              />
            </div>
            <div className="col-md-4" style={{marginTop: 10}}>
              <Label>{this.trans("orders:createdDate")}:</Label>
              <DatePicker
                id="created"
                name="created"
                maxLength={20}
                style={{width: '100%'}}
                format={'DD/MM/YYYY'}
                allowClear
                addonAfter={<i className="fa fa-map-marker fa-fw"/>}
                placeholder={this.trans("orders:placeholder.createdDate")}
                onChange={this.onChangeDate.bind(this, "created")}
              />
            </div>
            <div className="col-md-2" style={{textAlign: "center", marginTop: 40}}>
              <Button type="primary" onClick={this.onSearch}><i
                className="fa fa-search"/>&nbsp;{this.trans("common.search")}</Button>
            </div>
            <div className="col-md-6" style={{textAlign: "right", marginTop: 10}}>
              <Card hoverable
                    style={{width: '100%'}}
                    cover={<img alt="example"
                                src={BrandLogo}/>}>
                <Meta title="GH Jewelry" description="Cam kết hàng chính hãng chất lượng cao"/>
              </Card>
            </div>
          </div>
        </DisplayBox>
        <div className="row">
          <div className="col-md-5">
            <DisplayBox title={<strong>{this.trans("orders:title")}</strong>} expanded={true}>
              <DataTable
                showTopButton={false}
                showPagination={true}
                options={{
                  onRowSelect: this.onRowSelect,
                  columns: this.genCols(),
                  dataSource: this.state.lstOrder.length === 0 ? null : this.state.lstOrder,
                  loading: this.state.lstOrder.length === 0,
                  rowKey: record => record.idOrder
                }}
                onInsert={this.onOpenInsert}/>
            </DisplayBox>
          </div>
          <div className="col-md-7">
            <DisplayBox title={<strong>{this.trans("orders:detail")}</strong>} expanded={true}>
              <DataTable
                showTopButton={false}
                showPagination={false}
                options={{
                  columns: this.genDetailCols(),
                  dataSource: this.state.lstDetail.length === 0 ? null : this.state.lstDetail,
                }}
                onInsert={this.onOpenInsert}/>
            </DisplayBox>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation(["common", "users", "product", "orders"])(OrderManagement);
