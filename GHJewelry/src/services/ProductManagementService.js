import BaseService from './BaseService'
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class ProductManagementService extends BaseService {
  fetchProduct = (data) => {
    return RestAPIHelper.get("http://localhost:3000/json/getByCodeType.json");
    // return RestAPIHelper.get(Constants.API_URL + "product/getAll", data);
  };

  // insert = (data, _callback) => {
  //   RestAPIHelper.post(Constants.API_URL + "product/insert", data, _callback);
  // };
  //
  // update = (data, _callback) => {
  //   RestAPIHelper.post(Constants.API_URL + "product/update", data, _callback);
  // };
  //
  // delete = (id) => {
  //   const url = Constants.API_URL + "product/delete?idProduct=" + id;
  //   return RestAPIHelper.get(url);
  // };

}
