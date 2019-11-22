import React, {Component} from "react";
import PropTypes from "prop-types";

let propTypes = {
    children: PropTypes.node
};

class Label extends Component {
    render() {
        return <label {...this.props} >{this.props.children}</label>;
    }
}

Label.propTypes = propTypes;

export default Label;