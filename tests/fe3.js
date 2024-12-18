import axios from 'axios'
import 'dotenv/config'

const linetype = 1
// 建立LINE圖文式選單
const LineRichmenuCrate = async event => {
  try {
    const { data } = await axios.post('https://api.line.me/v2/bot/richmenu', {
      size: {
        width: 2500,
        height: 843
      },
      selected: true,
      name: 'Menu about teaching',
      chatBarText: '操作說明',
      areas: [
        {
          bounds: {
            x: 0,
            y: 0,
            width: 833,
            height: 843
          },
          action: {
            type: 'postback',
            label: 'Youbike',
            data: 'Youbike'
          }
        },
        {
          bounds: {
            x: 834,
            y: 0,
            width: 833,
            height: 843
          },
          action: {
            type: 'message',
            label: '天氣預報',
            text: '規則: 2'
          }
        },
        {
          bounds: {
            x: 1667,
            y: 0,
            width: 834,
            height: 843
          },
          action: {
            type: 'message',
            label: '天氣預報',
            text: '規則: 2'
          }
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
      }
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

if (linetype === 1) {
  LineRichmenuCrate()
}
