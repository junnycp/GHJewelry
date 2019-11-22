import BaseService from "./BaseService";

// ******* Lưu ý phần fetch bên dưới

export default class AuthenticationService extends BaseService {
    login = (data, _callback) => {
        return fetch("http://localhost:3000/json/getByCodeType.json", {
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
