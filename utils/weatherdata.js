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
  台東縣: 'F-D0047-037',
  臺東縣: 'F-D0047-037',
  花蓮縣: 'F-D0047-041',
  澎湖縣: 'F-D0047-045',
  基隆市: 'F-D0047-049',
  新竹市: 'F-D0047-053',
  嘉義市: 'F-D0047-057',
  台北市: 'F-D0047-061',
  臺北市: 'F-D0047-061',
  高雄市: 'F-D0047-065',
  新北市: 'F-D0047-069',
  台中市: 'F-D0047-073',
  臺中市: 'F-D0047-073',
  台南市: 'F-D0047-077',
  臺南市: 'F-D0047-077',
  連江縣: 'F-D0047-081',
  金門縣: 'F-D0047-085'
}
let cityName
let weatherdata
let state
export const checkWeatherList = (event) => {
  if (event === undefined) {
    cityName = undefined
    weatherdata = false
    return false
  }
  const keys = Object.keys(list).find(key => event.message.text === key)
  if (keys) {
    const newKeys = keys.replace('台', '臺')
    cityName = newKeys
    return cityName
  } else {
    cityName = undefined
    return false
  }
}

export const getCityName = () => {
  return cityName
}

export const setWeatherData = (type) => {
  if (type === true) {
    weatherdata = true
  } else if (type === false) {
    weatherdata = false
  }
  return weatherdata
}

export const getWeatherData = () => {
  return weatherdata
}

export const getWeatherState = () => {
  return state
}

export const setWeatherState = (type) => {
  if (type === true) {
    state = true
  } else if (type === false) {
    state = false
  }
  return state
}
