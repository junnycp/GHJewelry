import BaseService from './BaseService'
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class ProductManagementService extends BaseService {
  fetchCategory = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "Categories/get-all", data);
  };

  search = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "Categories/find-by-example", data)
  };

  insert = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "Categories/create", data, _callback);
  };

  update = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "Categories/update", data, _callback);
  };

  delete = (id) => {
    const url = Constants.API_URL + "Categories/delete/" + id;
    return RestAPIHelper.get(url);
  };

}
