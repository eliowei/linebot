export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'baseline',
          contents: [
            {
              type: 'icon',
              url: 'https://eliowei.github.io/test123/images/maps-and-flags.png'
            },
            {
              type: 'text',
              text: '台北市',
              flex: 0
            }
          ],
          margin: 'md',
          justifyContent: 'center'
        }
      ],
      paddingTop: 'sm'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'image',
              url: 'https://eliowei.github.io/test123/images/weathericons/2682850_weather_clouds_cloud_cloudy_forecast.png',
              size: 'xs',
              align: 'center',
              gravity: 'center'
            },
            {
              type: 'text',
              size: '4xl',
              text: '35°C',
              weight: 'bold',
              align: 'center',
              gravity: 'center',
              color: '#30A6E6'
            }
          ]
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: '多雲',
                  color: '#000000'
                },
                {
                  type: 'text',
                  text: '15:00預報',
                  color: '#AAAAAA'
                }
              ],
              flex: 1,
              alignItems: 'center'
            },
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: '體感溫度',
                  weight: 'bold',
                  size: 'sm',
                  flex: 0,
                  gravity: 'center',
                  color: '#30A6E6'
                },
                {
                  type: 'text',
                  text: '36°C',
                  size: 'xl',
                  flex: 0,
                  gravity: 'center',
                  color: '#30A6E6'
                }
              ],
              flex: 1,
              offsetStart: '15px'
            }
          ]
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'text',
              text: '12/17 13:00 天氣狀況',
              weight: 'bold',
              flex: 0
            }
          ],
          justifyContent: 'flex-end',
          margin: 'md'
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'text',
              text: '短暫雨，降雨機率60%，溫度攝氏16度，稍有寒意，偏西風，平均風速1-2級(每秒2公尺)，相對濕度93%',
              wrap: true,
              weight: 'bold',
              size: 'lg',
              align: 'start'
            }
          ],
          margin: 'md'
        }
      ],
      paddingTop: 'xs'
    }
  }
}
