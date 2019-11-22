export function frozenRowCol(id) {
    let fixed_elements = document.getElementsByClassName("fixed");
    for (let i = 0; i < fixed_elements.length; i++) {
        fixed_elements[i].className += " " + parent_id("DIV", fixed_elements[i]);
    }
    let scroll_div = document.getElementById(id);
    if (scroll_div !== undefined && scroll_div !== null) {
        scroll_div.addEventListener("scroll", freeze_pane_listener(scroll_div, "scrolling_table"));
    }
}

function freeze_pane_listener(what_is_this, table_class) {
    return function () {
        let i;
        let translate_y = "translate(0," + what_is_this.scrollTop + "px)";
        let translate_x = "translate(" + what_is_this.scrollLeft + "px,0px)";
        let translate_xy = "translate(" + what_is_this.scrollLeft + "px," + what_is_this.scrollTop + "px)";

        let fixed_vertical_elts = document.getElementsByClassName(table_class + " freeze_vertical");
        let fixed_horizontal_elts = document.getElementsByClassName(table_class + " freeze_horizontal");
        let fixed_both_elts = document.getElementsByClassName(table_class + " freeze");

        for (i = 0; i < fixed_horizontal_elts.length; i++) {
            fixed_horizontal_elts[i].style.webkitTransform = translate_x;
            fixed_horizontal_elts[i].style.transform = translate_x;
        }

        for (i = 0; i < fixed_vertical_elts.length; i++) {
            fixed_vertical_elts[i].style.webkitTransform = translate_y;
            fixed_vertical_elts[i].style.transform = translate_y;
        }

        for (i = 0; i < fixed_both_elts.length; i++) {
            fixed_both_elts[i].style.webkitTransform = translate_xy;
            fixed_both_elts[i].style.transform = translate_xy;
        }
    }
}

function parent_id(wanted_node_name, elt) {
    let wanted_parent = parent_elt(wanted_node_name, elt);

    if ((wanted_parent === undefined) || (wanted_parent.nodeName === null)) {
        return "";
    } else {
        return wanted_parent.id;
    }
}

function parent_elt(wanted_node_name, elt) {
    let this_parent = elt.parentElement;
    if ((this_parent === undefined) || (this_parent.nodeName === null)) {
        return null;
    } else if (this_parent.nodeName === wanted_node_name) {
        return this_parent;
    } else {
        return parent_elt(wanted_node_name, this_parent);
    }
}