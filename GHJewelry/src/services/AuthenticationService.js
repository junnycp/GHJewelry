import BaseService from "./BaseService";
import Constants from "../configs/Constants";
import RestAPIHelper from "../common/RestAPIHelper";

export default class AuthenticationService extends BaseService {
  login = (data, _callback) => {
    return RestAPIHelper.login(_callback, {userName: data.username, password: data.pass})
  }
}
