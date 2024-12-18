import axios from 'axios'
import dayjs from 'dayjs'
import 'dotenv/config'

import { getCityName } from '../utils/weatherdata.js'
import * as postbackdata from '../utils/postbackdata.js'

import template from '../templates/fe.js'
import fs from 'node:fs'

export default async event => {
  // 依照API列出天氣預報相關縣市對應的資料
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
    臺東縣: 'F-D0047-037',
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
  try {
    // console.log(getCityName())
    // console.log(event.message.address)

    // 開始與結束時間
    const timeFrom = encodeURIComponent(dayjs().format('YYYY-MM-DDTH:mm:ss'))
    const timeTo = encodeURIComponent(dayjs().add(3, 'hour').format('YYYY-MM-DDTH:mm:ss'))
    const showTimeTo = dayjs().add(3, 'hour').format('MM/DD h:mm A')
    const showTimeFrom = dayjs().format('MM/DD h:mm A')

    // console.log(timeFrom)
    // console.log(timeTo)

    // 宣告正列表達式
    const cityRegex = /(?:台灣)?([^\d一二三四五六七八九十]+(市|縣))/
    const districtRegex = /(市|縣)(\S+(區|鄉))/

    // 若是用GPS定位則需要使用正列表達式來提取
    const cityMatch = getCityName() ? getCityName() : event.message.address.match(cityRegex)
    const districtMatch = getCityName() ? null : event.message.address.match(districtRegex)

    // 提取縣市、區鄉名稱
    const matchedCity = cityMatch ? cityMatch[1] : null
    const machedDistrict = districtMatch ? districtMatch[2] : null

    // console.log('matchedCity', matchedCity)
    // console.log('machedDistrict', machedDistrict)

    // API
    const uri = getWeatherURI(timeFrom, timeTo, matchedCity, machedDistrict)
    const { data } = await axios.get(uri, {
      headers: { 'Accept-Language': 'zh-TW' }
    })

    // 天氣預報地區資料陣列
    const weatherLocation = data.records.Locations[0].Location

    // 目前的天氣預報模板
    const weatherTemplate = template()
    const message = []

    // console.log(postbackdata.getPostBackWeatherType())
    // console.log(weatherLocation)

    weatherLocation.forEach(location => {
      // 各地區的天氣資料
      const weatherElement = location.WeatherElement

      // isMatchingLocation -> 檢查縣市、區鄉 funciton
      // 如符合條件則會把天氣預報資料 push 到 message
      if (isMatchingLocation(location, matchedCity, machedDistrict)) {
        message.push({
          type: 'text',
          text: processWeatherData(
            postbackdata.getPostBackWeatherType(),
            weatherElement,
            weatherTemplate,
            showTimeFrom,
            showTimeTo,
            matchedCity,
            machedDistrict
          )
        })
      }
    })
    // 取得天氣預報API functioon
    function getWeatherURI(timeFrom, timeTo, matchedCity, matchedDistrict) {
      const baseURL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore'
      const type = postbackdata.getPostBackWeatherType()

      // 透過getCityName()判斷取得縣市的方式，true -> 代表選單選 false 代表GPS定位得到縣市
      const cityID = getCityName() ? '089' : '093'
      const locationParam = getCityName() ? getCityName() : list[matchedCity]

      // 判斷天氣預報的類型，weatherNow ->目前、weatherDay -> 3天、weatherWeek -> 1週
      if (type === 'weatherNow') {
        return `${baseURL}/F-D0047-${cityID}?Authorization=${process.env.WEATHER_TOKEN}&${getCityName() ? 'LocationName' : 'locationId'}=${locationParam}&timeFrom=${timeFrom}&timeTo=${timeTo}`
      } else if (type === 'weatherDay') {
        return `${baseURL}/F-D0047-089?Authorization=${process.env.WEATHER_TOKEN}&LocationName=${getCityName() ? getCityName() : matchedCity}`
      } else if (type === 'weatherWeek') {
        return `${baseURL}/F-D0047-091?Authorization=${process.env.WEATHER_TOKEN}&LocationName=${getCityName() ? getCityName() : matchedCity}`
      }
    }
    function isMatchingLocation(location, matchedCity, matchedDistrict) {
      const locationName = location.LocationName
      console.log('檢查 matching:', locationName, matchedCity, matchedDistrict)
      return (
        locationName === matchedDistrict ||
        locationName === getCityName() ||
        (['weatherDay', 'weatherWeek'].includes(postbackdata.getPostBackWeatherType()) &&
          locationName === matchedCity)
      )
    }
    // 判斷天氣預報的類型並執行相對應的function
    function processWeatherData(type, weatherElement, template, showTimeFrom, showTimeTo, matchedCity, matchedDistrict) {
      console.log('type值:', type)
      if (type === 'weatherNow') {
        updateWeatherTemplateNow(template, weatherElement, showTimeFrom, showTimeTo)
      } else {
        const info = generateWeatherInfo(type, weatherElement)
        return info
      }
    }
    // 目前的天氣預報 將資料上傳模塊
    function updateWeatherTemplateNow(template, weatherElement, showTimeFrom, showTimeTo) {
      // 模塊 -> 縣市區名稱
      template.hero.contents[0].contents[1].text = `${getCityName() ? getCityName() : matchedCity + machedDistrict}`
      // 模塊 -> 目前天氣狀況
      template.body.contents[2].contents[0].text = `${showTimeTo} 天氣狀況`
      weatherElement.forEach(element => {
        console.log(element)
        if (element.ElementName === '天氣現象') {
          // 模塊 -> 目前天氣現象、時間
          template.body.contents[1].contents[0].contents[0].text = `${element.Time[0].ElementValue[0].Weather}`
          template.body.contents[1].contents[0].contents[1].text = `${showTimeFrom}`
        } else if (element.ElementName === '溫度') {
          // 模塊 -> 目前溫度、字體顏色
          const temperature = element.Time[0].ElementValue[0].Temperature
          template.body.contents[0].contents[1].text = `${element.Time[0].ElementValue[0].Temperature}°C`
          template.body.contents[0].contents[1].color = getTemperatureColor(temperature)
        } else if (element.ElementName === '體感溫度') {
          // 模塊 -> 目前體感溫度、字體顏色
          const ApparentTemperature = element.Time[0].ElementValue[0].ApparentTemperature
          template.body.contents[1].contents[1].contents[1].text = `${element.Time[0].ElementValue[0].ApparentTemperature}°C`
          template.body.contents[1].contents[1].contents[0].color = getTemperatureColor(ApparentTemperature)
          template.body.contents[1].contents[1].contents[1].color = getTemperatureColor(ApparentTemperature)
        } else if (element.ElementName === '天氣預報綜合描述') {
          // 模塊 -> 3小時天氣預報綜合描述
          template.body.contents[3].contents[0].text = `${formatDescription(element.Time[0].ElementValue[0].WeatherDescription)}`
        }
      })
    }
    // 3天、1週天氣預報文字訊息
    function generateWeatherInfo(type, weatherElement) {
      let info = `${getCityName() ? getCityName() : matchedCity + machedDistrict} - ${type === 'weatherDay' ? '未來3天' : '未來1週'}天氣預報\n`

      weatherElement.forEach(element => {
        if (element.ElementName === '天氣預報綜合描述') {
          element.Time.forEach(time => {
            info += `${dayjs(time.StartTime).format('MM/DD h:mm A')} ~ ${dayjs(time.EndTime).format('MM/DD h:mm A')}\n`
            info += `${formatDescription(time.ElementValue[0].WeatherDescription)}\n\n`
          })
        }
      })
      return info
    }
    // 取得溫度顏色function
    function getTemperatureColor(temperature) {
      console.log(temperature)
      if (temperature > 30) {
        return '#FF5733' // 紅色 - 熱
      } else if (temperature >= 21 && temperature <= 30) {
        return '#FFA500' // 橘色 - 溫暖
      } else if (temperature >= 16 && temperature <= 20) {
        return '#30A6E6' // 藍色 - 涼爽
      } else {
        return '#00008B' // 深藍色 - 寒冷
      }
    }
    // 將取得的文字。替換成，以及最後為。
    function formatDescription(description) {
      return description.split('。').join('，').replace(/，(?!.*，)/, '。')
    }
    // 如果天氣預報類型是目前，則回覆flex message
    if (postbackdata.getPostBackWeatherType() === 'weatherNow') {
      const result = await event.reply({
        type: 'flex',
        altText: '目前天氣預報',
        contents: {
          type: 'carousel',
          contents: [weatherTemplate]
        }
      })
      // console.log(result)
      // 如果flex message模塊發生錯誤，有錯誤訊息，將寫入的模塊JSON格式產生在dump，方便後續排除問題
      if (process.env.DEBUG === 'true' && result.message) {
        fs.writeFileSync('./dump/weatherTemplate.json', JSON.stringify(weatherTemplate, null, 2))
      }
    } else if (postbackdata.getPostBackWeatherType() !== 'weatherNow') {
      // 回覆 message
      const result = await event.reply(message)
      // console.log(result)
    }
  } catch (error) {
    console.log(error)
    const message = []
    message.push({
      type: 'text',
      text: '地區有誤! 請再重新分享一次'
    })
    await event.reply(message)
  }
}
