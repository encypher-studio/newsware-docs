
    const schema = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "Newsware Websocket API",
    "version": "3.0.0",
    "description": "Subscribe to real-time news.\n"
  },
  "servers": {
    "public": {
      "host": "api.newsware.com",
      "pathname": "/ws/v3?apikey={apikey}",
      "protocol": "wss",
      "variables": {
        "apikey": {
          "description": "Apikey assigned to the user by Newsware"
        }
      }
    }
  },
  "channels": {
    "communication": {
      "title": "Communication channel",
      "servers": [
        "$ref:$.servers.public"
      ],
      "messages": {
        "SubscribeRequest": {
          "payload": {
            "type": "object",
            "properties": {
              "method": {
                "description": "Type of request\n",
                "example": "subscribe",
                "type": "string",
                "const": "subscribe",
                "x-parser-schema-id": "<anonymous-schema-2>"
              },
              "id": {
                "description": "Id to identify subscription, the server messages related to this subscription will have the same id\n",
                "example": "4d921aca-6117-46eb-88ed-1cd9284dbb80",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-3>"
              },
              "value": {
                "type": "object",
                "properties": {
                  "fields": {
                    "description": "News fields to retrieve. Id is always added to all news items.",
                    "type": "array",
                    "items": {
                      "type": "string",
                      "enum": [
                        "headline",
                        "body",
                        "tickers",
                        "source",
                        "publicationTime",
                        "receivedTime",
                        "categoryCodes",
                        "industryCodes",
                        "regionCodes",
                        "ciks",
                        "link"
                      ],
                      "x-parser-schema-id": "Field"
                    },
                    "examples": [
                      [
                        "body",
                        "headline"
                      ]
                    ],
                    "x-parser-schema-id": "<anonymous-schema-4>"
                  },
                  "filter": {
                    "type": "string",
                    "description": "A query using our query language: https://docs.newsware.com/query-language\n",
                    "x-parser-schema-id": "<anonymous-schema-5>"
                  }
                },
                "x-parser-schema-id": "SubscribeRequestValue"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-1>"
          },
          "x-parser-unique-object-id": "SubscribeRequest",
          "x-parser-message-name": "SubscribeRequest"
        },
        "UnsubscribeRequest": {
          "payload": {
            "type": "object",
            "properties": {
              "method": {
                "description": "Type of request\n",
                "example": "unsubscribe",
                "type": "string",
                "const": "unsubscribe",
                "x-parser-schema-id": "<anonymous-schema-7>"
              },
              "id": {
                "description": "Id to identify the unsubscribe request\n",
                "example": "d0df9941-dd7b-4b8c-8aa9-64367417a90c",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-8>"
              },
              "value": {
                "type": "object",
                "properties": {
                  "subscriptionId": {
                    "type": "string",
                    "description": "Subscription id, it's the id used when creating the subscription",
                    "example": "4d921aca-6117-46eb-88ed-1cd9284dbb80",
                    "x-parser-schema-id": "<anonymous-schema-10>"
                  },
                  "all": {
                    "type": "boolean",
                    "description": "If true, all subscriptions are removed",
                    "example": false,
                    "x-parser-schema-id": "<anonymous-schema-11>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-9>"
              }
            },
            "x-parser-schema-id": "<anonymous-schema-6>"
          },
          "x-parser-unique-object-id": "UnsubscribeRequest",
          "x-parser-message-name": "UnsubscribeRequest"
        }
      },
      "x-parser-unique-object-id": "communication"
    }
  },
  "operations": {
    "subscribe": {
      "title": "Sbuscribe",
      "summary": "Create a news subscription",
      "action": "send",
      "channel": "$ref:$.channels.communication",
      "description": "Replies \"ok\" when subscription is created, \"data\" when new data is available, and \"error\" when an error occurred\nwith the subscription.\n",
      "messages": [
        "$ref:$.channels.communication.messages.SubscribeRequest"
      ],
      "reply": {
        "channel": "$ref:$.channels.communication",
        "messages": [
          {
            "payload": {
              "type": "object",
              "description": "Sends news from a subscription",
              "properties": {
                "method": {
                  "type": "string",
                  "const": "subscribe",
                  "x-parser-schema-id": "<anonymous-schema-23>"
                },
                "type": {
                  "type": "string",
                  "const": "data",
                  "x-parser-schema-id": "<anonymous-schema-24>"
                },
                "id": {
                  "type": "string",
                  "description": "Id used when requesting the subscription",
                  "example": "4d921aca-6117-46eb-88ed-1cd9284dbb80",
                  "x-parser-schema-id": "<anonymous-schema-25>"
                },
                "value": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "description": "News id\n",
                      "example": "2baf1f40105d9501fe319a8ec463fdf4325a2a5df445adf3f572f626253678c9",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-26>"
                    },
                    "headline": {
                      "description": "Headline of the news",
                      "example": "Press Release: Capgemini to acquire FCC division of Exiger, to expand its Financial Crime Compliance advisory, analytics and managed services capabilities\n",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-27>"
                    },
                    "body": {
                      "description": "Body of the news",
                      "example": "<?DOCTYPE html?><html><head><title>Press Release: Capgemini to acquire FCC division of Exiger, to expand its Financial Crime Compliance advisory, analytics and managed services capabilities</title></head><body><div><h1>Press Release: Capgemini to acquire FCC division of Exiger, to expand its Financial Crime Compliance advisory, analytics and managed services capabilities</h1><p class=\"newswire-article-time\">September 8, 2023 06:30:00 UTC</p></div><div><div><p>Media relations:</p><p>Sam Connatty</p><p>Tel.: +44 (0)370 904 3601</p><p>https://www.globenewswire.com/Tracker?data=gC9eNIS97ojwrII3F5DBubYJmHo0vP3wqy-iWwztFoC3nohKKt4LXYYMd2AGicdR-2T8Vfm7AdAukinHOOXjIcIOV0m3OyMCr3hrdS8_VY9YvCf11Dce8th5an6-2C-g sam.connatty@capgemini.com</p><p>Investor relations:</p><p>Vincent Biraud</p><p>Tel.: +33 1 47 54 50 87</p> With its strong 55-year heritage and deep industry expertise, Capgemini is trusted by its clients to address the entire breadth of their business needs, from strategy and design to operations, fueled by the fast evolving and innovative world of cloud, data, AI, connectivity, software, digital engineering and platforms. The Group reported in 2022 global revenues of EUR22 billion.</p><p>Get The Future You Want | www.capgemini.com</p><p>Attachment</p><pre>-- 09_08_Capgemini to acquire FCC division of Exiger &#xA;      https://ml-eu.globenewswire.com/Resource/Download/718ae574-00df-4c2a-90e4-e8b4a0268867</pre><p>(END) Dow Jones Newswires</p><p>September 08, 2023 02:30 ET (06:30 GMT)</p></div></div><div><div><strong>s.DJ CAP.FR CGEMY</strong></div><div><strong>Article id:  | Exchange:  | Region:</strong></div><div><strong>Industry Codes:  | Category Codes:</strong></div></div></body></html>\n",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-28>"
                    },
                    "tickers": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-30>"
                      },
                      "description": "A list of tickers related to the news",
                      "example": [
                        "APPL",
                        "HSBC"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-29>"
                    },
                    "source": {
                      "type": "string",
                      "enum": [
                        "DJ",
                        "AR",
                        "PZ",
                        "PN",
                        "BW",
                        "SEC",
                        "HS"
                      ],
                      "x-parser-schema-id": "Source"
                    },
                    "publicationTime": {
                      "type": "string",
                      "description": "Time of publication",
                      "example": "2023-09-12T03:30:00Z",
                      "x-parser-schema-id": "<anonymous-schema-31>"
                    },
                    "receivedTime": {
                      "type": "string",
                      "description": "Time the news was received by Newsware",
                      "example": "2023-09-12T03:30:02.192731316Z",
                      "x-parser-schema-id": "<anonymous-schema-32>"
                    },
                    "creationTime": {
                      "type": "string",
                      "description": "Time the news was indexed into the Newsware database",
                      "example": "2023-09-12T03:30:02.351817973Z",
                      "x-parser-schema-id": "<anonymous-schema-33>"
                    },
                    "ciks": {
                      "type": "array",
                      "items": {
                        "type": "integer",
                        "x-parser-schema-id": "<anonymous-schema-35>"
                      },
                      "description": "(Only valid for SEC filings) CIKs associated to the SEC filing",
                      "example": [
                        1375793,
                        1692705
                      ],
                      "x-parser-schema-id": "<anonymous-schema-34>"
                    },
                    "link": {
                      "type": "string",
                      "description": "(Only valid for SEC filings) Official SEC link to filing",
                      "example": "https://www.sec.gov/Archives/edgar/data/1692705/000110465923099095/0001104659-23-099095-index.htm",
                      "x-parser-schema-id": "<anonymous-schema-36>"
                    },
                    "categoryCodes": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-38>"
                      },
                      "description": "A set of category codes assigned by the news sources",
                      "example": [
                        "ma"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-37>"
                    },
                    "industryCodes": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-40>"
                      },
                      "description": "A set of industry codes assigned by the news sources",
                      "example": [
                        "finance"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-39>"
                    },
                    "regionCodes": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-42>"
                      },
                      "description": "A set of region codes assigned by the news sources",
                      "example": [
                        "finland"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-41>"
                    }
                  },
                  "x-parser-schema-id": "News"
                }
              },
              "x-parser-schema-id": "<anonymous-schema-22>"
            },
            "x-parser-unique-object-id": "ResponseSubscriptionData",
            "x-parser-message-name": "ResponseSubscriptionData"
          },
          {
            "payload": {
              "type": "object",
              "description": "Sent to acknowledge a request",
              "properties": {
                "method": {
                  "type": "string",
                  "description": "The method used in the request",
                  "x-parser-schema-id": "<anonymous-schema-13>"
                },
                "id": {
                  "type": "string",
                  "description": "The id used in the request",
                  "example": "4d921aca-6117-46eb-88ed-1cd9284dbb80",
                  "x-parser-schema-id": "<anonymous-schema-14>"
                },
                "type": {
                  "type": "string",
                  "const": "ok",
                  "x-parser-schema-id": "<anonymous-schema-15>"
                }
              },
              "x-parser-schema-id": "<anonymous-schema-12>"
            },
            "x-parser-unique-object-id": "ResponseOk",
            "x-parser-message-name": "ResponseOk"
          },
          {
            "payload": {
              "type": "object",
              "description": "Sent to report an error in the request",
              "properties": {
                "method": {
                  "type": "string",
                  "description": "The method used in the request",
                  "x-parser-schema-id": "<anonymous-schema-17>"
                },
                "id": {
                  "type": "string",
                  "description": "The id used in the request",
                  "example": "4d921aca-6117-46eb-88ed-1cd9284dbb80",
                  "x-parser-schema-id": "<anonymous-schema-18>"
                },
                "type": {
                  "type": "string",
                  "const": "error",
                  "x-parser-schema-id": "<anonymous-schema-19>"
                },
                "value": {
                  "type": "object",
                  "description": "Contains the error",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "The error message",
                      "x-parser-schema-id": "<anonymous-schema-21>"
                    }
                  },
                  "x-parser-schema-id": "<anonymous-schema-20>"
                }
              },
              "x-parser-schema-id": "<anonymous-schema-16>"
            },
            "x-parser-unique-object-id": "ResponseError",
            "x-parser-message-name": "ResponseError"
          }
        ]
      },
      "x-parser-unique-object-id": "subscribe"
    },
    "unsubscribe": {
      "title": "Unsubscribe",
      "summary": "Unsubscribe from one or all news subscriptions",
      "action": "send",
      "channel": "$ref:$.channels.communication",
      "description": "Replies \"ok\" when the subscription is removed and \"error\" to report any errors while unsubscribing.\n",
      "messages": [
        "$ref:$.channels.communication.messages.UnsubscribeRequest"
      ],
      "reply": {
        "channel": "$ref:$.channels.communication",
        "messages": [
          "$ref:$.operations.subscribe.reply.messages[1]",
          "$ref:$.operations.subscribe.reply.messages[2]"
        ]
      },
      "x-parser-unique-object-id": "unsubscribe"
    }
  },
  "components": {
    "messages": {
      "SubscribeRequest": "$ref:$.channels.communication.messages.SubscribeRequest",
      "UnsubscribeRequest": "$ref:$.channels.communication.messages.UnsubscribeRequest",
      "ResponseOk": "$ref:$.operations.subscribe.reply.messages[1]",
      "ResponseError": "$ref:$.operations.subscribe.reply.messages[2]",
      "ResponseSubscriptionData": "$ref:$.operations.subscribe.reply.messages[0]"
    },
    "schemas": {
      "SubscribeRequestValue": "$ref:$.channels.communication.messages.SubscribeRequest.payload.properties.value",
      "News": "$ref:$.operations.subscribe.reply.messages[0].payload.properties.value",
      "Source": "$ref:$.operations.subscribe.reply.messages[0].payload.properties.value.properties.source",
      "ActionType": {
        "type": "string",
        "enum": [
          "any",
          "all",
          "exclude"
        ],
        "x-parser-schema-id": "ActionType"
      },
      "Field": "$ref:$.channels.communication.messages.SubscribeRequest.payload.properties.value.properties.fields.items"
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":true},"sidebar":{"showOperations":"byDefault"}};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  