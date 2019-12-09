import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {Container, Row} from "reactstrap";
import Col from "reactstrap/es/Col";

const PopularProduct = (props) => {
    return (
        <>
            <Container>
                <h2 style={{marginBottom: 20}}>Sản phẩm nổi bật</h2>
                <Row>
                    <Col md="4">
                        <Card>
                            <CardImg top width="100%" src={require("assets/img/products/product1.jpg")}/>
                            <CardBody>
                                <CardTitle><h5 style={{fontWeight: 'bold'}}>Chrome-Regal S Royal Gold</h5></CardTitle>
                                <CardSubtitle>
                                    <label className="label label-primary">Bán chạy</label>
                                </CardSubtitle>
                                <CardSubtitle className="text-center">
                                    <span style={{fontWeight: 'bold', textDecoration: 'line-through', margin: 10}}>
                                        499,000</span>
                                    <span style={{color: 'red', fontWeight: 'bold'}}>
                                        249,000</span>
                                </CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the
                                    card's
                                    content.
                                </CardText>
                                <div className="text-center">
                                    <Button
                                        className="btn-just-icon mr-2"
                                        color="info"
                                        type="button">
                                        <i className="fa fa-heart"/>
                                    </Button>
                                    <Button
                                        className="btn-just-icon mr-2"
                                        color="info"
                                        type="button">
                                        <i className="fa fa-search"/>
                                    </Button>
                                    <Button color="danger"><i className="fa fa-shopping-cart fa-2x mr-3"/>Thêm vào giỏ hàng</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <CardImg top width="100%" src={require("assets/img/products/product2.jpg")}/>
                            <CardBody>
                                <CardTitle><h5 style={{fontWeight: 'bold'}}>Titan Loko Ring</h5></CardTitle>
                                <CardSubtitle>
                                    <label className="label label-primary">Bán chạy</label>
                                </CardSubtitle>
                                <CardSubtitle className="text-center">
                                    <span style={{fontWeight: 'bold', textDecoration: 'line-through', margin: 10}}>
                                        499,000</span>
                                    <span style={{color: 'red', fontWeight: 'bold'}}>
                                        249,000</span>
                                </CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the
                                    card's
                                    content.
                                </CardText>
                                <div className="text-center">
                                    <Button
                                        className="btn-just-icon mr-2"
                                        color="info"
                                        type="button">
                                        <i className="fa fa-heart"/>
                                    </Button>
                                    <Button
                                        className="btn-just-icon mr-2"
                                        color="info"
                                        type="button">
                                        <i className="fa fa-search"/>
                                    </Button>
                                    <Button color="danger"><i className="fa fa-shopping-cart fa-2x mr-3"/>Thêm vào giỏ hàng</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <CardImg top width="100%" src={require("assets/img/products/product3.jpg")}/>
                            <CardBody>
                                <CardTitle><h5 style={{fontWeight: 'bold'}}>Angel Chain</h5></CardTitle>
                                <CardSubtitle>
                                    <label className="label label-primary">Bán chạy</label>
                                </CardSubtitle>
                                <CardSubtitle className="text-center">
                                    <span style={{fontWeight: 'bold', textDecoration: 'line-through', margin: 10}}>
                                        499,000</span>
                                    <span style={{color: 'red', fontWeight: 'bold'}}>
                                        249,000</span>
                                </CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the
                                    card's
                                    content.
                                </CardText>
                                <div className="text-center">
                                    <Button
                                        className="btn-just-icon mr-2"
                                        color="info"
                                        type="button">
                                        <i className="fa fa-heart"/>
                                    </Button>
                                    <Button
                                        className="btn-just-icon mr-2"
                                        color="info"
                                        type="button">
                                        <i className="fa fa-search"/>
                                    </Button>
                                    <Button color="danger"><i className="fa fa-shopping-cart fa-2x mr-3"/>Thêm vào giỏ hàng</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PopularProduct;