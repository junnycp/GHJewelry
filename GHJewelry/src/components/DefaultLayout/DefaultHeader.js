import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/mbf-logo.png'
import icon from '../../assets/img/brand/iconfpt.svg'
import {withTranslation} from 'react-i18next';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    lang = 'vi';

    render() {
        const {i18n} = this.props;
        const changeLanguage = () => {
            this.lang = i18n.language === undefined ? 'vi' : i18n.language === 'en' ? 'vi' : 'en'
            i18n.changeLanguage(this.lang);
        };
        // eslint-disable-next-line
        const {children, ...attributes} = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile/>
                <AppNavbarBrand
                    full={{src: logo, width: 145, alt: 'Logo'}}
                    minimized={{src: icon, width: 30, height: 30, alt: 'Logo'}}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg"/>
                <Nav className="ml-auto" navbar>
                    {/*<NavItem className="d-md-down-none">*/}
                    {/*<NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>*/}
                    {/*</NavItem>*/}
                    <div color="primary" onClick={() => changeLanguage()} >
                        <i className={"flag-icon flag-icon-" + (this.lang === 'vi' ? 'gb' : 'vn')}
                           style={{marginRight: 5, fontSize: '20px'}}></i></div>
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <img src={'../../assets/img/avatars/iconuser.png'} className="img-avatar"
                                 alt="admin@bootstrapmaster.com"/>
                        </DropdownToggle>
                        <DropdownMenu right style={{right: 'auto'}}>
                            <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                            <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                            <DropdownItem onClick={e => this.props.onLogout(e)}><i
                                className="fa fa-lock"></i> Logout</DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withTranslation()(DefaultHeader);
