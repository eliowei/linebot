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
          text: '中部',
          weight: 'bold',
          size: 'xl',
          margin: 'none',
          align: 'center'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '苗栗縣',
            text: '苗栗縣'
          },
          height: 'sm'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '臺中市',
            text: '臺中市'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '彰化縣',
            text: '彰化縣'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '南投縣',
            text: '南投縣'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '雲林縣',
            text: '雲林縣'
          }
        }
      ]
    }
  }
}
