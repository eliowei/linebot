import { createQuickReplyMenu } from '../utils/quickReplyMenu.js'

export default async event => {
  try {
    const list = {
      宜蘭縣: 'F-D0047-001',
      桃園市: 'F-D0047-005',
      新竹縣: 'F-D0047-009',
      苗栗縣: 'F-D0047-013',
      彰化縣: 'F-D0047-017',
      南投縣: 'F-D0047-021',
      雲林縣: 'F-D0047-025',
      嘉義縣: 'F-D0047-029',
      屏東縣: 'F-D0047-033',
      臺東縣: 'F-D0047-037'
    }
    const quickReplyMenu = createQuickReplyMenu(Object.keys(list), 'weatherMenu')
    console.log(quickReplyMenu)
    event.reply({
      type: 'text',
      text: '請分享位置或選擇縣市',
      quickReply: {
        items: quickReplyMenu
      }
    })
  } catch (error) {
    console.log(error)
  }
}
