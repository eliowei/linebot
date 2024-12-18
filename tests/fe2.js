import axios from 'axios'
import dayjs from 'dayjs'

(async () => {
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

    const weatherMessageCity = '桃園市'
    const weatherMessageTownship = '中壢區'
    // locationId=F-D0047-001,F-D0047-005'
    console.log(dayjs().format('YYYY-MM-DDTH:mm:ss'))
    const timeFrom = encodeURIComponent(dayjs().format('YYYY-MM-DDTHH:mm:ss'))
    const timeTo3 = encodeURIComponent(dayjs().add(3, 'hour').format('YYYY-MM-DDTHH:mm:ss'))
    console.log(timeFrom)

    const { data } = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=CWA-8B84CFE0-B7DB-4582-A0EB-3F117B500204&locationId=${list[weatherMessageCity]}&timeFrom=${timeFrom}&timeTo=${timeTo3}`)

    const weatherLocation1 = data.records.Locations[0].Location
    let weatherElementloop1

    const weatherSort = ['天氣現象', '溫度', '體感溫度', '相對濕度']
    const locations = data.records.Locations[0].Location
    let selector
    for (const location of locations) {
      selector = weatherSort.map(key => location.WeatherElement.find(item => item.ElementName === key))
        .filter(item => item !== undefined)

      console.log(selector[0].ElementName)
    }

    for (let i = 0; i < weatherLocation1.length; i++) {
      // console.log(uri.records.Locations[0].Location[i].LocationName)
      weatherElementloop1 = data.records.Locations[0].Location[i].WeatherElement
      let info = ''
      if (weatherLocation1[i].LocationName === weatherMessageTownship) {
        info += `${weatherLocation1[i].LocationName}，`
        for (let j = 0; j < weatherElementloop1.length; j++) {
          if (weatherElementloop1[j].ElementName === '天氣現象') {
            info += `「${weatherElementloop1[j].Time[0].ElementValue[0].Weather}」`
          } else if (weatherElementloop1[j].ElementName === '溫度') {
            info += `溫度:${weatherElementloop1[j].Time[0].ElementValue[0].Temperature}度，`
          } else if (weatherElementloop1[j].ElementName === '體感溫度') {
            info += `體感溫度:${weatherElementloop1[j].Time[0].ElementValue[0].ApparentTemperature}度，`
          } else if (weatherElementloop1[j].ElementName === '相對濕度') {
            info += `濕度:${weatherElementloop1[j].Time[0].ElementValue[0].RelativeHumidity}%`
          }
        }
        console.log(info)
      }
    }
  } catch (error) {
    console.log(error)
  }
})()
