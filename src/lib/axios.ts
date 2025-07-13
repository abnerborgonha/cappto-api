import axios from 'axios'

export type DownloadStream = {
  url: string;
}

async function downloadStream({ url }: DownloadStream) {
  const response = await axios({
    method: 'get',
    url,
    responseType: 'stream'
  });

  return response;
}

export const axiosClient = {
  downloadStream
}

