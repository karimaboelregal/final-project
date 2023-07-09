import { fetchPosts } from '../store/reducer/boardsSlice';
import fetch from 'jest-fetch-mock';


const resp = {
    "id": "64aa7990f61513cf4e86a1f1",
    "nodeId": "ari:cloud:trello::board/workspace/64a547189e274d1aaa53b390/64aa7990f61513cf4e86a1f1",
    "name": "asd",
    "desc": "",
    "descData": null,
    "closed": false,
    "dateClosed": null,
    "idOrganization": "64a547189e274d1aaa53b390",
    "idEnterprise": null,
    "limits": {
        "attachments": {
            "perBoard": {
                "status": "ok",
                "disableAt": 36000,
                "warnAt": 28800
            },
            "perCard": {
                "status": "ok",
                "disableAt": 1000,
                "warnAt": 800
            }
        },
        "boards": {
            "totalMembersPerBoard": {
                "status": "ok",
                "disableAt": 1600,
                "warnAt": 1280
            },
            "totalAccessRequestsPerBoard": {
                "status": "ok",
                "disableAt": 4000,
                "warnAt": 3200
            }
        },
        "cards": {
            "openPerBoard": {
                "status": "ok",
                "disableAt": 5000,
                "warnAt": 4000
            },
            "openPerList": {
                "status": "ok",
                "disableAt": 5000,
                "warnAt": 4000
            },
            "totalPerBoard": {
                "status": "ok",
                "disableAt": 2000000,
                "warnAt": 1600000
            },
            "totalPerList": {
                "status": "ok",
                "disableAt": 1000000,
                "warnAt": 800000
            }
        },
        "checklists": {
            "perBoard": {
                "status": "ok",
                "disableAt": 1800000,
                "warnAt": 1440000
            },
            "perCard": {
                "status": "ok",
                "disableAt": 500,
                "warnAt": 400
            }
        },
        "checkItems": {
            "perChecklist": {
                "status": "ok",
                "disableAt": 200,
                "warnAt": 160
            }
        },
        "customFields": {
            "perBoard": {
                "status": "ok",
                "disableAt": 50,
                "warnAt": 40
            }
        },
        "customFieldOptions": {
            "perField": {
                "status": "ok",
                "disableAt": 50,
                "warnAt": 40
            }
        },
        "labels": {
            "perBoard": {
                "status": "ok",
                "disableAt": 1000,
                "warnAt": 800
            }
        },
        "lists": {
            "openPerBoard": {
                "status": "ok",
                "disableAt": 500,
                "warnAt": 400
            },
            "totalPerBoard": {
                "status": "ok",
                "disableAt": 3000,
                "warnAt": 2400
            }
        },
        "stickers": {
            "perCard": {
                "status": "ok",
                "disableAt": 70,
                "warnAt": 56
            }
        },
        "reactions": {
            "perAction": {
                "status": "ok",
                "disableAt": 900,
                "warnAt": 720
            },
            "uniquePerAction": {
                "status": "ok",
                "disableAt": 17,
                "warnAt": 14
            }
        }
    },
    "pinned": false,
    "starred": false,
    "url": "https://trello.com/b/wE2wRmGK/asd",
    "prefs": {
        "permissionLevel": "private",
        "hideVotes": false,
        "voting": "disabled",
        "comments": "members",
        "invitations": "members",
        "selfJoin": true,
        "cardCovers": true,
        "isTemplate": false,
        "cardAging": "regular",
        "calendarFeedEnabled": false,
        "hiddenPluginBoardButtons": [],
        "switcherViews": [
            {
                "viewType": "Board",
                "enabled": true,
                "_id": "64aa7990f61513cf4e86a1f2",
                "typeName": "SwitcherViews",
                "id": "64aa7990f61513cf4e86a1f2"
            },
            {
                "viewType": "Table",
                "enabled": true,
                "_id": "64aa7990f61513cf4e86a1f3",
                "typeName": "SwitcherViews",
                "id": "64aa7990f61513cf4e86a1f3"
            },
            {
                "viewType": "Calendar",
                "enabled": false,
                "_id": "64aa7990f61513cf4e86a1f4",
                "typeName": "SwitcherViews",
                "id": "64aa7990f61513cf4e86a1f4"
            },
            {
                "viewType": "Dashboard",
                "enabled": false,
                "_id": "64aa7990f61513cf4e86a1f5",
                "typeName": "SwitcherViews",
                "id": "64aa7990f61513cf4e86a1f5"
            },
            {
                "viewType": "Timeline",
                "enabled": false,
                "_id": "64aa7990f61513cf4e86a1f6",
                "typeName": "SwitcherViews",
                "id": "64aa7990f61513cf4e86a1f6"
            },
            {
                "viewType": "Map",
                "enabled": false,
                "_id": "64aa7990f61513cf4e86a1f7",
                "typeName": "SwitcherViews",
                "id": "64aa7990f61513cf4e86a1f7"
            }
        ],
        "background": "blue",
        "backgroundColor": "#0079BF",
        "backgroundImage": null,
        "backgroundImageScaled": null,
        "backgroundTile": false,
        "backgroundBrightness": "dark",
        "backgroundBottomColor": "#0079BF",
        "backgroundTopColor": "#0079BF",
        "canBePublic": true,
        "canBeEnterprise": true,
        "canBeOrg": true,
        "canBePrivate": true,
        "canInvite": true
    },
    "shortLink": "wE2wRmGK",
    "subscribed": false,
    "labelNames": {
        "green": "",
        "yellow": "",
        "orange": "",
        "red": "",
        "purple": "",
        "blue": "",
        "sky": "",
        "lime": "",
        "pink": "",
        "black": "",
        "green_dark": "",
        "yellow_dark": "",
        "orange_dark": "",
        "red_dark": "",
        "purple_dark": "",
        "blue_dark": "",
        "sky_dark": "",
        "lime_dark": "",
        "pink_dark": "",
        "black_dark": "",
        "green_light": "",
        "yellow_light": "",
        "orange_light": "",
        "red_light": "",
        "purple_light": "",
        "blue_light": "",
        "sky_light": "",
        "lime_light": "",
        "pink_light": "",
        "black_light": ""
    },
    "powerUps": [],
    "dateLastActivity": "2023-07-09T12:20:52.932Z",
    "dateLastView": "2023-07-09T12:20:52.990Z",
    "shortUrl": "https://trello.com/b/wE2wRmGK",
    "idTags": [],
    "datePluginDisable": null,
    "creationMethod": null,
    "ixUpdate": "28",
    "templateGallery": null,
    "enterpriseOwned": false,
    "idBoardSource": null,
    "premiumFeatures": [
        "additionalBoardBackgrounds",
        "additionalStickers",
        "customBoardBackgrounds",
        "customEmoji",
        "customStickers",
        "plugins"
    ],
    "idMemberCreator": "64a544b6afc7ad03a59af900",
    "memberships": [
        {
            "idMember": "64a544b6afc7ad03a59af900",
            "memberType": "admin",
            "unconfirmed": false,
            "deactivated": false,
            "id": "64aa7990f61513cf4e86a1f9"
        }
    ]
}


let fetchMock = fetch.mockResponse(JSON.stringify([resp]), { status: 200 });

describe('board/fetchBoards', () => {

    afterEach(() => {
        fetchMock.mockClear();
        fetchMock = fetch.mockResponse(JSON.stringify([resp]), { status: 200 });
    });

    describe('thunks', () => {
        describe('searchCalendarEvents', () => {
            it('calls the correct api', async () => {
                const dispatch = jest.fn();
                const getState = jest.fn().mockReturnValue({});
                const action = fetchPosts();

                await action(dispatch, getState, undefined);

                expect(fetchMock).toHaveBeenCalledWith('https://api.trello.com/1/members/me/boards?key=e42590f8c9dc4f3d2e14f9e37b8aa2ea&token=ATTAfe027f95da0871424eb852537f602f14d66ee8f75073c9b434a57ec3499ae250B6D1C411');
            });
        });
    });
});