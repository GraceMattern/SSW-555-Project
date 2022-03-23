window.Actions = {
    //Items
    item_recoverStatus: {
      name: "Wreath",
      description: "This decoration item contains 1x Wheat.",
    //   targetType: "friendly",
      success: [
        { type: "textMessage", text: "You have used a {ACTION}!"},
      ]
    },
    items_recoverStatus: {
      name: "Herbal Sachet",
      description: "This decoration item contains 1x Sage, 1x Rosemary & 1x Mint.",
    //   targetType: "friendly",
      success: [
        { type:"textMessage", text: "You have used a {ACTION}!", },
      ]
    },
    item_recoverStatus: {
        name: "Fruit Bowl",
        description: "This decoration item contains 1x Apple & 1x Strawberry.",
        // targetType: "friendly",
        success: [
          { type: "textMessage", text: "You have used a {ACTION}!"},
        ]
    },
}