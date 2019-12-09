import React from "react";

// reactstrap components
import {Row, Container} from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          {/*<nav className="footer-nav">*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      <a*/}
          {/*        href="https://www.facebook.com/junnycp"*/}
          {/*        target="_blank"*/}
          {/*      >*/}
          {/*        <i className="fa fa-diamond fa-lg" />{" "}GH Jewelry*/}
          {/*      </a>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</nav>*/}
          <div className="credits ml-auto" style={{fontSize: 24}}>
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Nam Giang
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
