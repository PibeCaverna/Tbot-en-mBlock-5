import blocks from './blocks.js';

const operators = (facepanels) => ({
    "name": "operators",
    "colors": [
        "#59C059",
        "#46B746",
        "#3EA33E"
    ],
    "menuIconURI": "",
    "blockIcon": null,
    "blocks": blocks(facepanels),
    "menus": {}
});

export default operators;