var adfoxBiddersMap = {
    "betweenDigital": "957893",
    "myTarget": "952961",
    "getintent": "1048899",
    "criteo": "1016557",
    "rtbhouse": "1019105",
    "alfasense": "1056746"
};
var adUnits = [
    {
        "code": "adfox_155662651194132255",
        "bids": [
            {
                "bidder": "betweenDigital",
                "params": {
                    "placementId": "3078137"
                }
            },
            {
                "bidder": "myTarget",
                "params": {
                    "placementId": "625544"
                }
            },
            {
                "bidder": "getintent",
                "params": {
                    "placementId": "81_MF_primpress.ru_D_240x400"
                }
            },
            {
                "bidder": "criteo",
                "params": {
                    "placementId": "1410334"
                }
            },
            {
                "bidder": "rtbhouse",
                "params": {
                    "placementId": "5biOnixFJTsoBSaqss2x"
                }
            },
            {
                "bidder": "alfasense",
                "params": {
                    "placementId": "473"
                }
            }
        ],
        "sizes": [
            [
                240,
                400
            ]
        ]
    },
    {
        "code": "adfox_156153095098294921",
        "bids": [
            {
                "bidder": "betweenDigital",
                "params": {
                    "placementId": "3189696"
                }
            },
            {
                "bidder": "myTarget",
                "params": {
                    "placementId": "627566"
                }
            },
			{
                "bidder": "criteo",
                "params": {
                    "placementId": "1434116"
                }
            },
            {
                "bidder": "getintent",
                "params": {
                    "placementId": "81_MF_primpress.ru_M_320x100"
                }
            },
            {
                "bidder": "alfasense",
                "params": {
                    "placementId": "475"
                }
            }
        ],
        "sizes": [
            [
                320,
                100
            ]
        ]
    },
    {
        "code": "adfox_156144531962748036",
        "bids": [
            {
                "bidder": "betweenDigital",
                "params": {
                    "placementId": "3189695"
                }
            },
            {
                "bidder": "myTarget",
                "params": {
                    "placementId": "627568"
                }
            },
			{
                "bidder": "criteo",
                "params": {
                    "placementId": "1434114"
                }
            },
            {
                "bidder": "getintent",
                "params": {
                    "placementId": "81_MF_primpress.ru_D_728x90"
                }
            },
            {
                "bidder": "alfasense",
                "params": {
                    "placementId": "474"
                }
            }
        ],
        "sizes": [
            [
                728,
                90
            ]
        ]
    }
];
var userTimeout = 800;
window.YaHeaderBiddingSettings = {
    biddersMap: adfoxBiddersMap,
    adUnits: adUnits,
    timeout: userTimeout
};