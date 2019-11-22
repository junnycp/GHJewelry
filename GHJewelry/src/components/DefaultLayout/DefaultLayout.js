import React, {Component, Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Container} from "reactstrap";
import {Cookies} from "react-cookie";

import {
    AppAside,
    //AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer
    //AppSidebarNav,
} from "@coreui/react";
import AppSidebarNav from "./SidebarNav";
import AppBreadcrumb from "./Breadcrumb";
// routes config
import routes from "../../configs/routes";
import {withTranslation} from "react-i18next";
import Constants from "../../configs/Constants";
import {Spin, Icon} from 'antd';
import {LocalStorage} from "../../common/StorageUtil";

export var showProgressFooter = function () {
    this.setState({hiddenProgress: false});
};
export var hideProgressFooter = function () {
    this.setState({hiddenProgress: true});
};

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const cookie = new Cookies();

let MENU = {
    navigation: [{
        "name": "Dashboard",
        "url": "/Dashboard",
        "icon": "fa fa-dashboard"
    }],
    validMenu: ["Dashboard"]
};
let menus = LocalStorage.getItem(Constants.STORAGE_KEY.MENU);
if (menus!==undefined && menus!==null) {
    MENU = {
        navigation: menus.tree,
        validMenu: menus.flat
    };
}

class DefaultLayout extends Component {
    state = {
        hiddenProgress: true,
    };

    constructor(props) {
        super(props);
        showProgressFooter = showProgressFooter.bind(this);
        hideProgressFooter = hideProgressFooter.bind(this);
    }

    componentWillMount() {
        // this.loadMenu();
    }

    // loadMenu = async () => {
    //     let menus = await LocalStorage.getItem(Constants.STORAGE_KEY.MENU);
    //     if (menus!==undefined) {
    //         await this.setState({
    //             navigation: menus.tree,
    //             validMenu: menus.flat
    //         });
    //     }
    // };

    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );

    signOut(e) {
        e.preventDefault();
        cookie.remove(Constants.STORAGE_KEY.TOKEN_LOGGED);
        LocalStorage.removeItem(Constants.STORAGE_KEY.PERMISSION);
        window.open("/", "_self");
    }

    checkLogged() {
        let tokenLogged = cookie.get(Constants.STORAGE_KEY.TOKEN_LOGGED);
        if (tokenLogged === undefined || tokenLogged === "") {
            return false;
        }
        return true;
    }

    checkPermission(pathName) {
        let routeName = pathName.substring(
            pathName.lastIndexOf("/") + 1,
            pathName.length
        );
        if (routeName !== "" && MENU.validMenu.indexOf(routeName) <= -1) {
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
                            <AppSidebarNav
                                navConfig={MENU.navigation}
                                {...this.props}
                                validMenu={MENU.validMenu}
                            />
                        </Suspense>
                        <AppSidebarFooter/>
                        <AppSidebarMinimizer/>
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes}/>
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        if (!this.checkLogged()) {
                                            return <Redirect key={0} from="/" to="/login"/>;
                                        } else if (
                                            !this.checkPermission(this.props.location.pathname)
                                        ) {
                                            return <Redirect from="/" to="/AccessDenied"/>;
                                        } else {
                                            return route.component ? (
                                                <Route
                                                    key={idx}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    name={route.name}
                                                    render={props => <route.component {...props} />}
                                                />
                                            ) : null;
                                        }
                                    })}
                                    <Redirect from="/" to="/Dashboard"/>
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
