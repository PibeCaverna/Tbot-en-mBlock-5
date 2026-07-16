const blocks = (extFacePanels) => ([{
        "opcode": "data_changevariableby",
        "blockType": "command",
        "checkboxInFlyout": false,
        "gap": 12,
        "arguments": {
            "VARIABLE": {
                "type": "fieldVariable",
                "defaultValue": "",
                "menu": "DATA_CHANGEVARIABLEBY_VARIABLE"
            },
            "VALUE": {
                "type": "number",
                "defaultValue": 1
            }
        },
        "branchCount": 0,
        "codes": {
            "python": {
                "code": `set_variable('{VARIABLE}', get_variable('{VARIABLE}') + {VALUE})`
            }
        }
    },
    {
        "opcode": "data_setvariableto",
        "blockType": "command",
        "checkboxInFlyout": false,
        "gap": 12,
        "arguments": {
            "VARIABLE": {
                "type": "fieldVariable",
                "defaultValue": "",
                "menu": "DATA_CHANGEVARIABLEBY_VARIABLE"
            },
            "VALUE": {
                "type": "number",
                "defaultValue": 0
            }
        },
        "branchCount": 0,
        "codes": {
            "python": {
                "code": `set_variable('{VARIABLE}', {VALUE})`
            }
        }
    },
    {
        "opcode": "data_variable",
        "blockType": "number",
        "checkboxInFlyout": true,
        "gap": 12,
        "arguments": {
            "VARIABLE": {
                "type": "fieldVariable",
                "defaultValue": "",
                "menu": "DATA_CHANGEVARIABLEBY_VARIABLE"
            }
        },
        "branchCount": 0,
        "codes": {
            "python": {
                "code": this.funcs.dataVariableCodesCode
            }
        }
    }
]);

export default blocks;