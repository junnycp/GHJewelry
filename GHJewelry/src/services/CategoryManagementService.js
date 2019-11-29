import BaseService from './BaseService'
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class ProductManagementService extends BaseService {
  fetchCategory = (data) => {
    return RestAPIHelper.get(Constants.API_URL + "category/getAll", data);
  };

  insert = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "category/insert", data, _callback);
  };

  // update = (data, _callback) => {
  //   RestAPIHelper.post(Constants.API_URL + "product/update", data, _callback);
  // };
  //
  // delete = (id) => {
  //   const url = Constants.API_URL + "product/delete?idProduct=" + id;
  //   return RestAPIHelper.get(url);
  // };

}
