import BaseService from './BaseService'
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class ShipperManagementService extends BaseService {
  fetchShipper = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "shippers/get-all", data);
  };

  search = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "shippers/find-by-example", data)
  };

  insert = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "shippers/create", data, _callback);
  };

  update = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "shippers/update", data, _callback);
  };

  delete = (id) => {
    const url = Constants.API_URL + "shippers/delete/" + id;
    return RestAPIHelper.get(url)
  };

}
