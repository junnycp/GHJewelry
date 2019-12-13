/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from "reactstrap";
import Badge from "reactstrap/es/Badge";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            target="_blank"
            title="GH Jewelry"
          >
            <i className="fa fa-diamond fa-lg" />{" "}GH Jewelry
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim?ref=creativetim"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fa fa-facebook-square" />
                <span>Facebook</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                  data-placement="bottom"
                  href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                  target="_blank"
                  title="Follow us on Instagram"
              >
                <i className="fa fa-instagram" />
                <span>Instagram</span>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="dropdownMenuButton"
                  nav
                  onClick={e => e.preventDefault()}
                  role="button"
              >
                <i className="fa fa-mars"/>{" "}MEN
              </DropdownToggle>
              <DropdownMenu
                  aria-labelledby="dropdownMenuButton"
                  className="dropdown-info"
              >
                <DropdownItem header tag="span">
                  SẢN PHẨM CHO NAM
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Nhẫn Chrome
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Dây chuyền
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Khuyên tai
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem header tag="span">
                  VÒNG TAY
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Vòng tay chuỗi hạt
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Vòng tay dây da
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="dropdownMenuButton"
                  nav
                  onClick={e => e.preventDefault()}
                  role="button"
              >
                <i className="fa fa-venus"/>{" "}WOMEN
              </DropdownToggle>
              <DropdownMenu
                  aria-labelledby="dropdownMenuButton"
                  className="dropdown-info"
              >
                <DropdownItem header tag="span">
                  SẢN PHẨM CHO NỮ
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Nhẫn Chrome
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Dây chuyền
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Khuyên tai
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem header tag="span">
                  VÒNG TAY
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Vòng tay chuỗi hạt
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Vòng tay dây da
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink
                href="#user"
                target="_blank"
              >
                <i className="fa fa-user-o" /> Quản lý thông tin
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                  role="button"
              >
                <i
                    aria-hidden={true}
                    className="nc-icon nc-settings-gear-65"
                />
              </DropdownToggle>
              <DropdownMenu className="dropdown-danger" right>
                <DropdownItem header tag="span">
                  Dropdown header
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Another action
                </DropdownItem>
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Something else here
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                  Separated link
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                href="#cart"
                target="_blank"
              >
                <i className="fa fa-shopping-cart"/>
                {" "}Giỏ hàng{" "}
                <Badge color="default"></Badge>
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
