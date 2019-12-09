import BaseService from "./BaseService";
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class UsersManagementService extends BaseService {
  fetchUsers = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "users/get-all", data)
  };

  search = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "users/find-by-example", data)
  };

  insert = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "users/create", data, _callback);
  };

  update = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "users/update", data, _callback);
  };

  delete = (id) => {
    const url = Constants.API_URL + "users/delete/" + id;
    return RestAPIHelper.get(url);
  };
}
