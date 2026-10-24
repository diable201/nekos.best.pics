# Simple server for getting random images from [nekos.best](https://nekos.best/)

![](https://diable201-anime.vercel.app/sfw/random)

Simple API wrapped around [nekos.best](https://nekos.best/) in order to be able to get random anime images for my markdown profile

> Originally built on top of waifu.pics, which is no longer available. Endpoints that nekos.best doesn't provide (including all NSFW ones) were removed.

- [Simple server for getting random images from nekos.best](#simple-server-for-getting-random-images-from-nekosbest)
  - [API](#api)
  - [How to get an image](#how-to-get-an-image)
  - [How to use an image in Markdown](#how-to-use-an-image-in-markdown)
  - [Deploy](#deploy)

## API

Here are different endpoints for API requests. nekos.best categories can be updated by the author, so, please, check [official docs](https://docs.nekos.best/).

```javascript
{
  sfw: [
    "waifu",
    "neko",
    "cry",
    "hug",
    "kiss",
    "pat",
    "smug",
    "highfive",
    "nom",
    "bite",
    "slap",
    "wink",
    "poke",
    "dance",
    "blush",
    "happy",
    "random"
  ],
}
```

`random` returns an image from a random endpoint of the list.

## How to get an image

| URL                                               | Request Type |
| ------------------------------------------------- | ------------ |
| `https://diable201-anime.vercel.app/sfw/endpoint` | **GET**      |

![](https://diable201-anime.vercel.app/sfw/kiss)

## How to use an image in Markdown

Just put the above url in typical Markdown syntax

```markdown
![](https://diable201-anime.vercel.app/sfw/endpoint)
```

## Deploy

**Vercel** — import the repository at [vercel.com/new](https://vercel.com/new), the Express app is detected with zero configuration.

**Docker**

```bash
docker build -t nekos-pics .
docker run -d -p 8080:8080 nekos-pics
```
