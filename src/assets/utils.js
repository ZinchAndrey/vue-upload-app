const formatDate = (isoDateString) => {
  const date = new Date(isoDateString)

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
  return formattedDate
}

const convertSizeFromBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getImageURL = (imgUrl) => {
  return new URL(`/src/assets/${imgUrl}`, import.meta.url).href
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
}

export { formatDate, convertSizeFromBytes, getImageURL, copyToClipboard }
