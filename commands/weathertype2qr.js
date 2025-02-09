export default async event => {
  try {
    event.reply({
      type: 'text', // 1
      text: '選擇要查看的天氣預報',
      quickReply: { // 2
        items: [
          {
            type: 'action',
            action: {
              type: 'postback',
              label: '現在、3小時',
              data: 'weatherNowDirectInput'
            }
          },
          {
            type: 'action',
            action: {
              type: 'postback',
              label: '未來3天',
              data: 'weatherDayDirectInput'
            }
          },
          {
            type: 'action',
            action: {
              type: 'postback',
              label: '未來1週',
              data: 'weatherWeekDirectInput'
            }
          }
        ]
      }
    })
  } catch (error) {
    console.log(error)
  }
}
