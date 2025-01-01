import axios from 'axios'
import { distance } from '../utils/distance.js'

export default async event => {
  // 判斷定位的縣市取得不同的API

  const cityUrls = {
    新北市: 'https://data.ntpc.gov.tw/api/datasets/010e5b15-3823-4b20-b401-b1cf000550c5/json?page=0&size=1000',
    台北市: 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json#',
    桃園市: 'https://opendata.tycg.gov.tw/api/v1/dataset.api_access?rid=a1b4714b-3b75-4ff8-a8f2-cc377e4eaa0f&format=json',
    新竹市: 'https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/59/5776ed30-fa3c-48f4-9876-d8fb28df0501.json',
    台中市: 'https://ybjson02.youbike.com.tw:60008/yb2/taichung/gwjs.json',
    高雄市: 'https://api.kcg.gov.tw/api/service/Get/b4dd9c40-9027-4125-8666-06bef1756092'
  }

  let uri = ''

  for (const city in cityUrls) {
    if (event.message.address.includes(city)) {
      uri = cityUrls[city]
      break
    }
  }

  if (!uri) {
    console.log('沒有取得YouBike API')
    return
  }

  try {
    const { data } = await axios.get(uri)
    let arr = data

    // 將各縣市API得到資料，透過map取得需要的資料，重新定義成統一 key
    if (event.message.address.includes('新北市')) {
      // 新北市api 一次只能取得1000筆，利用迴圈 動態方式改變API的路由參數
      let page = 1
      let hasMore = true

      while (hasMore) {
        try {
          uri = `https://data.ntpc.gov.tw/api/datasets/010e5b15-3823-4b20-b401-b1cf000550c5/json?page=${page}&size=1000`
          const { data } = await axios.get(uri)
          arr.push(...data)
          // 檢查是否還有更多資料
          hasMore = data.length > 0
          console.log(page, hasMore)
          page++
        } catch (error) {
          console.error('請求失敗:', error)
          hasMore = false
        }
      }

      arr = data.map(record => {
        return {
          sna: record.sna,
          total: record.tot,
          available_rent_bikes: record.sbi,
          sarea: record.sarea,
          latitude: record.lat,
          longitude: record.lng,
          ar: record.ar,
          available_return_bikes: record.bemp
        }
      })
      console.log(`新北市:${arr.length ? '有取得資料' : '未取得資料'}`)
    } else if (event.message.address.includes('桃園市')) {
      arr = data.map(record => {
        return {
          sna: record.sna,
          total: record.tot,
          available_rent_bikes: record.sbi,
          sarea: record.sarea,
          latitude: record.lat,
          longitude: record.lng,
          ar: record.ar,
          available_return_bikes: record.bemp
        }
      })
      console.log(`桃園市:${arr.length ? '有取得資料' : '未取得資料'}`)
    } else if (event.message.address.includes('新竹市')) {
      arr = data.map(record => {
        return {
          sna: record.站點名稱,
          latitude: record.緯度,
          longitude: record.經度,
          ar: record.站點位置
        }
      })
      console.log(`新竹市:${arr.length ? '有取得資料' : '未取得資料'}`)
    } else if (event.message.address.includes('台中市')) {
      arr = data.retVal.map(record => {
        return {
          sna: record.sna,
          sarea: record.sarea,
          ar: record.ar,
          total: record.tot,
          available_rent_bikes: record.sbi,
          latitude: record.lat,
          longitude: record.lng,
          available_return_bikes: record.bemp
        }
      })
      console.log(`台中市:${arr.length ? '有取得資料' : '未取得資料'}`)
    } else if (event.message.address.includes('高雄市')) {
      arr = data.data.retVal.map(record => {
        return {
          sna: record.sna,
          sarea: record.sarea,
          ar: record.ar,
          total: record.tot,
          available_rent_bikes: record.sbi,
          latitude: record.lat,
          longitude: record.lng,
          available_return_bikes: record.bemp
        }
      })
      console.log(`高雄市:${arr.length ? '有取得資料' : '未取得資料'}`)
    }

    // console.log(arr)
    // 訊息文字資料
    const youBikepoints = await arr.map(youbikepoint => {
      youbikepoint.distance = distance(youbikepoint.latitude, youbikepoint.longitude, event.message.latitude, event.message.longitude, 'K')
      return youbikepoint
    })
      .sort((a, b) => {
        return a.distance - b.distance
      })
      .slice(0, 2)
      .map(youbikepoint => {
        const text = `${youbikepoint.sna}\n地點:${youbikepoint.ar}\n總停車格:${youbikepoint.total || '未提供'}\n可借數量:${youbikepoint.available_rent_bikes || '未提供'}\n可還數量:${youbikepoint.available_return_bikes || '未提供'}`
        return text
      })

    // goolge地圖訊息資料
    const youBikeLoaction = await arr.map(youbikepoint => {
      youbikepoint.distance = distance(youbikepoint.latitude, youbikepoint.longitude, event.message.latitude, event.message.longitude, 'K')
      return youbikepoint
    })
      .sort((a, b) => {
        return a.distance - b.distance
      })
      .slice(0, 2)

    console.log(youBikeLoaction)
    // 儲存訊息的資料
    const message = []

    for (let i = 0; i < 2; i++) {
      message.push(
        {
          type: 'location',
          title: youBikeLoaction[i].sna,
          address: (youBikeLoaction[i].sarea ? youBikeLoaction[i].sarea : '') + youBikeLoaction[i].ar,
          latitude: parseFloat(youBikeLoaction[i].latitude),
          longitude: parseFloat(youBikeLoaction[i].longitude)
        },
        {
          type: 'text',
          text: youBikepoints[i].toString().replace(/\,/g, '\n\n')
        })
    }
    // 回覆line message
    const result = await event.reply(message)

    // console.log(result)
  } catch (error) {
    console.log(error)
  }
}
