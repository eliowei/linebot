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
          text: '南部',
          weight: 'bold',
          size: 'xl',
          margin: 'none',
          align: 'center'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '嘉義市',
            text: '嘉義市'
          },
          height: 'sm'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '嘉義縣',
            text: '嘉義縣'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '臺南市',
            text: '臺南市'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '高雄市',
            text: '高雄市'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '屏東縣',
            text: '屏東縣'
          }
        }
      ]
    }
  }
}
