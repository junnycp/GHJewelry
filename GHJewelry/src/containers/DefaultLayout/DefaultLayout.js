import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import * as router from 'react-router-dom';
import {Container} from 'reactstrap';
import {Cookies} from "react-cookie";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../configs/routes';
import {withTranslation} from "react-i18next";
import {LocalStorage} from "../../common/StorageUtil";
import Constants from "../../configs/Constants";
import {Spin, Icon} from 'antd';

export var showProgressFooter = function () {
  this.setState({hiddenProgress: false});
};
export var hideProgressFooter = function () {
  this.setState({hiddenProgress: true});
};

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const cookie = new Cookies();

class DefaultLayout extends Component {
  state = {
    hiddenProgress: true,
  };

  constructor(props) {
    super(props);
    showProgressFooter = showProgressFooter.bind(this);
    hideProgressFooter = hideProgressFooter.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.history.push('/login');
    cookie.remove(Constants.STORAGE_KEY.TOKEN_LOGGED);
    LocalStorage.removeItem(Constants.STORAGE_KEY.PERMISSION);
    LocalStorage.removeItem(Constants.STORAGE_KEY.MENU);
    window.open("/", "_self");
  }

  checkLogged() {
    let tokenLogged = cookie.get(Constants.STORAGE_KEY.TOKEN_LOGGED);
    if (tokenLogged === undefined || tokenLogged === "") {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    if (!this.checkLogged()) {
                      return <Redirect key={0} from="/" to="/login"/>;
                    } else {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )}/>
                      ) : (null);
                    }
                  })}
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside/>
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Spin indicator={<Icon type="loading" style={{fontSize: 20}} spin/>}
                hidden={this.state.hiddenProgress}/>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default withTranslation()(DefaultLayout);
