import React from 'react';
import ProductManagementService from "../services/ProductManagementService";
import BaseComponent from "../components/BaseComponent";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Container, PaginationItem, PaginationLink, Pagination,
    Row
} from "reactstrap";
import Col from "reactstrap/es/Col";
import {LocalStorage} from "../common/StorageUtil";

class ListProduct extends BaseComponent {
    constructor(props) {
        super(props);
        this.service = new ProductManagementService();
        this.state = {
            data:{
                totalMoney: 0
            },
            lstProduct: [],
            cart: [],
            inExistItem: {},
            existItem: {},
            quantity: 1
        }
    }

    componentWillMount() {
        this.onFetchProduct();
    }

    onFetchProduct = async () => {
        let result = await this.service.fetchProduct([{
            direction: 'asc',
            property: 'nameProduct'
        }]);
        if (result) {
            this.setState({
                lstProduct: result.data
            })
        }
    };

    // onAddCart = async (product) => {
    //     let InExistItem = this.state.inExistItem; //item chưa tồn tại
    //     let ExistItem = this.state.existItem; // item đã tồn tại
    //     if (ExistItem.idProduct === product.idProduct) { //nếu item truyền vào = item đã tồn tại
    //         ExistItem.idProduct = product.idProduct;
    //         ExistItem.quantity = ExistItem.quantity + 1; // thì + 1 quantity
    //         ExistItem.totalMoney = product.price * ExistItem.quantity;
    //     } else if (ExistItem.idProduct !== product.idProduct) { //nếu item truyền vào khác item đã tồn tại
    //         InExistItem.idProduct = product.idProduct;
    //         InExistItem.quantity = this.state.quantity;
    //         InExistItem.totalMoney = product.price * InExistItem.quantity;
    //         await this.state.cart.push(InExistItem);// thì thêm mới vào cart
    //         await this.setState({
    //             existItem: this.state.inExistItem
    //         });
    //         this.setState({
    //             inExistItem: {}
    //         })
    //     }
    //     console.log("existItem", this.state.existItem);
    //     console.log("inExistItem", this.state.inExistItem);
    //     console.log("cart", this.state.cart);
    // };
    onAddCart = async (product) => {
        let InExistItem = this.state.inExistItem; //item chưa tồn tại
        let ExistItem = this.state.existItem;
        let data = this.state.data;

        for (let existItem of this.state.cart) {
            if (existItem.idProduct === product.idProduct) {
                existItem.idProduct = product.idProduct;
                existItem.quantity = existItem.quantity + 1; // thì + 1 quantity
                existItem.totalMoney = product.price * existItem.quantity;
                return;
            }
        }
        if (ExistItem.idProduct !== product.idProduct) {
            InExistItem.idProduct = product.idProduct;
            InExistItem.quantity = this.state.quantity;
            InExistItem.totalMoney = product.price * InExistItem.quantity;
            await this.state.cart.push(InExistItem);// thì thêm mới vào cart
            await this.setState({
                existItem: InExistItem
            });
            await this.setState({
                inExistItem: {}
            });
        }
        console.log("inExistItem", this.state.inExistItem);
        console.log("cart", this.state.cart);
    };

    calculateTotalMoney = () => {
        console.log("caccc");
        for (let cart of this.state.cart){
            this.state.data.totalMoney = this.state.data.totalMoney + cart.totalMoney
        }
        console.log("cax",this.state.data.totalMoney);
    };

    toCheckout = () => {
        LocalStorage.setItem("CART", this.state.cart)
    };

    removeCart = () => {
        LocalStorage.removeItem("CART")
    };

    render() {
        return (
            <>
                <Container>
                    <h2 style={{marginBottom: 20}}>Tất cả sản phẩm</h2>
                    <Row>
                        <Col md="4">
                            <Card>
                                <CardImg top width="100%" src={require("assets/img/products/product4.jpg")}/>
                                <CardBody>
                                    <CardTitle><h5 style={{fontWeight: 'bold'}}>Chrome-Regal S Royal Gold</h5>
                                    </CardTitle>
                                    <CardSubtitle>
                                        <label className="label label-success">Còn hàng</label>
                                    </CardSubtitle>
                                    <CardSubtitle className="text-center">
                                    <span style={{fontWeight: 'bold', textDecoration: 'line-through', margin: 10}}>
                                        499,000</span>
                                        <span style={{color: 'red', fontWeight: 'bold'}}>
                                        249,000</span>
                                    </CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of
                                        the
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
                                        <Button color="danger"><i className="fa fa-shopping-cart fa-2x mr-3"/>Thêm vào
                                            giỏ
                                            hàng</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardImg top width="100%" src={require("assets/img/products/product7.jpg")}/>
                                <CardBody>
                                    <CardTitle><h5 style={{fontWeight: 'bold'}}>Titan Loko Ring</h5></CardTitle>
                                    <CardSubtitle>
                                        <label className="label label-success">Còn hàng</label>
                                    </CardSubtitle>
                                    <CardSubtitle className="text-center">
                                    <span style={{fontWeight: 'bold', textDecoration: 'line-through', margin: 10}}>
                                        499,000</span>
                                        <span style={{color: 'red', fontWeight: 'bold'}}>
                                        249,000</span>
                                    </CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of
                                        the
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
                                        <Button color="danger"><i className="fa fa-shopping-cart fa-2x mr-3"/>Thêm vào
                                            giỏ
                                            hàng</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardImg top width="100%" src={require("assets/img/products/product6.jpg")}/>
                                <CardBody>
                                    <CardTitle><h5 style={{fontWeight: 'bold'}}>Angel Chain</h5></CardTitle>
                                    <CardSubtitle>
                                        <label className="label label-success">Còn hàng</label>
                                    </CardSubtitle>
                                    <CardSubtitle className="text-center">
                                    <span style={{fontWeight: 'bold', textDecoration: 'line-through', margin: 10}}>
                                        499,000</span>
                                        <span style={{color: 'red', fontWeight: 'bold'}}>
                                        249,000</span>
                                    </CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of
                                        the
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
                                        <Button color="danger"><i className="fa fa-shopping-cart fa-2x mr-3"/>Thêm vào
                                            giỏ
                                            hàng</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardImg top width="100%" src={require("assets/img/products/product8.jpg")}/>
                                <CardBody>
                                    <CardTitle>
                                        <h5 style={{fontWeight: 'bold'}}>Angel Chain
                                        </h5>
                                    </CardTitle>
                                    <CardSubtitle>
                                        <label className="label label-success">Còn hàng</label>
                                    </CardSubtitle>
                                    <CardSubtitle className="text-center">
                                    <span style={{fontWeight: 'bold', textDecoration: 'line-through', margin: 10}}>
                                        499,000</span>
                                        <span style={{color: 'red', fontWeight: 'bold'}}>
                                        249,000</span>
                                    </CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of
                                        the
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
                                        <Button color="danger"><i className="fa fa-shopping-cart fa-2x mr-3"/>Thêm vào
                                            giỏ
                                            hàng</Button>
                                        <Button onClick={this.calculateTotalMoney}>total</Button>
                                        <Button onClick={this.toCheckout}>checkout</Button>
                                        <Button onClick={this.removeCart}>removeCart</Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        {this.state.lstProduct.map((product) => (
                                <Col md="4" key={product.idProduct}>
                                    <Card>
                                        {product.image &&
                                        <CardImg top width="100%" src={require("assets/img/products/" + product.image)}/>
                                        }
                                        <CardBody>
                                            <CardTitle>
                                                <h5 style={{fontWeight: 'bold'}}>{product.nameProduct}
                                                </h5>
                                            </CardTitle>
                                            <CardSubtitle>
                                                {product.status === 1 ?
                                                    <label className="label label-success">Còn hàng</label> :
                                                    <label className="label label-default">Hết hàng</label>}

                                            </CardSubtitle>
                                            <CardSubtitle className="text-center">
                                    <span style={{fontWeight: 'bold', textDecoration: 'line-through', margin: 10}}>
                                        499,000</span>
                                                <span style={{color: 'red', fontWeight: 'bold'}}>
                                                {product.price}</span>
                                            </CardSubtitle>
                                            <CardText>{product.note}
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
                                                {product.status === 1 ?
                                                    <Button color="danger" onClick={() => this.onAddCart(product)}><i
                                                        className="fa fa-shopping-cart fa-2x mr-3"/>Thêm
                                                        vào giỏ
                                                        hàng</Button> : <Button color="danger" disabled><i
                                                        className="fa fa-shopping-cart fa-2x mr-3"/>Thêm
                                                        vào giỏ
                                                        hàng</Button>}

                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        )}
                    </Row>
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                                tabIndex="-1"
                            >
                                Previous
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                            <PaginationLink
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                3 <span className="sr-only">(current)</span>
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                4
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                5
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                Next
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Container>
            </>
        );
    }
}

export default ListProduct;