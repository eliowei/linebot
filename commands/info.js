export default async event => {
  try {
    event.reply({
      type: 'text',
      text:
        `說明:
功能選單可以查詢離自己最近的2個YouBike地點及目前跟3小時、未來3天(每3小時)、未來1週的天氣預報
或輸入找YouBike、天氣預報`
    })
  } catch (error) {
    console.log(error)
  }
}
