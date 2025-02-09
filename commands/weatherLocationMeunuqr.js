import Menu from '../templates/locationmenu.js'

export default async event => {
  try {
    event.reply({
      type: 'flex',
      altText: '選擇地區',
      contents: {
        type: 'carousel',
        contents: [Menu()]
      },
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'location',
              label: '分享位置'
            }
          }
        ]
      }
    })
  } catch (error) {
    console.log(error)
  }
}
