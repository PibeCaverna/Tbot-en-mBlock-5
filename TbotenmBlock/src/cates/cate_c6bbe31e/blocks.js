const blocks = (extFacePanels) => ([{
        "opcode": "pgm_init",
        "blockType": "hat",
        "checkboxInFlyout": false,
        "hidden": false,
        "gap": 12,
        "arguments": {},
        "branchCount": 0,
        "platform": [
            "mblockpc",
            "mblockweb"
        ],
        "handler": this.funcs.pgm_init
    },
    {
        "opcode": "ain_sensor",
        "blockType": "number",
        "checkboxInFlyout": false,
        "hidden": false,
        "gap": 12,
        "arguments": {
            "fieldMenu_1": {
                "type": "fieldMenu",
                "defaultValue": "0",
                "menu": "AIN_SENSOR_FIELDMENU_1"
            }
        },
        "branchCount": 0,
        "platform": [
            "mblockpc",
            "mblockweb"
        ],
        "handler": this.funcs.ain_sensor
    },
    {
        "opcode": "din_RUN",
        "blockType": "boolean",
        "checkboxInFlyout": false,
        "hidden": false,
        "gap": 12,
        "arguments": {},
        "branchCount": 0,
        "platform": [
            "mblockpc",
            "mblockweb"
        ],
        "handler": this.funcs.din_RUN
    },
    {
        "opcode": "pwm_motor",
        "blockType": "command",
        "checkboxInFlyout": false,
        "hidden": false,
        "gap": 12,
        "arguments": {
            "motor": {
                "type": "fieldMenu",
                "defaultValue": "0",
                "menu": "PWM_MOTOR_MOTOR"
            },
            "duty_cycle": {
                "type": "number",
                "defaultValue": 100
            }
        },
        "branchCount": 0,
        "platform": [
            "mblockpc",
            "mblockweb"
        ],
        "handler": this.funcs.pwm_motor
    },
    {
        "opcode": "dout_led",
        "blockType": "command",
        "checkboxInFlyout": false,
        "hidden": false,
        "gap": 12,
        "arguments": {
            "on_off": {
                "type": "fieldMenu",
                "defaultValue": "apagado",
                "menu": "DOUT_LED_ON_OFF"
            }
        },
        "branchCount": 0,
        "platform": [
            "mblockpc",
            "mblockweb"
        ],
        "handler": this.funcs.dout_led
    },
    {
        "opcode": "din_pb",
        "blockType": "command",
        "checkboxInFlyout": false,
        "hidden": false,
        "gap": 12,
        "arguments": {
            "dig_slct": {
                "type": "fieldMenu",
                "defaultValue": "9",
                "menu": "DIN_PB_DIG_SLCT"
            },
            "dig_status": {
                "type": "fieldMenu",
                "defaultValue": "Bajo",
                "menu": "DIN_PB_DIG_STATUS"
            }
        },
        "branchCount": 0,
        "platform": [
            "mblockpc",
            "mblockweb"
        ],
        "handler": this.funcs.din_pb
    },
    {
        "opcode": "dout_pb",
        "blockType": "boolean",
        "checkboxInFlyout": false,
        "hidden": false,
        "gap": 12,
        "arguments": {
            "dig_slct": {
                "type": "fieldMenu",
                "defaultValue": "9",
                "menu": "DIN_PB_DIG_SLCT"
            }
        },
        "branchCount": 0,
        "platform": [
            "mblockpc",
            "mblockweb"
        ],
        "handler": this.funcs.dout_pb
    }
]);

export default blocks;