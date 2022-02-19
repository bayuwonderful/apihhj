__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/docs', (req, res) => {
    res.sendFile(__path + '/views/docs.html')
})
router.get('/', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})
router.get('/about', (req, res) => {
    res.sendFile(__path + '/views/about.html')
})
router.get('/docs/islamic', (req, res) => {
	res.sendFile(__path + '/docs/islamic.html')
})
router.get('/docs/downloader', (req, res) => {
   res.sendFile(__path + '/docs/downloader.html')
})
router.get('/docs/stalk', (req, res) => {
  res.sendFile(__path + '/docs/stalk.html')
})
router.get('/docs/music', (req, res) => {
   res.sendFile(__path + '/docs/music.html')
})
router.get('/docs/wallpaper', (req, res) => {
	res.sendFile(__path + '/docs/wallpaper.html')
})
router.get('/docs/asupan', (req, res) => {
   res.sendFile(__path + '/docs/asupan.html')
})
router.get('/docs/cecan', (req, res) => {
   res.sendFile(__path + '/docs/cecan.html')
})
router.get('/docs/randomtext', (req, res) => {
  res.sendFile(__path + '/docs/randomtext.html')
})
router.get('/docs/anime', (req, res) => {
   res.sendFile(__path + '/docs/anime.html')
})
router.get('/docs/game', (req, res) => {
   res.sendFile(__path + '/docs/game.html')
})
router.get('/docs/info', (req, res) => {
   res.sendFile(__path + '/docs/info.html')
})
router.get('/docs/tools', (req, res) => {
   res.sendFile(__path + '/docs/tools.html')
})
router.get('/docs/textpro', (req, res) => {
   res.sendFile(__path + '/docs/textpro.html')
})

module.exports = router
