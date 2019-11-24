import BaseService from "./BaseService";
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class UsersManagementService extends BaseService {
  fetchUsers = (data) => {
    return RestAPIHelper.get(Constants.API_URL + "user/getAll", data)
  };

  insert = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "user/insert", data, _callback);
  };

  update = (data, _callback) => {
    RestAPIHelper.post(Constants.API_URL + "user/update", data, _callback);
  };

  delete = (id) => {
    const url = Constants.API_URL + "user/delete?idUser=" + id;
    return RestAPIHelper.get(url);
  };
}
