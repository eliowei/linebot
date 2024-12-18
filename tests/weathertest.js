import axios from 'axios'
import dayjs from 'dayjs'
import { getCityName } from '../utils/weatherdata.js'
import template from '../templates/fe.js'
import fs from 'node:fs'

export default async event => {
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
    const timeFrom = encodeURIComponent(dayjs().format('YYYY-MM-DDTH:mm:ss'))
    const timeTo = encodeURIComponent(dayjs().add(3, 'hour').format('YYYY-MM-DDTH:mm:ss'))
    const showTimeTo = dayjs().add(3, 'hour').format('MM/DD h:mm A')
    const showTimeFrom = dayjs().format('MM/DD h:mm A')

    const cityRegex = /(?:台灣)?([^\d一二三四五六七八九十]+(市|縣))/ // 用來提取市
    const districtRegex = /(市|縣)(\S+(區|鄉))/ // 用來提取區
    const cityMatch = getCityName() ? getCityName() : event.message.address.match(cityRegex)
    const districtMatch = getCityName() ? null : event.message.address.match(districtRegex)
    const matchedCity = cityMatch ? cityMatch[1] : null // 提取市名稱
    const machedDistrict = districtMatch ? districtMatch[2] : null // 提取區名稱
    console.log(matchedCity)
    console.log(machedDistrict)
    let uri = ''

    uri = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-${getCityName() ? '089' : '093'}?Authorization=CWA-8B84CFE0-B7DB-4582-A0EB-3F117B500204&${getCityName() ? 'LocationName' : 'locationId'}=${getCityName() ? getCityName() : list[matchedCity]}&timeFrom=${timeFrom}&timeTo=${timeTo}`

    const { data } = await axios.get(uri)

    const weatherLocation = data.records.Locations[0].Location
    let weatherElementloop
    const t = template()

    for (let i = 0; i < weatherLocation.length; i++) {
      weatherElementloop = data.records.Locations[0].Location[i].WeatherElement
      if (weatherLocation[i].LocationName === machedDistrict || getCityName()) {
        t.hero.contents[0].contents[1].text = `${getCityName() ? getCityName() : event.message.address}`
        t.body.contents[1].contents[0].contents[1].text = `${showTimeFrom}`
        t.body.contents[2].contents[0].text = `${showTimeTo}天氣狀況`

        console.log(weatherElementloop.length)
        for (let j = 0; j < weatherElementloop.length; j++) {
          if (weatherElementloop[j].ElementName === '天氣現象') {
            t.body.contents[1].contents[0].contents[0].text = `${weatherElementloop[j].Time[0].ElementValue[0].Weather}`
          } else if (weatherElementloop[j].ElementName === '溫度') {
            t.body.contents[0].contents[1].text = `${weatherElementloop[j].Time[0].ElementValue[0].Temperature}°C`
            t.body.contents[0].contents[1].color = getTemperatureColor(weatherElementloop[j].Time[0].ElementValue[0].Temperature)
          } else if (weatherElementloop[j].ElementName === '體感溫度') {
            t.body.contents[1].contents[1].contents[1].text = `${weatherElementloop[j].Time[0].ElementValue[0].ApparentTemperature}°C`
            t.body.contents[1].contents[1].contents[0].color = getTemperatureColor(weatherElementloop[j].Time[0].ElementValue[0].ApparentTemperature)
            t.body.contents[1].contents[1].contents[1].color = getTemperatureColor(weatherElementloop[j].Time[0].ElementValue[0].ApparentTemperature)
          } else if (weatherElementloop[j].ElementName === '天氣預報綜合描述') {
            t.body.contents[3].contents[0].text = `${weatherElementloop[j].Time[0].ElementValue[0].WeatherDescription.split('。').join('，').replace(/，(?!.*，)/, '。')}`
          }
        }
      }
    }

    function getTemperatureColor(temperature) {
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

    const result = await event.reply({
      type: 'flex',
      altText: '目前天氣預報',
      contents: {
        type: 'carousel',
        contents: [t]
      }
    })
    console.log(result)

    if (process.env.DEBUG === 'true' && result.message) {
      fs.writeFileSync('./dump/twgod.json', JSON.stringify(t, null, 2))
    }
  } catch (error) {
    console.log(error)
  }
}
