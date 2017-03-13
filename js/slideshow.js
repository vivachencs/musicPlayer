var container = e('#id-slideshow')
var photos = es('#id-slideshow .photo')

// 图片位置
var position = [
    {
        x : -400,
        y : 0,
        z : -120,
    },
    {
        x : -200,
        y : 0,
        z : -60,
    },
    {
        x : 0,
        y : 0,
        z : 30,
    },
    {
        x : 200,
        y : 0,
        z : -60,
    },
    {
        x : 400,
        y : 0,
        z : -120,
    }
]

// 定时参数
var playSlideshowInterval = null
// 用于确定轮播位置
var nSlideshow = 0

// 点击更新 播放列表 并播放
var AddFromSlideshow = function(index) {
    var addMusic = onlineList[index]
    for (var i = 0; i < musicList.length; i++) {
        var music = musicList[i].music
        if (music === addMusic.music) {
            cutPlay(musicList[i], i)
            return
        }
    }

    musicList.push(addMusic)
    updateMusicList()
    var n = musicList.length - 1
    cutPlay(addMusic, n)
}

// 根据点击对象取得 index
var indexOf = function(e) {
    var id = e.id
	var ids = id.split('-')
	var index = parseInt(ids[ids.length - 1])
    return index
}

// 根据点击对象设置位置
var setPos = function(e) {
    var target = e.target
    var isPhoto = target.classList.contains('photo')
    if (isPhoto) {
        var index = indexOf(target)
        var pos = ((2 - index) + 5) % photos.length
        nSlideshow = changePos(pos)
        AddFromSlideshow(index)
    }
}

// 改变位置
var changePos = function(nSlideshow) {
    for (var i = 0; i < photos.length; i++) {
        photos[i].style.transform = `translate3d(${position[nSlideshow].x}px, ${position[nSlideshow].y}px, ${position[nSlideshow].z}px)`
        nSlideshow++
        nSlideshow %= photos.length
    }
    nSlideshow++
    nSlideshow %= photos.length
    return nSlideshow
}

// 播放图片
var playSlideshow = function() {
    clearInterval(playSlideshowInterval)
    playSlideshowInterval = setInterval(function(){
        nSlideshow = changePos(nSlideshow)
    }, 3000)
}

// 停止播放
var stopSlideshow = function() {
    clearInterval(playSlideshowInterval)
}

// 绑定事件
var bindSlideshowEvent = function() {
    container.addEventListener('mouseout', function(){
        playSlideshow()
    })
    container.addEventListener('mouseover', function(){
        stopSlideshow()
    })
    container.addEventListener('click', setPos)
}

// 设置背景
var setBackground = function() {
    var slideshow = e('#id-slideshow')
    var photos = findAll(slideshow, 'span')
    for (var i = 0; i < photos.length; i++) {
        var basePath = 'img/'
        var music = onlineList[i]
        var path = basePath + music.imgPath
        photos[i].style.backgroundImage = `url(${path})`
        var a = find(photos[i], 'a')
        a.innerHTML = `${music.name}--${music.singer}`
    }
}

var __slideshowMain = function() {
    setBackground()
    bindSlideshowEvent()
    playSlideshow()
    nSlideshow = changePos(nSlideshow)
}

__slideshowMain()
