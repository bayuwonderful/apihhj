__path = process.cwd()
var favicon = require('serve-favicon');
var express = require('express');
var db = require(__path + '/database/db');
try {
var zahirr = db.get("zahirr");
} catch (e) {
	console.log('')  
}
 
var creator = "Kimimaru"
var secure = require('ssl-express-www');
var cors = require('cors');
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var zrapi = require("zrapi");
var thiccysapi = require('textmaker-thiccy');
var dotenv = require("dotenv").config()
var fs = require('fs');
var TikTokScraper = require('tiktok-scraper');
var { EmojiAPI } = require("emoji-api");
var emoji = new EmojiAPI();
var router  = express.Router();
var { color, bgcolor } = require(__path + '/lib/color.js');
var { fetchJson } = require(__path + '/lib/fetcher.js');
var options = require(__path + '/lib/options.js');

var {
	Searchnabi,
	Gempa
} = require('./../lib');

var {
  igStalk,
  igDownload
} = require("./../lib/utils/ig");

var {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./../lib/utils/yt");

var { 
  Joox, 
  FB, 
  Tiktok
} = require("./../lib/utils/downloader");

var {
  Cuaca, 
  Lirik
} = require('./../lib/utils/information');

var {
  Base, 
  WPUser
} = require('./../lib/utils/tools');

var tebakGambar = require('./../lib/utils/tebakGambar');

var cookie = process.env.COOCKIE
/*
* @Pesan Error
*/
loghandler = {
    notparam: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter apikey'
    },
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter url'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter query'
        },
    notkata: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter kata'
    },
    nottext: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text'
    },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text2'
    },
    notnabi: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter nabi'
    },
    nottext3: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text3'
    },
    nottheme: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter theme'
    },
    notusername: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter username'
    },
    notvalue: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter value'
    },
    invalidKey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan apikey yang valid'
    },
    invalidlink: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin link anda tidak valid.'
    },
    invalidkata: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin kata tidak ada dalam api.'
    },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'emror bruh'
    }
}

/*
Akhir Pesan Error
*/

router.use(favicon(__path + "/views/favicon.ico"));

const listkey = ["kimimaru"];

router.post("/apikey", async (req, res, next) => {
  const key = req.query.key;
  if(listkey.includes(key)) {
    res.json({
      message: 'apikey sudah terdaftar'
    });
  } else {
    listkey.push(key);
    res.json({
      message: `berhasil mendaftarkan ${key} Kedatabase apikey`
    });
  }
});

// delete apikey

router.delete("/apikey", async(req, res, next) => {
	const key = req.query.delete;
	if(listkey.includes(key)) {
		res.json({
			message: 'apikey tidak ada sebelumnya'
			})
			} else {
	listkey.splice(key, 1)
	res.json({
		message: 'apikey berhasil dihapus' 
});
 }
});

router.get('/music/joox', async(req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;
  
  if(!query) return res.json(loghandler.notquery)
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  
  if(listkey.includes(apikey)){
  Joox(query)
  .then((result) => {
  res.json(result)
    res.json(result)
  });
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/music/spotify', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!query) return res.json(loghandler.notquery)
  
  if(listkey.includes(apikey)){
  fetch(encodeURI(`https://alpin-api-2021.herokuapp.com/api/spotify?apikey=alpin1&q=${query}`))
  .then(response => response.json())
        .then(hasil => {

        var result = hasil.data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
  res.sendFile(__path + '/views/inv-api.html')
}
})
router.get('/download/ytmp3', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(apikey)){
  ytDonlodMp3(url)
    .then((result) => {
      res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
      })
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    });
    } else {
    	res.sendFile(__path + '/views/inv-api.html')
    }
});

router.get('/download/ytmp4', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;

  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(apikey)){
  ytDonlodMp4(url)
    .then((result) => {
      res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
      })
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.sendFile(__path + '/views/inv-api.html')
    }
});

router.get("/yt/playmp3", async(req, res, next) => {
    const query = req.query.query;
    const apikey = req.query.apikey;
    
    if(!query) return res.json(loghandler.notquery)
    if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
    if(listkey.includes(apikey)){
    ytPlayMp3(query)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
      } else {
      res.sendFile(__path + '/views/inv-api.html')
      }
});

router.get("/yt/playmp4", async(req, res, next) => {

    const query = req.query.query;

    const apikey = req.query.apikey;
    
    if(!query) return res.json(loghandler.notquery)
    if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
    if(listkey.includes(apikey)){
    ytPlayMp4(query)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
      } else {
      res.sendFile(__path + '/views/inv-api.html')
      }
});


router.get('/yt/search', async(req, res, next) => {
    const query = req.query.query;
    const apikey = req.query.apikey;
    
    if(!query) return res.json(loghandler.notquery)
    if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
    if(listkey.includes(apikey)){
    ytSearch(query)
        .then((result) => {
            res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result
            })
        })
        .catch((error) => {
            res.json(error);
        });
      } else {
     res.sendFile(__path + '/views/inv-api.html')
     }
});

router.get('/download/tiktok', async (req, res, next) => {
    var Apikey = req.query.apikey,
        url = req.query.url

	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
     if (!url) return res.json(loghandler.noturl)
     Tiktok(url)
     .then((data) => {
       res.json(data)
     })
    } else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/download/ig', async(req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(apikey)){
  igDownload(url)
    .then((data) => {
      result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        id: data.id,
        shortCode: data.shortCode,
        caption: data.caption,
        result: data.url
      }
      res.json(result)
    })
    .catch((err) => {
      res.json(err);
    });
    } else {
    	res.sendFile(__path + '/views/inv-api.html')
    }
});

router.get('/download/fb', async (req, res, next) => {

        var Apikey = req.query.apikey,
            url = req.query.url
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
    if (!url) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter url"})

       FB(url)
       .then((data) => {
         res.json({
           status: true,
           code: 200,
           creator: `${creator}`,
           title: data.title,
           desc: data.deskripsi,
           durasi: data.durasi,
           thumb: data.thumbnail,
           result: data.hd
         })
       });
} else {
res.sendFile(__path + '/views/inv-api.html')
}
});

router.get('/stalk/tiktok', async (req, res, next) => {
    var Apikey = req.query.apikey,
        username = req.query.username

	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
    if (!username) return res.json(loghandler.notusername)


    TikTokScraper.getUserProfileInfo(username)
        .then(user => {
            res.json({
                status : true,
                creator : `${creator}`,
                result : user
            })
        })
        .catch(e => {
             res.json({
                 status : false,
                 creator : `${creator}`,
                 message : "error, mungkin username anda tidak valid"
             })
         })
   } else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/stalk/ig', async(req, res, next) => {
  const username = req.query.username;
  const apikey = req.query.apikey;
  if(!username) return res.json(loghandler.notusername)
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(apikey)){
  igStalk(username)
    .then((result) => {
      res.json({
        status : true,
        code: 200,
        creator : `${creator}`,
        result
      });
    })
    .catch((err) => {
      res.json(err);
    });
    } else {
    	res.sendFile(__path + '/views/inv-api.html')
    }
});


router.get('/stalk/npm', async (req, res, next) => {
        var Apikey = req.query.apikey,
            query = req.query.query
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
    if (!query) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter query"})

       fetch(encodeURI(`https://registry.npmjs.org/${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/random/quotes', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/random/quotes`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 creator : `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/jadwal-bioskop', async(req, res, next) => {
var Apikey = req.query.apikey

if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
if(listkey.includes(Apikey)){
const { default: Axios } = require('axios')
const cheerio = require('cheerio')

Axios.get('https://jadwalnonton.com/now-playing')
.then(({ data }) => {
     const $ = cheerio.load(data)
     let title = []
     let url = []
     let img = []
 	$('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a').get().map((rest) => {
         url.push($(rest).attr('href'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	title.push($(rest).attr('alt'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	img.push($(rest).attr('src'))
         })
     let result = []
     for (let i = 0; i < url.length; i++) {
          result.push({
               	url: url[i],
               	title: title[i],
               	img: img[i]
          })
     }
     res.json({
     creator:  `${creator}`,
     status: true,
     result: result
     })
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/short/tinyurl', async (req, res, next) => {
    var Apikey = req.query.apikey,
        url = req.query.url

	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
     if (!url) return res.json(loghandler.noturl)
     request(`https://tinyurl.com/api-create.php?url=${url}`, function (error, response, body) {
         try {
             res.json({
                 status : true,
                 creator : `${creator}`,
                 result : `${body}`
             })
         } catch (e) {
             console.log('Error :', color(e,'red'))
             res.json(loghandler.invalidlink)
         }
     })
   } else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/base', async (req, res, next) => {
	var type = req.query.type,
		encode = req.query.encode,
		decode = req.query.decode,
		Apikey = req.query.apikey;
		if (!Apikey) return res.sendFile(__path + '/views/emp-api.html')
		if (listkey.includes(Apikey)){
		if (!type) return res.json({status: false, creator, code: 404, message: 'masukan parameter type, type yang tersedia : base64 , base32'})
		if (type == 'base64' && encode){
				Base("b64enc", encode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base64' && decode){
				Base("b64dec", decode)
				.then(result => {
					res.json({
						status: true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base32' && encode){
				Base('b32enc', encode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if (type == 'base32' && decode){
				Base('b32dec', decode)
				.then(result => {
					res.json({
						status:true,
						creator: `${creator}`,
						result
					})
				})
			} else if(!(encode || decode)){
				res.json({
					status:false,
					creator: `${creator}`,
					message: "tambahkan parameter encode/decode"
				})
			} else {
				res.json(loghandler.error)
			}
	} else {
res.sendFile(__path + '/views/inv-api.html')
}
});

router.get('/tools/wpuser', async(req, res, next) => {
  const link = req.query.url;
  const apikey = req.query.apikey;
  
  if(!link) return res.json(loghandler.noturl)
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  
  if(listkey.includes(apikey)) {
    WPUser(link)
    .then((data) => {
      res.json(data)
    })
} else {
  res.sendFile(__path + '/views/inv-api.html')
};
});

router.get('/info/cuaca', async(req, res, next) => {
  const apikey = req.query.apikey;
  const kota = req.query.kota;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!kota) return res.json({status: false, code: 406, message: 'masukkan parameter kota'})
  if(listkey.includes(apikey)) {
    Cuaca(kota)
    .then((data) => {
      res.json(data)
    })
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
})
router.get('/info/gempa', async (req, res, next) => {
	        var Apikey = req.query.apikey

		if (!Apikey) return res.sendFile(__path + '/views/emp-api.html')
		if (listkey.includes(Apikey)){
		Gempa()
		.then(result => {
			res.json({
				creator: creator,
				result
			})
		})
		.catch(e => {
			console.log('Error :', color(e, 'red'))
			res.json(loghandler.error)
		})
	} else {
res.sendFile(__path + '/views/inv-api.html')
}
})

//ISLAMIC API
router.get('/muslim/kisahnabi', async (req, res, next) => {
	var nabi = req.query.nabi,
		Apikey = req.query.apikey;

		if (!Apikey) return res.sendFile(__path + '/views/emp-api.html')
		if (listkey.includes(Apikey)){
		Searchnabi(nabi)
		.then(result => {
			res.json({
				creator: creator,
				result
			})
		})
		.catch(e => {
			console.log('Error :', color(e, 'red'))
			res.json(loghandler.error)
		})
	} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/muslim/hadits', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kitab = req.query.kitab,
            nomor = req.query.nomor
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
    if (!kitab) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kitab"})
    if (!nomor) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter nomor"})

       fetch(encodeURI(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${nomor}`))
        .then(response => response.json())
        .then(data => {
             res.json(
             data
             )
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/muslim/quran', async (req, res, next) => {
        var Apikey = req.query.apikey,
            surah = req.query.surah,
            ayat = req.query.ayat
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
    if (!surah) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter surah"})
    if (!ayat) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter ayat"})

       fetch(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/muslim/surah', async (req, res, next) => {
        var Apikey = req.query.apikey,
            surah = req.query.surah
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
    if (!surah) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter surah"})

       fetch(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/muslim/tahlil', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       tahlill = JSON.parse(fs.readFileSync(__path +'/data/DoaTahlil.json'));
	res.json({tahlill})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/muslim/ayatkursi', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

    //   ayatkursi = JSON.parse(fs.readFileSync(__path +'/data/AyatKursi.json'));
	res.json({
    "tafsir": "Allah adalah Tuhan Yang Maha Esa, tidak ada tuhan selain Dia, dan hanya Dia yang berhak untuk disembah. Adapun tuhan-tuhan yang lain yang disembah oleh sebagian manusia dengan alasan yang tidak benar, memang banyak jumlahnya. Akan tetapi Tuhan yang sebenarnya hanyalah Allah. Hanya Dialah Yang hidup abadi, yang ada dengan sendiri-Nya, dan Dia pulalah yang selalu mengatur makhluk-Nya tanpa ada kelalaian sedikit pun.\n\nKemudian ditegaskan lagi bahwa Allah tidak pernah mengantuk. Orang yang berada dalam keadaan mengantuk tentu hilang kesadarannya, sehingga dia tidak akan dapat melakukan pekerjaannya dengan baik, padahal Allah swt senantiasa mengurus dan memelihara makhluk-Nya dengan baik, tidak pernah kehilangan kesadaran atau pun lalai.\n\nKarena Allah tidak pernah mengantuk, sudah tentu Dia tidak pernah tidur, karena mengantuk adalah permulaan dari proses tidur. Orang yang tidur lebih banyak kehilangan kesadaran daripada orang yang mengantuk.\n\nSifat Allah yang lain yang disebutkan dalam ayat ini ialah bahwa Dialah yang mempunyai kekuasaan dan yang memiliki apa yang ada di langit dan di bumi. Dialah yang mempunyai kekuatan dan kekuasaan yang tak terbatas, sehingga Dia dapat berbuat apa yang dikehendaki-Nya. Semuanya ada dalam kekuasaan-Nya, sehingga tidak ada satu pun dari makhluk-Nya termasuk para nabi dan para malaikat yang dapat memberikan pertolongan kecuali dengan izin-Nya, apalagi patung-patung yang oleh orang-orang kafir dianggap sebagai penolong mereka.\n\nYang dimaksud dengan \"pertolongan\" atau \"syafaat\" dalam ayat ini ialah pertolongan yang diberikan oleh para malaikat, nabi dan orang-orang saleh kepada umat manusia pada hari kiamat untuk mendapatkan keringanan atau kebebasan dari hukuman Allah. Syafaat itu akan terjadi atas izin Allah. Dalam hadis disebutkan :\n\nNabi Saw bersabda, \"¦Kemudian Allah berfirman, \"Para Malaikat memberikan syafaat, para Nabi memberikan syafaat, dan orang-orang mukmin juga memberikan syafaat. (Riwayat Ahmad dan Muslim dari Abu Sa'id al-Khudri)\n\nSifat Allah yang lain yang disebutkan dalam ayat ini ialah: bahwa Allah senantiasa mengetahui apa saja yang terjadi di hadapan dan di belakang makhluk-Nya, sedang mereka tidak mengetahui sesuatu pun dari ilmu Allah, melainkan sekadar apa yang dikehendaki-Nya untuk mereka ketahui. Kursi Allah mencakup langit dan bumi. Allah tidak merasa berat sedikit pun dalam memelihara makhluk-Nya yang berada di langit dan di bumi, dan di semua alam ciptaan-Nya. Allah Mahatinggi lagi Mahabesar.\n\nMereka tidak mengetahui ilmu Allah, kecuali apa yang telah dikehendaki-Nya untuk mereka ketahui. Dengan demikian, yang dapat diketahui oleh manusia hanyalah sekadar apa yang dapat dijangkau oleh pengetahuan yang telah dikaruniakan Allah kepada mereka, dan jumlahnya amat sedikit dibanding dengan ilmu-Nya yang luas. Hal ini ditegaskan Allah dalam firman-Nya:\n\n\"¦ Sedangkan kamu diberi pengetahuan hanya sedikit.\" (al-Isra'/17:85)",
    "translation": "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Mahatinggi, Mahabesar.",
    "arabic": "اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ  لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ",
    "latin": "Alloohu laa ilaaha illaa huwal hayyul qoyyuum, laa ta’khudzuhuu sinatuw walaa naum. Lahuu maa fissamaawaati wa maa fil ardli man dzal ladzii yasyfa’u ‘indahuu illaa biidznih, ya’lamu maa baina aidiihim wamaa kholfahum wa laa yuhiithuuna bisyai’im min ‘ilmihii illaa bimaa syaa’ wasi’a kursiyyuhus samaawaati wal ardlo walaa ya’uuduhuu hifdhuhumaa wahuwal ‘aliyyul ‘adhiim."
  })
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/muslim/doaharian', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

   doahar = JSON.parse(fs.readFileSync(__path +'/data/DoaHarian.json'));
	res.json({doahar})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/muslim/bacaanshalat', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       bacaansalat = JSON.parse(fs.readFileSync(__path +'/data/BacaanShalat.json'));
	res.json(bacaansalat)
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/muslim/niatshalat', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       niatslt = JSON.parse(fs.readFileSync(__path +'/data/NiatShalat.json'));
	res.json(niatslt)
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/muslim/wirid', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       niatiislt = JSON.parse(fs.readFileSync(__path +'/data/DoaWirid.json'));
	res.json(niatiislt)
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})



router.get('/muslim/kisahnabi', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataKisahNabi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/muslim/asmaulhusna', async (req, res, next) => {
        var Apikey = req.query.apikey

	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

	asmaul = JSON.parse(fs.readFileSync(__path +'/data/AsmaulHusna.json'));
	res.json(asmaul)
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})
//PENUTUP ISLAMIC API
//WALLPAPER
router.get('/wallpaper/aesthetik', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

  var Techno1 = JSON.parse(fs.readFileSync(__path +'/data/wallpaper/Aesthetik.json'))
var result = Techno1[Math.floor(Math.random() * Techno1.length)];
let hasil = result.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/wallp.jpg', data)
    res.sendFile(__path +'/tmp/wallp.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
})


router.get('/wallpaper/anime', async (req, res, next) => {
        const Apikey = req.query.apikey;
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

var Techno = JSON.parse(fs.readFileSync(__path +'/data/wallpaper/Anime.json'))
var result = Techno[Math.floor(Math.random() * Techno.length)];
let hasil = result.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/wallp.jpg', data)
    res.sendFile(__path +'/tmp/wallp.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
})

router.get('/wallpaper/cyber', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

  var Muslim = JSON.parse(fs.readFileSync(__path +'/data/wallpaper/Cyber.json'));
  var result = Muslim[Math.floor(Math.random() * Muslim.length)];
let hasil = result.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/wallp.jpg', data)
    res.sendFile(__path +'/tmp/wallp.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
})


router.get('/wallpaper/nature', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

  var Progam = JSON.parse(fs.readFileSync(__path +'/data/wallpaper/Nature.json'));
  var result = Progam[Math.floor(Math.random() * Progam.length)];
let hasil = result.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/wallp.jpg', data)
    res.sendFile(__path +'/tmp/wallp.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
})


router.get('/wallpaper/teknologi', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

  var Techno2 = JSON.parse(fs.readFileSync(__path +'/data/wallpaper/Teknologi.json'));
  var result = Techno2[Math.floor(Math.random() * Techno2.length)];
let hasil = result.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/wallp.jpg', data)
    res.sendFile(__path +'/tmp/wallp.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
})
//PENUTUP WALLPAPER

router.get('/random/quotes/muslim', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/quote?type=agamis`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/random/asmaulhusna', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/random/asmaulhusna`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/info/wikipedia', async (req, res, next) => {
        var Apikey = req.query.apikey,
            search = req.query.search
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/wiki?keyword=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/info/drakorasia', async (req, res, next) => {
        var Apikey = req.query.apikey,
            search = req.query.search
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
        if(!search) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`http://docs-api-zahirrr.herokuapp.com/api/drakorasia?search=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})

router.get('/fakedata', async (req, res, next) => {
        var Apikey = req.query.apikey,
            country = req.query.country
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
        if(!country) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter country"})

       fetch(encodeURI(`https://fakename-api-zhirrr.vercel.app/api/fakename?country=${country}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})




router.get('/music/liriklagu', async (req, res, next) => {
        var Apikey = req.query.apikey,
            lagu = req.query.query;
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
        if(!lagu) return res.json(loghandler.notquery)
        Lirik(lagu)
        .then((lirik) => {
          res.json({
            status: true,
            code: 200,
            creator: `${creator}`,
            result: lirik.data
          })
        });
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/music/chordlagu', async (req, res, next) => {
        var Apikey = req.query.apikey,
            lagu = req.query.lagu
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
        if(!lagu) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/chord?q=${lagu}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/info/kbbi', async (req, res, next) => {
        var Apikey = req.query.apikey,
            kata = req.query.kata
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
        if(!kata) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/info/covidindo', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/covid-indonesia`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/info/covidworld', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/world`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/info/kodepos', async (req, res, next) => {
        var Apikey = req.query.apikey,
	    kota = req.query.kota
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
	if(!kota) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kota"})

       fetch(encodeURI(`https://kodepos-api-zhirrr.vercel.app/?q=${kota}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})


router.get('/translate', async (req, res, next) => {
        var Apikey = req.query.apikey,
	    kata = req.query.kata
            
	if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
	if(listkey.includes(Apikey)){
	if(!kata) return res.json({ status : false, creator : `${creator}`, message : "masukan parameter kata"})
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/translate?text=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
} else {
res.sendFile(__path + '/views/inv-api.html')
}
})



router.get('/anime/loli', async(req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.sendFile(__path + '/views/emp-api.html')
    if(listkey.includes(apikey)){
    try {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q= " + "Loli",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function(error, response, responseBody) {
            if (error) return

            $ = cheerio.load(responseBody)
            var links = $(".image a.link")
            var cari = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))
            if (!cari.length) return
            var hasil = cari[Math.floor(Math.random() * cari.length)]
        res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result: hasil
            })
        })
    } catch (e) {}
    } else {
      res.sendFile(__path + '/views/inv-api.html')
    }
});



router.get('/game/asahotak', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuahot = JSON.parse(fs.readFileSync(__path +'/data/game/asahotak.json'));
    const AsahOtak = asuahot[Math.floor(Math.random() * asuahot.length)];
    let hasil = AsahOtak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/caklontong', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const caklont = JSON.parse(fs.readFileSync(__path +'/data/game/caklontong.json'));
    const CakLon = caklont[Math.floor(Math.random() * caklont.length)];
    let hasil = CakLon;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/family100', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const fam100 = JSON.parse(fs.readFileSync(__path +'/data/game/family100.json'));
    const Fam100 = fam100[Math.floor(Math.random() * fam100.length)];
    let hasil = Fam100;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/siapakahaku', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuahott = JSON.parse(fs.readFileSync(__path +'/data/game/siapakahaku.json'));
    const AsahOtakk = asuahott[Math.floor(Math.random() * asuahott.length)];
    let hasil = AsahOtakk;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/susunkata', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuahost = JSON.parse(fs.readFileSync(__path +'/data/game/susunkata.json'));
    const AsaahOtak = asuahost[Math.floor(Math.random() * asuahost.length)];
    let hasil = AsaahOtak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tebakbendera', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuahuot = JSON.parse(fs.readFileSync(__path +'/data/game/tebakbendera.json'));
    const AssahOtak = asuahuot[Math.floor(Math.random() * asuahuot.length)];
    let hasil = AssahOtak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tebakkabupaten', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuaihot = JSON.parse(fs.readFileSync(__path +'/data/game/tebakkabupaten.json'));
    const AsahOytak = asuaihot[Math.floor(Math.random() * asuaihot.length)];
    let hasil = AsahOytak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tebakkalimat', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuahhhot = JSON.parse(fs.readFileSync(__path +'/data/game/tebakkalimat.json'));
    const AsahhhOtak = asuahhhot[Math.floor(Math.random() * asuahhhot.length)];
    let hasil = AsahhhOtak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tebakkata', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuahuhot = JSON.parse(fs.readFileSync(__path +'/data/game/tebakkata.json'));
    const AsatthOtak = asuahuhot[Math.floor(Math.random() * asuahuhot.length)];
    let hasil = AsatthOtak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tebakkimia', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuhot = JSON.parse(fs.readFileSync(__path +'/data/game/tebakkimia.json'));
    const AsaOtak = asuhot[Math.floor(Math.random() * asuhot.length)];
    let hasil = AsaOtak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tebaklirik', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asuot = JSON.parse(fs.readFileSync(__path +'/data/game/tebaklirik.json'));
    const AsOtak = asuot[Math.floor(Math.random() * asuot.length)];
    let hasil = AsOtak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tebaktebakan', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const ahhhsuahot = JSON.parse(fs.readFileSync(__path +'/data/game/tebaktebakan.json'));
    const Ashhak = ahhhsuahot[Math.floor(Math.random() * ahhhsuahot.length)];
    let hasil = Ashhak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tekateki', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const suahot = JSON.parse(fs.readFileSync(__path +'/data/game/tekateki.json'));
    const sahOtak = suahot[Math.floor(Math.random() * suahot.length)];
    let hasil = sahOtak;
    res.json(hasil)
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/game/tebakgambar', async (req, res, next) => {
  var apikey = req.query.apikey;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(apikey)){
  let result = await tebakGambar()
  if (result) {
    const hasil = {
      status: true,
      code: 200,
      creator: `${creator}`,
      image: result.img,
      jawaban: result.jawaban,
      clue: result.petunjuk
    }
    res.json(hasil)
  } else {
    return res.status(408).json({
      status: res.statusCode,
      error: 'Emror'
    })
  }
  } else {
  res.sendFile(__path + '/views/inv-api.html')
  }
})

/**
* @Maker
**/






/*
@ TEXTPRO
*/
router.get('/textpro/cloud', async(req, res, next) => {

  const apikey = req.query.apikey;

const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html", [
    text,
  ])
      .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/denim', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/denim-text-effect-online-919.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/deluxe', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/deluxe-silver-text-effect-970.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/deluxe2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/deluxe-gold-text-effect-966.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/decorate', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/decorate-green-text-effect-918.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/decorate2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/decorate-purple-text-effect-917.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/decorativeglass', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/decorative-glass-text-effect-891.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/dropwater', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/dropwater-text-effect-872.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/embossed', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-embossed-text-effect-on-cracked-surface-1024.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/equalizer', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/rainbow-equalizer-text-effect-902.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/firework', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/firework-sparkle-text-effect-930.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glossy2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/glossy-carbon-text-effect-965.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/gradient', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/online-3d-gradient-text-effect-generator-1020.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/graffiti', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/gradient2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-gradient-text-effect-online-free-1002.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glossy', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-3d-glossy-metal-text-effect-1019.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glitch', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glitter', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/blue-glitter-text-effect-841.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glitter2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-glitter-text-effect-840.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});


router.get('/textpro/glitter3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/bronze-glitter-text-effect-835.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});


router.get('/textpro/glitter4', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/pink-glitter-text-effect-839.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glitter5', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/green-glitter-text-effect-838.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glitter6', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/gold-glitter-text-effect-836.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glitter7', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/silver-glitter-text-effect-837.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glossy3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/glossy-blue-metal-text-effect-967.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glue', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-glass-text-effect-online-892.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/yellow-glass-text-effect-913.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-glass-text-effect-912.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass4', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/orange-glass-text-effect-911.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass5', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/green-glass-text-effect-910.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass6', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/cyan-glass-text-effect-909.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass7', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/blue-glass-text-effect-908.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass8', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-shiny-glass-text-effect-906.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/glass9', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-shiny-glass-text-effect-906.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/gloss', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/ultra-gloss-text-effect-online-920.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/hexa', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/hexa-golden-text-effect-842.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/halloween', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/halloween2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-spooky-halloween-text-effect-online-1046.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/halloween3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/halloween-fire-text-effect-940.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/horror', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-cinematic-horror-text-effect-1045.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/horror2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/harrypotter', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-harry-potter-text-effect-online-1025.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/holographic', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/holographic-3d-text-effect-975.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/honey', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/honey-text-effect-868.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/ice', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/ice-cold-text-effect-862.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/gem2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-gem-text-effect-853.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/gem1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/blue-gem-text-effect-830.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/christmas', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/circuit', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/cake', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/chocolate-cake-text-effect-890.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/candy', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/pink-candy-text-effect-832.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/carbon', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/carbon-text-effect-833.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/chrome', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-chrome-text-effect-827.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/brokenglass', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/broken-glass-text-effect-free-online-1023.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/captainamerika', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/captain-america-text-effect-905.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});


router.get('/textpro/bread', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/bread-text-effect-online-887.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/berry', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});


router.get('/textpro/blood2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/blood-text-on-the-frosted-glass-941.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/blood', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/horror-blood-text-effect-online-883.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/box', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-box-text-effect-online-880.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/bokeh', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/bokeh-text-effect-876.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/bagel', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/bagel-text-effect-857.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/biscuit', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/biscuit-text-effect-858.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/blackpink', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/bear', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/1917', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/1917-style-text-effect-online-980.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/abstra', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/abstra-gold-text-effect-859.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/american', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-american-flag-3d-text-effect-online-1051.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/advanced', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/free-advanced-glow-text-effect-873.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/balloon1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/red-foil-balloon-text-effect-928.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  dataa = data.toBuffer();
  await fs.writeFileSync(__path +'/database/spongebob.png', dataa)
  res.sendFile(__path +'/database/spongebob.png')
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/balloon2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-foil-balloon-text-effect-927.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/balloon3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/pink-foil-balloon-text-effect-926.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/balloon4', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/green-foil-balloon-text-effect-925.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/balloon5', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/cyan-foil-balloon-text-effect-924.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/textpro/balloon6', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/blue-foil-balloon-text-effect-923.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/balloon7', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/gold-foil-balloon-text-effect-922.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/snow', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/transformer', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/thunder', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-thunder-text-effect-online-881.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/thunder2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/technology', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/toxic', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/toxic-text-effect-online-901.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/underwater', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-underwater-text-effect-generator-online-1013.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/watercolor', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/wicker', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/wicker-text-effect-online-932.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/wood', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/wood-text-effect-856.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/warning', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/road-warning-text-effect-878.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/wall', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/break-wall-text-effect-871.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/yellow-jewelry-text-effect-851.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/silver-jewelry-text-effect-850.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/red-jewelry-text-effect-849.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry4', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/orange-jewelry-text-effect-847.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry5', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-jewelry-text-effect-848.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry6', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/green-jewelry-text-effect-846.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry7', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/cyan-jewelry-text-effect-845.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry8', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/blue-jewelry-text-effect-844.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry9', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/blue-sparkling-jewelry-text-effect-898.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry10', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/pink-sparkling-jewelry-text-effect-899.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry11', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/green-sparkling-jewelry-text-effect-897.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry12', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/gold-sparkling-jewelry-text-effect-895.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry13', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/purple-sparkling-jewelry-text-effect-896.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry14', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/red-sparkling-jewelry-text-effect-894.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/jewelry15', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/cyan-sparkling-jewelry-text-effect-893.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/joker', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-logo-joker-online-934.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/juice', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/fruit-juice-text-effect-861.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/koi', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/koi-fish-text-effect-online-888.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/leaves', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/natural-leaves-text-effect-931.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/luxury', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-luxury-gold-text-effect-online-1003.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/lava', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/lava-text-effect-online-914.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/magma', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metallic', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-metallic-text-effect-free-online-1041.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/metal-dark-gold-text-effect-984.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/metal-rainbow-text-effect-854.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/hot-metal-text-effect-843.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal4', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/eroded-metal-text-effect-834.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal5', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/blue-metal-text-effect-831.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal6', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/black-metal-text-effect-829.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal7', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-glowing-metal-text-effect-828.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal8', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/metal-dark-gold-text-effect-online-939.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/metal9', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/metal-purple-dual-effect-973.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/marble', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/marble-slabs-text-effect-864.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/marble2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/marble-text-effect-863.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/minion', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/minion-text-effect-3d-online-978.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/matrix', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/matrix-style-text-effect-online-884.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/neon1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/neon2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/neon3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/neon-light-text-effect-online-882.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/neon4', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/neon-text-effect-online-879.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/neon5', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/green-neon-text-effect-874.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/neon6', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/neon-text-effect-online-963.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/neon7', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/pipe', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/papercut1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-art-paper-cut-text-effect-online-1022.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/papercut2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/fabric', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/fabric-text-effect-online-964.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/plastic', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/plastic-bag-drug-text-effect-867.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/rock', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/rock-text-effect-online-915.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/rainbow', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/robot', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/robot-r2-d2-text-effect-903.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/rusty', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/rusty-metal-text-effect-860.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/sci-fi', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/sci-fi-text-effect-855.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/sci-fi2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/space', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-space-text-effects-online-free-1042.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/sketch', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/science', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-science-fiction-text-effect-online-free-1038.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/stone1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/stone2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/peridot-stone-text-effect-916.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/shiny', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/shiny-metal-text-effect-852.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/strawberry', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/strawberry-text-effect-online-889.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/skeleton', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/skeleton-text-effect-online-929.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/steel', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/steel-text-effect-online-921.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/sand1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/write-in-sand-summer-beach-free-online-991.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/sand2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/sand-writing-text-effect-online-990.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/sand3', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/sand-engraved-3d-text-effect-989.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/sand4', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/create-a-summery-sand-writing-text-effect-988.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/textpro/xmas', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)){
    zrapi 
  .textpro("https://textpro.me/xmas-cards-3d-online-942.html", [
    text,
  ])
  .then((data) => {
    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result: data
    })
  })
  .catch((err) => console.log(err));
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
/*
@AKHIR TEXTPRO ME
*/



/*
router.get('/asupan', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/asupan.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', data)
    res.sendFile(__path +'/tmp/asupan.mp4')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
*/
//==================================================//
//==================[ASUPAN]======================//
//=================================================//
router.get('/asupan/bocil', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/vid/bocil.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', data)
    res.sendFile(__path +'/tmp/asupan.mp4')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/asupan/geayubi', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/vid/geayubi.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', data)
    res.sendFile(__path +'/tmp/asupan.mp4')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/asupan/santuy', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/vid/santuy.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', data)
    res.sendFile(__path +'/tmp/asupan.mp4')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
router.get('/asupan/ukhty', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/vid/ukhty.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', data)
    res.sendFile(__path +'/tmp/asupan.mp4')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});
//==================================================//


//==================================================//
//===================[CEWEK]=======================//
//=================================================//
router.get('/cecan/cecan', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/img/cecan.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.jpg', data)
    res.sendFile(__path +'/tmp/asupan.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/cecan/china', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/img/china.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.jpg', data)
    res.sendFile(__path +'/tmp/asupan.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/cecan/indonesia', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/img/indonesia.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.jpg', data)
    res.sendFile(__path +'/tmp/asupan.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/cecan/japan', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/img/japan.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.jpg', data)
    res.sendFile(__path +'/tmp/asupan.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/cecan/korea', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/img/korea.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.jpg', data)
    res.sendFile(__path +'/tmp/asupan.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/cecan/malaysia', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/img/malaysia.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.jpg', data)
    res.sendFile(__path +'/tmp/asupan.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/cecan/thailand', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/img/thailand.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.jpg', data)
    res.sendFile(__path +'/tmp/asupan.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/cecan/vietnam', async (req, res, next) => {
  Apikey = req.query.apikey;
  
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
    const asupan = JSON.parse(fs.readFileSync(__path +'/data/Asupan/img/vietnam.json'));
    const Asupan = asupan[Math.floor(Math.random() * asupan.length)];
    let hasil = Asupan.url;
    data = await fetch(hasil).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.jpg', data)
    res.sendFile(__path +'/tmp/asupan.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

//=================================================//
router.get('/maker/ttp', async (req, res, next) => {

  Apikey = req.query.apikey;
  if (!req.query.text) return res.json({ status: 404, error: 'masukkan parameter text'})
  if(!Apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(Apikey)) {
  random = new Date
data = await fetch(`https://api.areltiyan.site/sticker_maker?text=${encodeURIComponent(req.query.text)}`).then(v => v.json())
         base64 = data.base64
         var buffer = base64.slice(22)
         await fs.writeFileSync(__path +`/tmp/ttp.png`, buffer, 'base64')
        res.sendFile(__path+'/tmp/ttp.png')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/maker/attp', async(req, res, next) => {

  const text = req.query.text;
  const apikey = req.query.apikey;
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  
  if(listkey.includes(apikey)) {
  let hasil = 'https://alpin-api-2021.herokuapp.com/api/attp?text='+ text +'&apikey=alpin1'
  data = await fetch(hasil).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/attp.gif', data)
  res.sendFile(__path +'/tmp/attp.gif')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
})

router.get('/maker/harta-tahta', async(req, res, next) => {
  const text = req.query.text;
  const apikey = req.query.apikey;
  
  if(!text) return res.sendFile(__path + '/views/emp-txt.html')
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  
  if(listkey.includes(apikey)) {
  let hasil = 'https://api.zeks.xyz/api/hartatahta?text='+ text +'&apikey=apivinz' 
  data = await fetch(hasil).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/tahta.jpg', data)
  res.sendFile(__path +'/tmp/tahta.jpg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/maker/skatch', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(apikey)){
  let hasil = `https://lindow-api.herokuapp.com/api/sketcheffect?img=${url}&apikey=LindowApi`
  data = await fetch(hasil).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/skatch.jpeg', data)
        res.sendFile(__path+'/tmp/skatch.jpeg')
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/maker/emoji2png', async(req, res, next) => {
  const apikey = req.query.apikey;
  const Emoji = req.query.text;
  
  if(!apikey) return jes.json(loghandler.notparam)
  if(!Emoji) return res.sendFile(__path + '/views/emp-txt.html')
  
  if(listkey.includes(apikey)) {

    emoji.get(Emoji)
    .then(img_emoji => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: img_emoji.images[0].url
      }
      res.json(result)
    })
  
    .catch((err) => {
      res.json(loghandler.error)
    })
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});

router.get('/web2plain-text', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  
  if(!url) return res.json(loghandler.noturl)
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  
  if(listkey.includes(apikey)){
    fetch(encodeURI(`https://websitetextextraction.apifex.com/api/v1/extract?url=${url}`))
    .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
               status: true,
               code: 200,
               creator: `${creator}`,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
});


router.get('/cekapikey', async(req, res, next) => {
  const apikey = req.query.apikey;
  if(!apikey) return res.sendFile(__path + '/views/emp-api.html')
  if(listkey.includes(apikey)) {
    res.json({
      status: 'active',
      creator: `${creator}`,
      apikey: `${apikey}`,
      message: 'APIKEY VALID!'
    })
  } else {
    res.sendFile(__path + '/views/inv-api.html')
  }
})

router.use(function (req, res) {

    res.status(404)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/404.html');
});

module.exports = router
