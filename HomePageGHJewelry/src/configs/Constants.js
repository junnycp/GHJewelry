export default {
    API_URL: "http://10.10.48.109:8086/",
    // API_URL: process.env.REACT_APP_API_URL,
    SOCKET_URL: process.env.REACT_APP_SOCKET_URL,
    PATH_FILE_UPLOAD: process.env.REACT_APP_PATH_FILE_UPLOAD,
    IMAGE_HEADER: "data:image/jpeg;base64,",
    REGEX_EMAIL: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
    REGEX_CURRENCY: /(\d)(?=(\d{3})+(?!\d))/g,
    SECRET_KEY: "FWReactJSSecretKey",
    NO_VALUE: null,
    MAX_SIZE_IMAGE: 450,
    MAX_SIZE_UPLOAD: 5, //unit Mb
    NO_VALUE_ID: 0,
    SUFFIX_TITLE: '.title',
    STORAGE_KEY:{
        PERMISSION: "_p",
        TOKEN_LOGGED: "TOKEN_LOGGED",
        MENU: "MENU",
        USER_DATA: "user_data",
    },
    TABLE: {
        SIZE_PER_PAGE: 10,
        SIZE_PER_PAGE_LIST: [
            {text: "5", value: 5},
            {text: "10", value: 10},
            {text: "20", value: 20},
            {text: "50", value: 50},
            {text: "100", value: 100}
        ]
    },
    STATUS: {
        INACTIVE: "INACTIVE",
        ACTIVE: "ACTIVE",
        PENDING: "PENDING",
        BUSY: "BUSY",
        REPAIR: "REPAIR",
        UNAVAILABLE: "UNAVAILABLE",
        ASSIGN: "ASSIGN",
        WATTING: "UNAVAWATTINGILABLE"
    },
    ACTION: {
        VIEW: "VIEW",
        UPDATE: "UPDATE",
        INSERT: "INSERT",
        DELETE: "DELETE",
        COPY: "COPY",
        PLAY: "PLAY",
        STOP: "STOP",
        CONFIRM: "CONFIRM",
        SEARCH: "SEARCH",
        RESET: "RESET"
    },
    RESPONSE_CODE: {
        SUCCESS: "",
        ERROR: "ERROR",
        EXCEPTION: "EXCEPTION",
    },

    RESPONSE_STATUS: {
        SUCCESS: "SUCCESS",
        ERROR: "ERROR",
        ERROR_WITH_PAR: "ERROR_WITH_PAR"
    },
    SOCKET_TYPE: {
        USER_JOINED: "USER_JOINED",
        TEXT_MESSAGE: "TEXT_MESSAGE",
        USER_LEFT: "USER_LEFT",
        USER_JOINED_ACK: "USER_JOINED_ACK",
        CHANGE_BOOKING: "CHANGE_BOOKING",
        CHANGE_TICKET: "CHANGE_TICKET"
    }
};
