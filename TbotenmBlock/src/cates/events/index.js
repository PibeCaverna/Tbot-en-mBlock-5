import blocks from './blocks.js';

const events = (facepanels) => ({
    "name": "events",
    "colors": [
        "#FFBF00",
        "#E6AC00",
        "#CC9900"
    ],
    "menuIconURI": "",
    "blockIcon": null,
    "blocks": blocks(facepanels),
    "menus": {}
});

export default events;