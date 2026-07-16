import blocks from './blocks.js';

const tbot = (facepanels) => ({
    "name": "tbot",
    "colors": [
        "#4A90E2",
        "#3080DE",
        "#2171CF"
    ],
    "menuIconURI": "",
    "blockIcon": null,
    "blocks": blocks(facepanels),
    "menus": {
        "AIN_SENSOR_FIELDMENU_1": [{
                "text": "AIN_SENSOR_FIELDMENU_1_0",
                "value": "0"
            },
            {
                "text": "AIN_SENSOR_FIELDMENU_1_1",
                "value": "1"
            },
            {
                "text": "AIN_SENSOR_FIELDMENU_1_2",
                "value": "2"
            },
            {
                "text": "AIN_SENSOR_FIELDMENU_1_3",
                "value": "3"
            },
            {
                "text": "AIN_SENSOR_FIELDMENU_1_4",
                "value": "4"
            },
            {
                "text": "AIN_SENSOR_FIELDMENU_1_5",
                "value": "5"
            }
        ],
        "PWM_MOTOR_MOTOR": [{
                "text": "PWM_MOTOR_MOTOR_0",
                "value": "0"
            },
            {
                "text": "PWM_MOTOR_MOTOR_1",
                "value": "1"
            }
        ],
        "DOUT_LED_ON_OFF": [{
                "text": "DOUT_LED_ON_OFF_0",
                "value": "encendidio"
            },
            {
                "text": "DOUT_LED_ON_OFF_1",
                "value": "apagado"
            }
        ],
        "DIN_PB_DIG_SLCT": [{
                "text": "DIN_PB_DIG_SLCT_0",
                "value": "9"
            },
            {
                "text": "DIN_PB_DIG_SLCT_1",
                "value": "10"
            },
            {
                "text": "DIN_PB_DIG_SLCT_2",
                "value": "11"
            },
            {
                "text": "DIN_PB_DIG_SLCT_3",
                "value": "12"
            }
        ],
        "DIN_PB_DIG_STATUS": [{
                "text": "DIN_PB_DIG_STATUS_0",
                "value": "Alto"
            },
            {
                "text": "DIN_PB_DIG_STATUS_1",
                "value": "Bajo"
            }
        ]
    }
});

export default tbot;
