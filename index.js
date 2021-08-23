
let nameSong = document.querySelector('header h2')
let cdThumb = document.querySelector('.cd-thumb')
let btnHeart = document.querySelector('.list-heart')
let btnRepeat = document.querySelector('.btn-repeat')
let btnRandom = document.querySelector('.btn-random')
let btnNext = document.querySelector('.btn-next')
let btnPrev = document.querySelector('.btn-prev')
let btnPlay = document.querySelector('.btn-toggle-play')
let playing = document.querySelector('.player')
let audio = document.querySelector('#audio')
let progress = document.querySelector('#progress')

const app = {
    songs: [
        {
            name: 'Chúng Ta Của Hiện Tại',
            singger: 'Sơn Tùng MT-P',
            path: './songs/ChungTaCuaHienTai.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b2735888c34015bebbf123957f6d',
        }, {
            name: 'Peaches',
            singger: 'Justin Bieber',
            path: './songs/Peaches.mp3',
            image: 'https://i1.sndcdn.com/artworks-ukJNA4Y34ty2Rz4K-yRl1ug-t500x500.jpg',
        }, {
            name: '3107-3',
            singger: 'Wn/Nâu',
            path: './songs/3107.mp3',
            image: 'https://data.chiasenhac.com/data/cover/145/144390.jpg',
        }, {
            name: 'Cheating On You',
            singger: 'Charlie Puth',
            path: './songs/CheatingOnYou.mp3',
            image: 'https://i1.sndcdn.com/artworks-000606602386-58veao-t500x500.jpg',
        }, {
            name: 'Có Hẹn Với Thanh Xuân',
            singger: 'Monstar',
            path: './songs/CoHenVoiThanhXuan.mp3',
            image: 'https://i.ytimg.com/vi/vpRi8S6uXAg/maxresdefault.jpg',
        }, {
            name: 'Life Is Good',
            singger: 'Future ft Drake',
            path: './songs/LifeIsGood.mp3',
            image: 'https://i1.sndcdn.com/artworks-000678235315-d08i0h-t500x500.jpg',
        }, {
            name: 'Still With You',
            singger: 'Jung Kook',
            path: './songs/StillWithYou.mp3',
            image: 'https://i.pinimg.com/originals/d4/79/1d/d4791d579cfb211a533e29ad26ddd6b8.png',
        }, {
            name: 'Soft Lips',
            singger: 'Blank Check',
            path: './songs/SoftLips.mp3',
            image: 'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/14/49/3e/14493e44-9fd5-d860-35f5-00b5c16ed44a/4062994881580_cover.jpg/400x400cc.jpg',
        }, {
            name: 'Nothing On You',
            singger: 'Barry Brizzy',
            path: './songs/NothingOnYou.mp3',
            image: 'https://i.ytimg.com/vi/iHi8sSK5dVY/maxresdefault.jpg',
        }, {
            name: 'Muộn rồi mà sao còn',
            singger: 'Sơn Tùng MT-P',
            path: './songs/MuonRoiMaSaoCon.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b27329f906fe7a60df7777b02ee1',
        },
    ],
    indexSong: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isPlayListHeart: false,
    songNow: function () {
        let songPlaying = this.songs[this.indexSong]
        nameSong.innerText = songPlaying.name
        cdThumb.style.backgroundImage = `url(${songPlaying.image})`
        audio.src = songPlaying.path
        this.renderTime()
    },
    render: function () {
        let htmls = this.songs.map((song, index) => {
            return `
            <div class="song" id="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singger}</p>
                </div>
                <div class="option">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            `
        })
        document.querySelector('.playlist').innerHTML = htmls.join(' ')
        this.songNow()
    },
    renderTime: function () {
        let runTime = document.querySelector('.run-time')
        let totalTime = document.querySelector('.total-time')

        runTime.innerText = '00:00'
        totalTime.innerText = '00:00'
        audio.onloadeddata = function () {
            let min = Math.floor(audio.duration / 60)
            min = min < 9 ? '0' + min : min
            let seconds = Math.floor(audio.duration % 60)
            seconds = seconds < 9 ? '0' + seconds : seconds
            totalTime.innerText = min + ':' + seconds
        }
    },
    events: function () {
        _this = this
        // zoom in-out
        let cd = document.querySelector('.cd')
        if (cd) {
            let cdWidth = cd.offsetWidth
            document.onscroll = function () {
                let scrollTop = document.documentElement.scrollTop
                cd.style.width = scrollTop > cdWidth ? 0 : cdWidth - scrollTop + 'px'
                cd.style.opacity = (cdWidth - scrollTop) * 1.5 / cdWidth
            }
        }
        // xoay dia
        let cdAnimated = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 20000,
            iterations: Infinity
        })
        cdAnimated.pause()
        // play - pause
        let songs = document.querySelectorAll('.song')
        function play() {
            audio.play()
            cdAnimated.play()
            playing.classList.add('playing')
            songs.forEach(song => {
                if (song.getAttribute('id') == _this.indexSong) {
                    song.classList.add('active')
                } else {
                    song.classList.remove('active')
                }
            })
            _this.isPlaying = true
        }

        function pause() {
            audio.pause()
            cdAnimated.pause()
            playing.classList.remove('playing')
            _this.isPlaying = false
        }

        btnPlay.onclick = function () {
            if (_this.isPlaying) {
                pause()
            } else {
                if (audio.currentTime > 0) {
                    audio.play()
                    cdAnimated.play()
                    _this.isPlaying = true
                    playing.classList.add('playing')
                } else {
                    if (!(_this.isPlayListHeart && listHeart.length == 0)) {
                        if (_this.isPlayListHeart) {
                            _this.indexSong = listHeart[indexHeart]
                        }
                        _this.songNow()
                        play()
                    } else {
                        alert("Hiện không có bài hát nào trong danh sách yêu thích !!!")
                    }
                }
            }
        }

        // onchange
        let runTime = document.querySelector('.run-time')
        audio.ontimeupdate = function () {
            audio.duration ? progress.value = audio.currentTime / audio.duration * 1000 : 0
            progress.onchange = function () {
                audio.currentTime = progress.value * audio.duration / 1000
            }
            let min = Math.floor(audio.currentTime / 60)
            min = min < 9 ? '0' + min : min
            let seconds = Math.floor(audio.currentTime % 60)
            seconds = seconds < 9 ? '0' + seconds : seconds
            runTime.innerText = min + ':' + seconds
        }

        // next - prev
        function nextSong() {
            if (!_this.isPlayListHeart) {
                if (_this.songs.length - 1 == _this.indexSong) {
                    _this.indexSong = 0
                } else {
                    _this.indexSong++
                }
            } else {
                if (indexHeart == listHeart.length - 1) {
                    indexHeart = 0
                } else {
                    indexHeart++
                }
                _this.indexSong = listHeart[indexHeart]
            }
            _this.songNow()
            play()
        }

        function prevSong() {
            if (!_this.isPlayListHeart) {
                if (_this.indexSong == 0) {
                    _this.indexSong = _this.songs.length - 1
                } else {
                    _this.indexSong--
                }
            } else {
                if (indexHeart == 0) {
                    indexHeart = listHeart.length - 1
                } else {
                    indexHeart--
                }
                _this.indexSong = listHeart[indexHeart]
            }
            _this.songNow()
            play()
        }
        btnNext.onclick = function () {
            nextSong()
        }

        btnPrev.onclick = function () {
            prevSong()
        }

        // random
        let listed = []
        function random() {
            if (!_this.isPlayListHeart) {
                if (listed.length == _this.songs.length - 1) {
                    listed = []
                }
                listed.push(_this.indexSong)
                _this.indexSong = Math.floor(Math.random() * _this.songs.length);
                while (listed.includes(_this.indexSong)) {
                    _this.indexSong = Math.floor(Math.random() * _this.songs.length);
                }
            } else {
                if (listed.length == listHeart.length - 1) {
                    listed = []
                }
                listed.push(indexHeart)
                indexHeart = Math.floor(Math.random() * listHeart.length);
                while (listed.includes(indexHeart)) {
                    indexHeart = Math.floor(Math.random() * listHeart.length);
                }
                _this.indexSong = listHeart[indexHeart]
            }
            _this.songNow()
            play()
        }
        btnRandom.onclick = function () {
            if (!_this.isRandom) {
                _this.isRandom = true
                _this.isRepeat = false
                btnRepeat.classList.remove('active')
                random()
            } else {
                _this.isRandom = false
            }
            btnRandom.classList.toggle('active')
        }
        //repeat
        btnRepeat.onclick = () => {
            if (!_this.isRepeat) {
                _this.isRandom = false
                _this.isRepeat = true
                btnRandom.classList.remove('active')
                play()
            } else {
                _this.isRepeat = false
            }
            btnRepeat.classList.toggle('active')
        }

        //click song
        songs.forEach(song => {
            song.onclick = () => {
                _this.indexSong = song.getAttribute('id')
                _this.songNow()
                play()
            }
        })


        // dark mode
        let body = document.querySelector('body')
        let btnMode = document.querySelector('.dark-mode input')
        btnMode.onclick = function () {
            body.classList.toggle('dark')
            let textMode = document.querySelector('.dark .dark-mode p')
            if (textMode) {
                textMode.innerText = 'Light'
            } else {
                textMode = document.querySelector('.dark-mode p')
                textMode.innerText = 'Dark'
            }
        }

        // thả tim
        let hearts = document.querySelectorAll('.option')
        let listHeart = []
        hearts.forEach(heart => {
            heart.onclick = function () {
                heart.classList.toggle('heart')
                event.stopPropagation()
                let id = heart.parentElement.getAttribute('id')

                if (listHeart.includes(id)) {
                    let arr = []
                    for (let i = 0; i < listHeart.length; i++) {
                        if (listHeart[i] != id) {
                            arr.push(listHeart[i])
                        }
                    }
                    listHeart = [...arr]
                } else {
                    listHeart.push(id)
                }
            }
        })

        // play list heart
        let indexHeart = 0
        btnHeart.onclick = function () {
            if (!_this.isPlayListHeart) {
                _this.isPlayListHeart = true
                if (listHeart.length > 0) {
                    _this.indexSong = listHeart[indexHeart]
                    _this.songNow()
                    play()
                }
            } else {
                _this.isPlayListHeart = false
            }
            btnHeart.classList.toggle('play-list-heart')
        }


        // auto play
        audio.onended = () => {
            if (_this.isRandom) {
                random()
            } else if (_this.isRepeat) {
                play()
            } else if (_this.isPlayListHeart) {
                if (listHeart.length > 0) {
                    if (indexHeart == listHeart.length - 1) {
                        indexHeart = 0
                    } else {
                        indexHeart++
                    }
                    _this.indexSong = listHeart[indexHeart]
                    _this.songNow()
                    play()
                }
            } else {
                nextSong()
            }
        }
    },
    start: function () {
        this.renderTime()
        this.render()
        this.events()
    }
}

app.start()