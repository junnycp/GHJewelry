import React from 'react';
import {notification} from "antd";

notification.config({
  placement: 'topRight',
  top: 60,
  duration: 3,
});

const openNotification = (type, title, message) => {
  notification[type]({
    message: title,
    description: message
  });
};

export default openNotification;
