import { host, imgHost } from './config'

export function imgUrl(url) {
  console.log(url);
  return url.replace(imgHost,host)
}
