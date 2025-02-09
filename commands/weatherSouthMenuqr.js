import Menu from '../templates/south.js'

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
