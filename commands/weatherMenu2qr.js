import { createQuickReplyMenu } from '../utils/quickReplyMenu.js'

export default async event => {
  try {
    const list = {
      花蓮縣: 'F-D0047-041',
      澎湖縣: 'F-D0047-045',
      基隆市: 'F-D0047-049',
      新竹市: 'F-D0047-053',
      嘉義市: 'F-D0047-057',
      臺北市: 'F-D0047-061',
      高雄市: 'F-D0047-065',
      新北市: 'F-D0047-069',
      臺中市: 'F-D0047-073',
      臺南市: 'F-D0047-077',
      連江縣: 'F-D0047-081',
      金門縣: 'F-D0047-085'
    }

    const quickReplyMenu = createQuickReplyMenu(Object.keys(list), 'weatherMenu2')
    console.log(quickReplyMenu)
    event.reply({
      type: 'text',
      text: '選擇縣市',
      quickReply: {
        items: quickReplyMenu
      }
    })
  } catch (error) {
    console.log(error)
  }
}
