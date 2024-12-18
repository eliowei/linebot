let postBackData
let postBackWeatherType

export const getPostBackDate = () => {
  return postBackData
}

export const setPostBackDate = (data) => {
  postBackData = data
  return postBackData
}

export const getPostBackWeatherType = () => {
  return postBackWeatherType
}

export const setPostBackWeatherType = (type) => {
  postBackWeatherType = type
  return postBackWeatherType
}
