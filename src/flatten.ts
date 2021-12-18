import data from './examinations.json'

const images: Array<any> = []
data.examinations.forEach((examination: any) => {
  examination.images.forEach((image: any) => {
    images.push({
      ...image,
      date: examination.date,
    })
  })
})
console.log(images)
