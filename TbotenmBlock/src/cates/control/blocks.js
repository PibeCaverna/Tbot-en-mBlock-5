const blocks = (extFacePanels) => ([{
    "opcode": "control_stop",
    "blockType": "command",
    "checkboxInFlyout": false,
    "gap": 12,
    "arguments": {
        "TYPE": {
            "type": "fieldMenu",
            "defaultValue": "all",
            "menu": "CONTROL_STOP_TYPE"
        }
    },
    "branchCount": 0
}]);

export default blocks;