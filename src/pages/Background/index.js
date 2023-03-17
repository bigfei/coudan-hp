chrome.runtime.onInstalled.addListener(async () => {
  chrome.action.setBadgeText({
    text: 'OFF',
  });

  console.log("background script...")
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            {
              header: 'origin',
              operation: 'set',
              value: cartUrl,
            },
            {
              header: 'referer',
              operation: 'set',
              value: cartUrl,
            },
          ],
        },
        condition: {
          urlFilter: '||api.m.jd.com',
          resourceTypes: ['xmlhttprequest'],
        },
      },
    ],
    removeRuleIds: [1],
  });
});

const cartUrl = 'https://cart.jd.com';

// When the user clicks on the extension action, if pop
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(cartUrl)) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
  }

});
