export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://github.com/eliowei/linebot/blob/main/src/assets/weather.png?raw=true',
      size: '3xl',
      aspectRatio: '20:13',
      aspectMode: 'cover',
      action: {
        type: 'uri',
        uri: 'https://line.me/'
      }
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '東部',
          weight: 'bold',
          size: 'xl',
          margin: 'none',
          align: 'center'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '澎湖縣',
            text: '澎湖縣'
          },
          height: 'sm'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '金門縣',
            text: '金門縣'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '連江縣',
            text: '連江縣'
          }
        }
      ]
    }
  }
}
