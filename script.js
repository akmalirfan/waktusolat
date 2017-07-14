let xhr = new XMLHttpRequest()

xhr.open('GET', `waktusolat.php${window.location.search}`)
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let oParser = new DOMParser()
        generateIndicators(oParser.parseFromString(xhr.responseText, 'text/xml'))
    }
}

if (window.location.search) {
    xhr.send()
} else {
    document.body.style.overflow = 'hidden'
    document.getElementsByClassName('spinner')[0].style.display = 'none'
}

const generateIndicators = (data) => {
    let table = document.createElement('table')
    let esolatdate = data.documentElement.children[0].children[6].innerHTML
    let waktusolat = data.documentElement.children[0].getElementsByTagName('item')
    let location = data.documentElement.children[0].children[1].innerHTML
    let timeline = document.getElementById('timeline')

    document.getElementById('location').innerText = location
    document.getElementById('updateinfo').innerText = `Dikemas kini: ${esolatdate}`
    // let timediff = Date.now() - Date.parse(esolatdate)
    // offsetIndicator(new Date(Date.now() - timediff), currenttime, true)
    offsetIndicator(new Date(), currenttime, true)
    window.scrollTo(0, offset + 40 - window.innerHeight / 2)

    for (waktu of waktusolat) {
        let name = waktu.children[0].innerHTML
        let value = waktu.children[1].innerHTML
        let indicator = document.createElement('div')
        let display = document.createElement('span')
        let solattime = `23 Oct 1994 ${value}:00`

        indicator.className = 's indicator'
        indicator.id = name
        display.className = 'display waktusolat'
        display.innerText = value

        indicator.appendChild(display)
        offsetIndicator(new Date(solattime), indicator)
        timeline.appendChild(indicator)
    }

    window.setInterval(() => {
        // offsetIndicator(new Date(Date.now() - timediff), currenttime, true)
        offsetIndicator(new Date(), currenttime, true)
    }, 1000);

    document.getElementById('overlay').style.display = 'none'
    document.getElementsByClassName('spinner')[0].style.display = 'none'
}

let currenttime = document.getElementById('currenttime')

for (let i = 0; i < 24; i++) {
    let dv = document.createElement('div')
    let senggat = document.createElement('div')
    let senggatpendek1 = document.createElement('div')
    let senggatpendek2 = document.createElement('div')
    let sp = document.createElement('span')

    sp.innerText = `${i > 9 ? '' : 0}${i}:00`
    dv.appendChild(sp)
    senggat.style.width = '30px'
    senggatpendek1.style.width = '15px'
    senggatpendek2.style.width = '15px'
    timeline.appendChild(dv)
    timeline.appendChild(senggatpendek1)
    timeline.appendChild(senggat)
    timeline.appendChild(senggatpendek2)
}

let offset = 0
const offsetIndicator = (time, indicator, includesec) => {
    let sec = time.getSeconds() + time.getMinutes() * 60 + time.getHours() * 60 * 60
    offset = Math.floor(sec / 86400 * 2400)
    indicator.style.top = `${offset + 40}px`
    let timestring = `${time}`.substr(16, includesec ? 8 : 5)
    indicator.children[0].innerText = `${includesec ? '' : `${indicator.id} `}${timestring}`
}

document.getElementById('location').addEventListener('click', () => {
    let overlay = document.getElementById('overlay')
    overlay.style.display = overlay.style.display ? '' : 'none'
    document.body.style.overflow = overlay.style.display ? '' : 'hidden'
})

// Untuk cuba
// let cuba = document.createElement('div')
// cuba.id = 'Cuba'
// cuba.className = 's indicator'
// let cubaspan = document.createElement('span')
// cubaspan.className = 'display waktusolat'
// cuba.appendChild(cubaspan)
// document.body.appendChild(cuba)
// offsetIndicator(new Date('07-07-2017 22:15:00'), document.getElementById('Cuba'))