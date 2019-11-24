import BaseService from "./BaseService";
import Constants from "../configs/Constants";

// ******* Lưu ý phần fetch bên dưới

export default class AuthenticationService extends BaseService {
    // login = (data, _callback) => {
    //     return fetch(Constants.API_URL + "admin/login", {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         userName: data.username,
    //         password: data.pass
    //       })
    //     })
    //       .then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 throw response;
    //             }
    //         })
    //         .then(responseJson => {
    //             _callback(responseJson);
    //         });
    // };
  login = (data, _callback) => {
    return fetch("http://localhost:3000/json/getUser.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
        _callback(responseJson);
      });
  };
}
