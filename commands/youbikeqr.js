export default async event => {
  try {
    event.reply({
      type: 'text', // 1
      text: '目前提供新北市、台北市、桃園市地區\n\n請分享位置來查看離自己最近的2個YouBike地點',
      quickReply: { // 2
        items: [
          {
            type: 'action', // 3
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
