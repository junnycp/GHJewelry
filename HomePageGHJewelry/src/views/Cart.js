import React, {Component} from 'react';
import {LocalStorage} from "../common/StorageUtil";
import DataTable from "../components/DataTable";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }

    }

    genCols = () => {
        return [
            {title: 'STT', key: 'stt', render: (text, record, index) => index + 1, align: 'center'},
            {title: "Tên sản phẩm", dataIndex: 'idProduct', key: 'idProduct'},
            {title: "Số lượng", dataIndex: 'quantity', key: 'quantity'},
            {title: "Thành tiền", dataIndex: 'totalMoney', key: 'totalMoney'},
        ];
    };

    render() {
        return (
            <div>
                <h2>Shopping cart</h2>
            </div>
        );
    }
}

export default Cart;