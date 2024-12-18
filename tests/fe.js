import axios from 'axios';

(async (event) => {
  try {
    const { data } = await axios.get(
      'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json#'
    )
    const test = data.slice(0, 5).map((event) => {
      return event.sna
    })
    console.log(test.toString())
    console.log(data.length)
  } catch (error) {
    console.log(error)
  }
})()
