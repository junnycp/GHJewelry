export function showTooltip(element) {
    let scroll_div = document.getElementById(element);
    if (scroll_div !== undefined && scroll_div !== null)
        scroll_div.style.display = "block";
}

export function hideTooltip(element) {
    let scroll_div = document.getElementById(element);
    if (scroll_div !== undefined && scroll_div !== null)
        scroll_div.style.display = "none";
}

