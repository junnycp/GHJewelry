import BaseService from "./BaseService";
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class OrderManagementService extends BaseService {
  fetchOrders = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "Orders/get-all", data)
  };

  insert = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "order/insert", data, _callback);
  };

  update = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "order/update", data, _callback);
  };

  delete = (id) => {
    const url = Constants.API_URL + "order/delete?idOrder=" + id;
    return RestAPIHelper.get(url);
  };
}
