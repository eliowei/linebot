import Menu from '../templates/north.js'

export default async event => {
  try {
    event.reply({
      type: 'flex',
      altText: '選擇地區',
      contents: {
        type: 'carousel',
        contents: [Menu()]
      }
    })
  } catch (error) {
    console.log(error)
  }
}
