import { host, imgHost } from './config'

export function imgUrl(url) {
  return url ? url.replace(imgHost,host) : ''
}
