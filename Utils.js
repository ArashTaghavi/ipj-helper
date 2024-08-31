import crypto from "crypto-js"
import moment from "moment-jalaali"

export const mimeTypes = [
    { id: 'image/jpeg', name: 'تصویر JPG' },
    { id: 'image/jpg', name: 'تصویر JPG' },
    { id: 'image/png', name: 'تصویر PNG' },
    { id: 'application/pdf', name: 'پرونده PDF' },
    { id: 'application/octet-stream', name: 'پرونده PDF' },
    { id: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', name: 'پرونده WORD' },
    { id: 'application/msword', name: 'پرونده WORD' }
]


export const getRandomNumber = () => {
    return `${Math.round(Math.random() * (999999 - 111111) + 111111)}`
}

export const getRandomBytes = (length = 20) => {
    return crypto.lib.WordArray.random(length).toString()
}

export const collect = (props) => {
    return { data: props.data }
}

export const toJalaliDateTime = (inputDate) => {
    if (!inputDate) return null
    return moment(inputDate).format("jYYYY/jMM/jDD - HH:mm")
}

export const dateTime = (inputDate) => {
    if (!inputDate) return null
    return moment(inputDate).format("HH:mm")
}

export const toJalaliDate = (inputDate) => {
    if (!inputDate) return null
    return moment(inputDate).format("jYYYY/jMM/jDD")
}

export const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
}

export const humanFileSize = (bytes, si = false, dp = 0) => {
    const thresh = si ? 1000 : 1024

    if (Math.abs(bytes) < thresh) {
        return bytes + " B"
    }

    const units = si
        ? ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        : ["کیلوبایت", "مگابایت", "گیگابایت", "ترابایت", "پتابایت", "اگزابایت", "زبی بایت", "یوتابایت"]
    let u = -1
    const r = 10 ** dp

    do {
        bytes /= thresh
        ++u
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)


    return bytes.toFixed(dp) + " " + units[u]
}

export const humanMimeType = (mime) => {
    return mimeTypes.find(m => m.id === mime)?.name || "نامشخص"
}

export const readFileAsDataURL = (inputFile) => {
    const temporaryFileReader = new FileReader()

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort()
            reject(new DOMException("Problem parsing input file."))
        }

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result)
        }
        temporaryFileReader.readAsDataURL(inputFile)
    })
}

export const openImageInNewTab = (base64Image, mimeType, title = 'پیش نمایش') => {

    const embedTag = `
  <html>
      <head>
          <title>${title}</title>
      </head>
      <body style="margin:0;padding:0">
      <embed src="${base64Image}" type="${mimeType}" ${mimeType === 'application/pdf' && "width='100%'"} ${mimeType === 'application/pdf' && "height='100%'"} />
      </bod>
  </html>
  `
    const newWindow = window.open('', '_blank')

    newWindow.document.write(embedTag)
    newWindow.document.close()
}

export const isSameOrBeforeDate = (date, baseDate) => moment(date).isSameOrBefore(baseDate ? moment(baseDate) : moment(), "day")
export const isSameOrAfterDate = (date, baseDate) => moment(date).isSameOrAfter(baseDate ? moment(baseDate) : moment(), "day")
export const isSameOrBeforeDateTime = (date, baseDate) => moment(date).isSameOrBefore(baseDate ? moment(baseDate) : moment())
export const isSameOrAfterDateTime = (date, baseDate) => moment(date).isSameOrAfter(baseDate ? moment(baseDate) : moment())

export const humanDate = (value) => {

    const birthDate = moment(value, 'YYYY/MM/DD')
    const now = moment()

    const years = now.diff(birthDate, 'years')
    birthDate.add(years, 'years')

    const months = now.diff(birthDate, 'months')
    birthDate.add(months, 'months')

    const days = now.diff(birthDate, 'days')

    return `${years} سال, ${months} ماه, و ${days} روز`
}

export const base64ToBlob = base64 => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}
