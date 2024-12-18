import 'dotenv/config'
import linebot from 'linebot'
/* 功能 */
import commandYouBike from './commands/youBike.js'
import commandWeather from './commands/weather.js'
import commandInfo from './commands/info.js'
/* 全域資料 紀錄postback data與天氣預報相關資料 */
import * as postbackdata from './utils/postbackdata.js'
import * as postbackWeather from './utils/weatherdata.js'
/* quickReply */
import commandYouBikeQR from './commands/youbikeqr.js'
import coomandWeatherTypeQR from './commands/weathertypeqr.js'
import coomandWeatherMenuQR from './commands/weatherMenuqr.js'
import coomandWeatherMenu2QR from './commands/weatherMenu2qr.js'

/* LineBot授權相關 */
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
/* message事件 */
bot.on('message', event => {
  if (event.message.type === 'text') {
    if (event.message.text === '找YouBike') {
      commandYouBikeQR(event)
    } else if (event.message.text === '天氣預報') {
      coomandWeatherTypeQR(event)
      postbackWeather.setWeatherData(true)
    } else if (event.message.text === '說明') {
      commandInfo(event)
    }
    // 設定從天氣預報選單點擊的縣市資料
    postbackWeather.checkWeatherList(event)

    // 如有點天氣預報功能，則檢查是否有天氣預報選單點擊縣市資料，有則執行天氣預報功能
    if (postbackWeather.getWeatherData()) {
      if (postbackWeather.getCityName()) {
        commandWeather(event)
        postbackWeather.setWeatherData(false)
      }
    }
    // 分享GPS定位，檢查postback資料是youbike還是天氣預報相關
  } else if (event.message.type === 'location') {
    if (postbackdata.getPostBackDate() === 'Youbike') {
      commandYouBike(event)
    } else if (
      postbackdata.getPostBackDate() === 'weatherNow' ||
      postbackdata.getPostBackDate() === 'weatherDay' ||
      postbackdata.getPostBackDate() === 'weatherWeek' ||
      postbackdata.getPostBackDate() === 'weatherPreviousPage') {
      postbackWeather.checkWeatherList(undefined)
      commandWeather(event)
      postbackWeather.setWeatherData(false)
    }
  }
})
/* postback事件 */
bot.on('postback', event => {
  postbackdata.setPostBackDate(event.postback.data)
  if (postbackdata.getPostBackDate() === 'Youbike') {
    commandYouBikeQR(event)
  } else if (postbackdata.getPostBackDate() === 'Weather') {
    coomandWeatherTypeQR(event)
    postbackWeather.setWeatherData(true)
  } else if (
    postbackdata.getPostBackDate() === 'weatherNow' ||
    postbackdata.getPostBackDate() === 'weatherDay' ||
    postbackdata.getPostBackDate() === 'weatherWeek') {
    postbackdata.setPostBackWeatherType(postbackdata.getPostBackDate())
    coomandWeatherMenuQR(event)
  } else if (postbackdata.getPostBackDate() === 'weatherPreviousPage') {
    coomandWeatherMenuQR(event)
  } else if (postbackdata.getPostBackDate() === 'weatherNextPage') {
    coomandWeatherMenu2QR(event)
  }
  console.log(event)
})
/* line機器人監聽  */
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
