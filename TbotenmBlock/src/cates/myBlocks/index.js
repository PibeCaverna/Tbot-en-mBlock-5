import blocks from './blocks.js';

const myBlocks = (facepanels) => ({
    "name": "myBlocks",
    "colors": [
        "#FF6680",
        "#FF4262",
        "#FF1F45"
    ],
    "menuIconURI": "",
    "blockIcon": null,
    "blocks": blocks(facepanels),
    "menus": {}
});

export default myBlocks;