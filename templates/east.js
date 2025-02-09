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
            label: '花蓮縣',
            text: '花蓮縣'
          },
          height: 'sm'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '台東縣',
            text: '台東縣'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '臺東縣',
            text: '臺東縣'
          }
        }
      ]
    }
  }
}
