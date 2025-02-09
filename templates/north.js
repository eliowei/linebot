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
          text: '北部',
          weight: 'bold',
          size: 'xl',
          margin: 'none',
          align: 'center'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '基隆市',
            text: '基隆市'
          },
          height: 'sm'
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '臺北市',
            text: '臺北市'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '新北市',
            text: '新北市'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '桃園市',
            text: '桃園市'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '新竹市',
            text: '新竹市'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '新竹縣',
            text: '新竹縣'
          }
        },
        {
          type: 'button',
          action: {
            type: 'message',
            label: '宜蘭縣',
            text: '宜蘭縣'
          }
        }
      ]
    }
  }
}
