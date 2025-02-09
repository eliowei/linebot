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
// YouBike
import commandYouBikeQR from './commands/youbikeqr.js'
// 天氣預報先選類型
import coomandWeatherTypeQR from './commands/weathertypeqr.js'
// 天氣預報先輸入地區
import coomandWeatherType2QR from './commands/weathertype2qr.js'
// 天氣預報地區
import coomandWeatherMenus from './commands/weatherLocationMeunuqr.js'
// 天氣預報北部
import coomandWeatherNorthMenuQR from './commands/weatherNorthMenuqr.js'
// 天氣預報中部
import coomandWeatherCentralMenuQR from './commands/weatherCentralMenuqr.js'
// 天氣預報南部
import coomandWeatherSouthMenuQR from './commands/weatherSouthMenuqr.js'
// 天氣預報東部
import coomandWeatherEastMenuQR from './commands/weatherEastMenuqr.js'
// 天氣預報離島
import coomandWeatherIslandsMenuQR from './commands/weatherIslandsMenuqr.js'

/* LineBot授權相關 */
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
/* message事件 */
bot.on('message', event => {
  // 設定天氣預報地區
  postbackWeather.checkWeatherList(event)

  // 判斷使用者輸入文字
  if (event.message.type === 'text') {
    if (event.message.text === '找YouBike') {
      commandYouBikeQR(event)
      postbackdata.setPostBackDate('Youbike')
    } else if (event.message.text === '天氣預報') {
      coomandWeatherTypeQR(event)
      postbackWeather.setWeatherData(true)
      postbackWeather.setWeatherState(false)
    } else if (event.message.text === '說明') {
      commandInfo(event)
      // 如果不是點擊天氣預報選單
    } else if (!postbackWeather.getWeatherData()) {
      // 取得使用者輸入的縣市名稱
      if (postbackWeather.getCityName()) {
        // 判斷是點擊選單還是直接輸入
        postbackWeather.setWeatherState(true)
        postbackWeather.setWeatherData(false)
      }
    }
    // 如果是直接輸入，並且不是點擊天氣預報選單
    if (postbackWeather.getWeatherState() && !postbackWeather.getWeatherData()) {
      coomandWeatherType2QR(event)
    }

    // 如有點天氣預報功能，則檢查是否有天氣預報選單點擊縣市資料，有則執行天氣預報功能
    if (postbackWeather.getWeatherData() && !postbackWeather.getWeatherState()) {
      if (postbackWeather.getCityName()) {
        commandWeather(event)
        postbackWeather.setWeatherData(false)
      } else {
        commandWeather(event)
      }
    }
    // 分享GPS定位，檢查postback資料是youbike還是天氣預報相關
  } else if (event.message.type === 'location') {
    if (postbackdata.getPostBackDate() === 'Youbike') {
      commandYouBike(event)
    } else if (
      postbackdata.getPostBackDate() === 'weatherNow' ||
      postbackdata.getPostBackDate() === 'weatherDay' ||
      postbackdata.getPostBackDate() === 'weatherWeek') {
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
    // 如果是點擊天氣預報選單
  } else if (
    postbackdata.getPostBackDate() === 'weatherNow' ||
    postbackdata.getPostBackDate() === 'weatherDay' ||
    postbackdata.getPostBackDate() === 'weatherWeek') {
    postbackdata.setPostBackWeatherType(postbackdata.getPostBackDate())
    coomandWeatherMenus(event)
    // 如果是直接輸入，並且不是點擊天氣預報選單
  } else if (postbackdata.getPostBackDate() === 'weatherNowDirectInput' ||
    postbackdata.getPostBackDate() === 'weatherDayDirectInput' ||
    postbackdata.getPostBackDate() === 'weatherWeekDirectInput') {
    postbackdata.setPostBackWeatherType(postbackdata.getPostBackDate())
    commandWeather(event)
    postbackWeather.setWeatherState(false)
    // 北部
  } else if (postbackdata.getPostBackDate() === 'weatherCityNorth') {
    coomandWeatherNorthMenuQR(event)
    // 中部
  } else if (postbackdata.getPostBackDate() === 'weatherCityCentral') {
    coomandWeatherCentralMenuQR(event)
    // 南部
  } else if (postbackdata.getPostBackDate() === 'weatherCitySouth') {
    coomandWeatherSouthMenuQR(event)
    // 東部
  } else if (postbackdata.getPostBackDate() === 'weatherCityEast') {
    coomandWeatherEastMenuQR(event)
    // 離島
  } else if (postbackdata.getPostBackDate() === 'weatherCityIslands') {
    coomandWeatherIslandsMenuQR(event)
  }
})
/* line機器人監聽  */
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
