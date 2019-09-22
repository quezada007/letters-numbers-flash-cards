/**
 * Loop through a list of elements or nodes (NodeList) and call the callback function
 *
 * @param {object} nodeList The NodeList from the querySelectorAll
 * @param {function} cb The callback function passed
 */
export function each(nodeList, cb) {
    // Loop through all the nodes
    for (let i = 0; i < nodeList.length; i++) {
        // The callback function takes the node and the index of the node
        cb(nodeList[i], i);
    }
}

/**
 * Feature Sniffer
 *
 * It checks for features on the browsers
 */
export const featSniffer = {
    // Is it a touch device?
    touch: () => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
    // Is this IE 11?
    ie11: () => !!window.MSInputMethodContext && !!document.documentMode
};