import cate_c6bbe31e from './cate_c6bbe31e/index.js';
import events from './events/index.js';
import control from './control/index.js';
import operators from './operators/index.js';
import data from './data/index.js';
import myBlocks from './myBlocks/index.js';

const cates = (facepanels) => ([
    cate_c6bbe31e(facepanels), events(facepanels), control(facepanels), operators(facepanels), data(facepanels), myBlocks(facepanels)
]);

export default cates;