// 播放音乐
var playMusic = function() {
    var player = e('#id-audio-player')
    player.play()
}

// 停止播放
var stopMusic = function() {
    var player = e('#id-audio-player')
    player.pause()
}

// 旋转CD
var rotateCD = function() {
    var cd = e('#id-rotate-cd')
    initCustomProps(cd, 'interval')

    if (cd.dregree === undefined) {
        cd.dregree = 0
    }

    clearInterval(cd.interval)
    cd.interval = setInterval(function(){
        cd.dregree = (cd.dregree + 0.25) % 360
        var style = `translateX(-50%) translateY(-50%) rotateZ(${cd.dregree}deg)`
        cd.style.transform = style
    }, 20)
}

var play = function() {
    playStatus = true
    var down = e('#id-down')
    var player = e('#id-audio-player')
    var playButton = e('#id-img-play')

    var downTrans = 'translateX(-50%) rotateZ(-50deg)'
    var delay = 400

    down.style.transform = downTrans
    initCustomProps(player, 'playTimeout')
    playButton.src = 'img/stop2.png'

    setTimeout(rotateCD, delay)
    player.playTimeout = setTimeout(playMusic, delay)

    // 绑定进度条事件
    // bindEventPlayProgress()
    // 显示时间
    showTime()
}

var stop = function() {
    playStatus = false
    var cd = e('#id-rotate-cd')
    var down = e('#id-down')
    var playButton = e('#id-img-play')

    clearInterval(cd.interval)

    var downTrans = 'translateX(-50%) rotateZ(-20deg)'
    down.style.transform = downTrans

    playButton.src = 'img/play2.png'
    stopMusic()
}

// 重置 CD 位置
var resetCD = function() {
    var cd = e('#id-rotate-cd')
    var style = `translateX(-50%) translateY(-50%) rotateZ(0deg)`
    cd.dregree = 0
    cd.style.transform = style
}

var time = function(t) {
    var sec = Math.floor(t % 60)
    var min = Math.floor(t / 60)
    if (sec < 10) {
        sec = '0' + sec
    }
    if (min < 10) {
        min = '0' + min
    }
    return `${min}:${sec}`
}

var showTime = function() {
    var player = e('#id-audio-player')
    var currentTimeSpan = e('#id-current-time')
    var durationTimeSpan = e('#id-duration-time')

    initCustomProps(player, 'show')
    clearInterval(player.show)
    player.show = setInterval(function(){
        var durationTime = player.duration
        var currentTime = player.currentTime
        if (durationTime != '' && currentTime != '') {
            currentTimeSpan.innerHTML = time(currentTime)
            durationTimeSpan.innerHTML = time(durationTime)
        }
        // showProgrss()
    }, 100)
}

// 绑定播放事件
var bindEventPlay = function() {
    var pre = e('#id-img-pre')
    var next = e('#id-img-next')
    var playButton = e('#id-img-play')
    bindEvent(playButton, 'click', function(){
        if (playStatus === false) {
            playStatus = true
            play()
        } else {
            playStatus = false
            stop()
        }
    })
}

// 绑定换页事件
var bindEventPage = function() {
    var page0 = e('#id-page-0')
    var page1 = e('#id-page-1')
    var preButton = e('#id-pre-page')
    var nextButton = e('#id-next-page')

    bindEvent(preButton, 'click', function(){
        page0.style.left = '50%'
        page0.style.opacity = '1'
        page1.style.right = '-300%'
        page1.style.opacity = '0'
        preButton.style.opacity = '0'
        nextButton.style.opacity = '1'
    })
    bindEvent(nextButton, 'click', function(){
        page0.style.left = '-300%'
        page0.style.opacity = '0'
        page1.style.right = '50%'
        page1.style.opacity = '1'
        preButton.style.opacity = '1'
        nextButton.style.opacity = '0'
        scrollTo(0, 0)
    })
}

var bindEventPlayPattern = function() {
    var musicOrder = e('#id-music-order')
    bindEvent(musicOrder, 'click', function(){
        var basePath = 'img/'

    })
}

var init = function() {
    playStatus = false
    bindEventPlay()
    bindEventPage()
}

init()
