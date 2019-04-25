from imgurpython import ImgurClient
from config import client_id, client_secret, album_id, access_token, refresh_token
import json
import requests
import re
from bs4 import BeautifulSoup
from urllib.request import urlretrieve
import winreg
import os
import urllib


def main():
    requests.packages.urllib3.disable_warnings()
    rs = requests.session()
    res = rs.get('https://twitter.com/minato__mio/media', verify=False)
    soup = BeautifulSoup(res.text, 'html.parser')
    count = 0
    # links = soup.find_all(src=re.compile('http[s]?://pbs.twimg.com/media/.'))
    # print(links)

    # for link in links:
    #     count += 1

    if len(soup.findAll('img', {'src': re.compile('http[s]?://pbs.twimg.com/media/.')})) > 0:
        imgTags = soup.find_all(
            'img', {'src': re.compile('http[s]?://pbs.twimg.com/media/.')})
        for tag in imgTags:
            count += 1
            print(tag.get('src'))
            data.append(tag.get('src'))


def desktopPath():  # 尋找桌面路徑
    key = winreg.OpenKey(winreg.HKEY_CURRENT_USER,
                         r'Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders')

    return winreg.QueryValueEx(key, "Desktop")[0]


if __name__ == "__main__":
    data = []
    # main()
    client = ImgurClient(client_id, client_secret, access_token, refresh_token)
    try:
        images = client.get_album_images(album_id)
    except ImgurClientError as e:
        print('ERROR: {}'.format(e.error_message))
        print('Status code {}'.format(e.status_code))

    print("Downloading album {} ({!s} images)".format(album_id, len(images)))
    # Download each image
    count = 0
    for image in images:
        count += 1
        # Turn our link HTTPs
        link = image.link.replace("http://", "https://")
        # Get our file name that we'll save to disk
        file_name = link.replace("https://i.imgur.com/", "")
        # download_path = os.path.join(args.directory, file_name)
        desktop_path = desktopPath()
        download_path = os.path.join(desktop_path, 'imgur_download')
        if os.path.isfile(download_path):
            print("File exists for image {}, skipping...".format(file_name))
        else:
            path = download_path + '\{}.jpg'
            urlretrieve(link, path.format(count))
            print(link, download_path)

    config = {
        'album': album_id,
        # 'name': 'test-name!',
        # 'title': 'test-title',
        # 'description': 'test-description'
    }
    # data = [
    #     'https://pbs.twimg.com/media/DX19qeEVwAAuv12.jpg:large',
    #     'https://pbs.twimg.com/media/DX19qeAUMAAtUfl.jpg:large',
    #     'https://pbs.twimg.com/media/DX19qeOV4AAIh6v.jpg:large',
    #     'https://pbs.twimg.com/media/DX19qeIU8AYB47S.jpg:large',
    #     'https://pbs.twimg.com/media/D4ookC5VUAADGBR.jpg:large',
    #     'https://pbs.twimg.com/media/D4mk5XYUwAAB-UT.jpg:large',
    #     'https://pbs.twimg.com/media/D4mk5XFUcAUl0By.jpg:large',
    #     'https://pbs.twimg.com/media/D4mk5YBUIAUdCtM.jpg:large',
    #     'https://pbs.twimg.com/media/D4kAuXUUwAE1IEt.jpg:large',
    #     'https://pbs.twimg.com/media/D4j84-YVUAEXYGE.jpg:large',
    #     'https://pbs.twimg.com/media/D4Gxn-JU0AANPDN.jpg:large'
    # ]
    # print("Uploading image... ")
    # for url in data:
    #     image = client.upload_from_url(url, config=config, anon=False)
    #     print(url)
    # with open('E:\\arduino\\arduinoLED\mio.txt', 'a') as f:
    #     f.write("%s\n" % url)
print("Done")
