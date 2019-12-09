import BaseService from './BaseService'
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class ProductManagementService extends BaseService {
  fetchProduct = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "Products/get-all", data);
  };

  fetchCategory = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "Categories/get-all", data);
  };

  search = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "Products/find-by-example", data)
  };

  insert = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "Products/create", data, _callback);
  };

  update = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "Products/update", data, _callback);
  };

  delete = (id) => {
    const url = Constants.API_URL + "Products/delete/" + id;
    return RestAPIHelper.get(url);
  };

}
