import BaseService from './BaseService'
import RestAPIHelper from "../common/RestAPIHelper";
import Constants from "../configs/Constants";

export default class ProductManagementService extends BaseService {
  fetchProduct = (data) => {
    return RestAPIHelper.post(Constants.API_URL + "Products/get-all", data);
  };
}
