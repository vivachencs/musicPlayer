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
    log('play')
    playStatus = true
    var down = e('#id-down')
    var downTrans = 'translateX(-50%) rotateZ(-50deg)'
    log('down', down)
    var player = e('#id-audio-player')
    var delay = 400
    var playButton = e('#id-img-play')
    playButton.src = 'img/stop2.png'
    initCustomProps(player, 'playTimeout')
    down.style.transform = downTrans
    setTimeout(rotateCD, delay)
    player.playTimeout = setTimeout(playMusic, delay)
}

var stop = function() {
    log('stop')
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

var cutPlay = function(music, n) {

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

var init = function() {
    playStatus = false
    bindEventPlay()
    bindEventPage()
}

init()
