import React from 'react';
import {Table, Button} from 'antd';
import BaseComponent from "./BaseComponent";
import {withTranslation} from "react-i18next";
import Constants from "../configs/Constants";


class DataTable extends BaseComponent {

  static defaultProps = {
    showTopButton: true
  };

  render() {
    return (
      <div>
        <Button
          hidden={!this.props.showTopButton}
          type="primary"
          style={{marginBottom: 8}}
          onClick={this.props.onInsert}
          privilege={this.props.menuCode + "." + Constants.ACTION.INSERT}><i className="fa fa-plus-circle"/>&nbsp;
          {this.trans("common.addNew")}
        </Button>
        <Table {...this.props.options} columns={this.props.options.columns.filter((item) => (
          item.key !== 'description'
        ))}
               bordered
               pagination={{
                 showTotal: (total) => (`Tổng số ${total} bản ghi`),
                 // onChange: this.cancel,
                 showSizeChanger: true,
                 pageSizeOptions: ['3', '10', '20', '30', '40']
               }}
        />
      </div>
    )
  }
}

export default withTranslation()(DataTable);
