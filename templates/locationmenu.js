export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://github.com/eliowei/linebot/blob/main/src/assets/weather.png?raw=true',
      size: '3xl',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '選擇地區',
          weight: 'bold',
          size: 'xl'
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '北部',
            data: 'weatherCityNorth'
          },
          style: 'link',
          height: 'sm'
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '中部',
            data: 'weatherCityCentral'
          }
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '南部',
            data: 'weatherCitySouth'
          }
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '東部',
            data: 'weatherCityEast'
          }
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '離島',
            data: 'weatherCityIslands'
          }
        }
      ]
    }
  }
}
