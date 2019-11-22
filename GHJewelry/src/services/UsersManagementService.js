import BaseService from "./BaseService";
import RestAPIHelper from "../common/RestAPIHelper";

export default class UsersManagementService extends BaseService {
  fetchUsers = (data) => {
    return RestAPIHelper.get("http://localhost:3000/json/getUser.json")
  }

  // insert = (data, _callback) => {
  //   RestAPIHelper.post(Constants.API_URL + "link", data, _callback);
  // };
  //
  // update = (data, _callback) => {
  //   RestAPIHelper.post(Constants.API_URL + "link", data, _callback);
  // };
  //
  // delete = (id) => {
  //   const url = Constants.API_URL + "link" + id;
  //   return RestAPIHelper.get(url);
  // };
}
