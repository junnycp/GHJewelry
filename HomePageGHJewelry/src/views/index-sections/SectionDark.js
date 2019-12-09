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

// reactstrap components
import {Container, Row, Col} from "reactstrap";

// core components

function SectionDark() {
    return (
        <>
            <div className="section section-dark">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="8">
                            <h2 className="title">GH Jewelry</h2>
                            <p className="description">
                                Đã - Đang - Sẽ và Luôn mang tới cho mọi người những sản phẩm Độc - Chất - Giá tốt nhất
                                trên thị trường
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default SectionDark;
