import React, {Component} from "react";
import {Card, CardHeader, Collapse} from "reactstrap";
import Button from "./Button";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";

const propTypes = {
    children: PropTypes.node
};
const defaultProps = {
    expanded: false
};

class DisplayBox extends Component {
    state = {
        icon: this.props.expanded ? "fa fa-caret-down" : "fa fa-caret-right",
        expanded: this.props.expanded
    };

    toggleCustom() {
        this.setState({
            expanded: !this.state.expanded
        });
        if (!this.state.expanded) {
            this.setState({
                icon: "fa fa-caret-down",
                cssFieldSet: "",
                cssLegend: ""
            });
        } else {
            this.setState({
                icon: "fa fa-caret-right"
            });
        }
    }

    render() {
        return (
            <Card hidden={this.props.hidden}>
                <CardHeader>
                    <Button
                        color="blue"
                        onClick={() => this.toggleCustom()}
                        aria-expanded={this.state.expanded}
                        aria-controls="exampleAccordion1"
                    >
                        {this.props.title}
                        <i style={{width: "16px"}} className={this.state.icon}/>
                    </Button>
                </CardHeader>
                <Collapse
                    isOpen={this.state.expanded}
                    data-parent="#accordion"
                    id="collapseOne"
                    aria-labelledby="headingOne"
                >
                    <div className="modal-body">
                        <form className="form-group" noValidate autoComplete="off">
                            {this.props.children}
                        </form>
                    </div>
                </Collapse>
            </Card>
        );
    }
}

DisplayBox.propTypes = propTypes;
DisplayBox.defaultProps = defaultProps;

export default withTranslation()(DisplayBox);
