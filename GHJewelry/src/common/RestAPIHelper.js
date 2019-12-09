import {Cookies} from "react-cookie";
import Constants from "../configs/Constants";
import i18n from "../i18n";
import {showErrorBox} from "../components/MessageBox";
import {showProgress, hideProgress} from "../components/ProgressCustom";
import {
  showProgressFooter,
  hideProgressFooter
} from "../containers/DefaultLayout/DefaultLayout";
import moment from "moment";

const cookie = new Cookies();

const RestAPIHelper = {
  get(_url, _callback, hasDialogProcess = false, _error = error => {
  }) {
    if (hasDialogProcess) {
      showProgress();
    } else {
      showProgressFooter();
    }
    return fetch(_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.get(Constants.STORAGE_KEY.TOKEN_LOGGED),
        request_pair: moment().format("YYYYMMDDHHmmssSSS"),
        app_code: process.env.REACT_APP_CODE
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(responseJson => {
        return this.handlingResponse(responseJson, hasDialogProcess, _callback);
      })
      .catch(response => {
        this.handlingError(response, hasDialogProcess, _error);
      });
  },

  post(
    _url,
    _params,
    _callback,
    hasDialogProcess = false,
    _error = error => {
      console.error("errrrr",error);
    }
  ) {
    if (hasDialogProcess) {
      showProgress();
    } else {
      showProgressFooter();
    }
    return fetch(_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.get(Constants.STORAGE_KEY.TOKEN_LOGGED),
        request_pair: moment().format("YYYYMMDDHHmmssSSS"),
        app_code: process.env.REACT_APP_CODE
      },
      body: JSON.stringify(_params)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(responseJson => {
        return this.handlingResponse(responseJson, hasDialogProcess, _callback);
      })
      .catch(response => {
        this.handlingError(response, hasDialogProcess, _error);
      });
  },
  delete(
    _url,
    _params,
    _callback,
    hasDialogProcess = false,
    _error = error => {
      console.error(error);
    }) {
    if (hasDialogProcess) {
      showProgress();
    } else {
      showProgressFooter();
    }
    return fetch(_url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie.get(Constants.STORAGE_KEY.TOKEN_LOGGED),
        request_pair: moment().format("YYYYMMDDHHmmssSSS"),
        app_code: process.env.REACT_APP_CODE
      },
      body: JSON.stringify(_params)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(responseJson => {
        return this.handlingResponse(responseJson, hasDialogProcess, _callback);
      })
      .catch(response => {
        this.handlingError(response, hasDialogProcess, _error);
      });
  },

  login(
    _callback,
    _params,
    _error = error => {
      console.error(error);
    }
  ) {
    showProgress();
    return fetch(Constants.API_URL + "admin/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        request_pair: moment().format("YYYYMMDDHHmmssSSS"),
        app_code: process.env.REACT_APP_CODE
      },
      body: JSON.stringify(_params)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(responseJson => {
        return this.handlingResponse(responseJson, true, _callback);
      })
      .catch(response => {
        this.handlingError(response, true, _error);
      });
  },
  handlingResponse(responseJson, hasDialogProcess, callback) {
    if (hasDialogProcess) {
      hideProgress();
    } else {
      hideProgressFooter();
    }
    if (responseJson.status === Constants.RESPONSE_STATUS.SUCCESS) {
      if (callback) {
        callback(responseJson);
      }
      return responseJson;
    } else if (responseJson.status === Constants.RESPONSE_STATUS.ERROR_WITH_PAR) {
      let mess = i18n.t("common.error." + responseJson.code);
      responseJson.paramCode.forEach((value, index) => {
        mess = mess.replace(":" + index, value);
      });
      showErrorBox(mess);
    } else {
      if (responseJson.code !== Constants.RESPONSE_CODE.EXCEPTION) {
        showErrorBox(i18n.t("common.error." + responseJson.code));
      } else {
        showErrorBox(responseJson.message);
      }
    }
  },
  handlingError(response, hasDialogProcess, callback) {
    if (hasDialogProcess) {
      hideProgress();
    } else {
      hideProgressFooter();
    }
    console.log("response nek", response);
    if (response.message === "Duplicate") {
      showErrorBox("asdasd");
    } else if (response.status === 401 || response.status === 403) {
      showErrorBox(i18n.t("common.error.TOKEN_ERR"));
    } else if (response.status === 404) {
      showErrorBox(i18n.t("common.error.PROCESS_ERR"));
    }
    console.error(response);
    callback(response);
  }
};
export default RestAPIHelper;
