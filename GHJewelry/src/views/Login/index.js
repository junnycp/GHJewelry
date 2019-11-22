import React, {Component} from 'react';
import MessageBox from '../../components/MessageBox';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import {withTranslation} from "react-i18next";
import Constants from "../../configs/Constants";
import {Cookies} from "react-cookie";
import PropTypes from "prop-types";
import ProgressCustom from "../../components/ProgressCustom";
import {showErrorBox} from "../../components/MessageBox";
import {ACTIONS} from "./reducers";
import AuthenticationService from "../../services/AuthenticationService";
import {LocalStorage} from "../../common/StorageUtil";
import {connect} from "react-redux";

const cookie = new Cookies();

class Login extends Component {
  adUser = {};
  lang = "vi";

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.service = new AuthenticationService();
  }

  onRedirect() {
    this.context.router.push("/");
  }

  validate() {
    if (this.adUser.username === undefined || this.adUser.username.trim() === '') {
      showErrorBox(this.props.t('login.message.usernameEmpty'));
      return false;
    }
    if (this.adUser.pass === undefined || this.adUser.pass.trim() === '') {
      showErrorBox(this.props.t('login.message.passEmpty'));
      return false;
    }
    return true;
  }

  async onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.adUser = {
      username: data.get("username"),
      pass: data.get("pass")
    };
    if (!this.validate()) {
      return;
    }
    this.props.updateUserInfo({
      username: data.get("username"),
      email: 'giangln4@fpt.com.vn'
    });

    this.service.login(this.adUser, result => {
      let d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
      // cookie.set(Constants.STORAGE_KEY.TOKEN_LOGGED, result.data.token, {
      //     path: "/",
      //     expires: d
      // });
      // LocalStorage.setItem(Constants.STORAGE_KEY.PERMISSION, result.data.permission.privilege);
      // LocalStorage.setItem(Constants.STORAGE_KEY.USER_DATA, result.data);

      //Rxxx fix permission
      cookie.set(Constants.STORAGE_KEY.TOKEN_LOGGED, "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcGlfdXNlciIsImp0aSI6Ii0yIiwiYXVkIjoiMzU3IiwiZXhwIjo0NzIxMzYyOTU2fQ.b87hUqqo_1RZhybvAQhi_3tCVohfc1AA7hbb9TgS0S9w2-CbPjD2qXC-wgOUeXLRe5ntOdN7xPH8DfZEZbcecg", {
        path: "/",
        expires: d
      });
      LocalStorage.setItem(Constants.STORAGE_KEY.MENU, result);
      //
      window.open("/", "_self");
    });
  }

  render() {
    const {t, i18n} = this.props;
    const changeLanguage = () => {
      this.lang =
        i18n.language === undefined
          ? "vi"
          : i18n.language === "en"
          ? "vi"
          : "en";
      i18n.changeLanguage(this.lang);
    };
    return (
      <div
        style={{
          background:
            "url('../../assets/img/backgroundHelios2.jpg') no-repeat fixed center"
        }}
        className="app flex-row align-items-center"
      >
        <MessageBox/>
        <ProgressCustom/>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>{t("login.title")}</h1>
                      <p className="text-muted">{t("login.textmuted")}</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder={t("login.username")}
                          autoComplete="username"
                          name="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder={t("login.password")}
                          autoComplete="current-password"
                          name="pass"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" type="submit">
                            {t("login.btnlogin")}
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" onClick={() => {
                          }}>
                            {t("login.forgotpassword")}
                          </Button>
                          <Button
                            className="px-0"
                            color="link"
                            onClick={() => changeLanguage()}
                          >
                            <i
                              className={
                                "flag-icon flag-icon-" +
                                (this.lang === "vi" ? "gb" : "vn")
                              }
                              style={{marginRight: 5}}
                            />
                            {t("login.language")}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white py-5 d-md-down-none"
                  style={{
                    width: "44%",
                    backgroundColor: "rgb(0,0,0,0.4)"
                  }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2 style={{color: '#fff'}}>{t("login.bigtitle")}</h2>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (userInfo) => dispatch({
    type: ACTIONS.UPDATE_USER_INFO,
    payload: userInfo
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Login));
