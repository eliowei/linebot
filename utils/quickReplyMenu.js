export const createQuickReplyMenu = (items, type) => {
  const quickReplyItems = []
  if (type === 'weatherMenu') {
    quickReplyItems.push({
      type: 'action', // 3
      action: {
        type: 'location',
        label: '分享位置'
      }
    })
  }
  for (let i = 0; i < items.length; i++) {
    quickReplyItems.push({
      type: 'action',
      action: {
        type: 'message',
        label: items[i],
        text: items[i]
      }
    })
  }
  if (type === 'weatherMenu') {
    quickReplyItems.push({
      type: 'action', // 3
      action: {
        type: 'postback',
        label: '下一頁',
        data: 'weatherNextPage'
      }
    })
  } else if (type === 'weatherMenu2') {
    quickReplyItems.push({
      type: 'action',
      action: {
        type: 'postback',
        label: '上一頁',
        data: 'weatherPreviousPage'
      }
    })
  }
  return quickReplyItems
}
