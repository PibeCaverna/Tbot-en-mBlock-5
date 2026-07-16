const blocks = (extFacePanels) => ([{
        "opcode": "event_broadcastandwait",
        "blockType": "command",
        "checkboxInFlyout": false,
        "gap": 12,
        "arguments": {
            "BROADCAST_INPUT": {
                "type": "inputVariable"
            }
        },
        "branchCount": 0,
        "codes": {
            "python": {
                "code": `broadcast('{BROADCAST_INPUT}')`
            }
        }
    },
    {
        "opcode": "event_whenbroadcastreceived",
        "blockType": "hat",
        "checkboxInFlyout": false,
        "gap": 12,
        "arguments": {
            "BROADCAST_OPTION": {
                "type": "inputVariable"
            }
        },
        "branchCount": 0,
        "codes": {
            "python": {
                "code": `if message == \"{BROADCAST_OPTION}\":\n  {$BRANCH}`
            }
        }
    },
    {
        "opcode": "event_broadcast",
        "blockType": "command",
        "checkboxInFlyout": false,
        "gap": 12,
        "arguments": {
            "BROADCAST_INPUT": {
                "type": "inputVariable"
            }
        },
        "branchCount": 0,
        "codes": {
            "python": {
                "code": `broadcast('{BROADCAST_INPUT}')`
            }
        }
    }
]);

export default blocks;