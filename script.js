const sanitizeWaktuSolat = (waktusolat) => {
    let ws = {}
    let matches = []
    let prevTime
    let date1
    let date2

    for (let waktu in waktusolat) {
        matches = waktusolat[waktu].match(/(\w+)\W(\w+)/)
        ws[waktu] = `${matches[1]}:${matches[2]}`

        if (prevTime) {
            date1 = new Date(`23 Oct 1994 ${ws[prevTime]}:00`)
            date2 = new Date(`23 Oct 1994 ${ws[waktu]}:00`)

            if (date1 > date2) {
                ws[waktu] = `${Number(matches[1]) + 12}:${matches[2]}`
            }
        }

        prevTime = waktu
    }

    return ws
}

const generateIndicators = (data) => {
    let waktusolat = {
        Subuh: data.prayerTime[0].fajr,
        Syuruk: data.prayerTime[0].syuruk,
        Zuhur: data.prayerTime[0].dhuhr,
        Asar: data.prayerTime[0].asr,
        Maghrib: data.prayerTime[0].maghrib,
        Isyak: data.prayerTime[0].isha,
    }
    waktusolat = sanitizeWaktuSolat(waktusolat)
    let timeline = document.getElementById("timeline")

    document.getElementById("location").innerText = data.zone
    document.getElementById(
        "updateinfo"
    ).innerText = `Dikemas kini: ${data.serverTime}`
    document.getElementById("tarikhhijrah").innerText = data.prayerTime[0].hijri
    offsetIndicator(new Date(), currenttime, true)
    window.scrollTo(0, offset + 40 - window.innerHeight / 2)

    for (let waktu in waktusolat) {
        let value = waktusolat[waktu]
        let indicator = document.createElement("div")
        let display = document.createElement("span")
        let solattime = `23 Oct 1994 ${value}:00`

        indicator.className = "s indicator"
        indicator.id = waktu
        display.className = "display waktusolat"
        display.innerText = value

        indicator.appendChild(display)
        offsetIndicator(new Date(solattime), indicator)
        timeline.appendChild(indicator)
    }

    window.setInterval(() => {
        offsetIndicator(new Date(), currenttime, true)
    }, 1000)

    document.getElementById("overlay").style.display = "none"
    document.getElementsByClassName("spinner")[0].style.display = "none"
}

let currenttime = document.getElementById("currenttime")

for (let i = 0; i < 24; i++) {
    let dv = document.createElement("div")
    let senggat = document.createElement("div")
    let senggatpendek1 = document.createElement("div")
    let senggatpendek2 = document.createElement("div")
    let sp = document.createElement("span")

    sp.innerText = `${i > 9 ? "" : 0}${i}:00`
    dv.appendChild(sp)
    senggat.style.width = "30px"
    senggatpendek1.style.width = "15px"
    senggatpendek2.style.width = "15px"
    timeline.appendChild(dv)
    timeline.appendChild(senggatpendek1)
    timeline.appendChild(senggat)
    timeline.appendChild(senggatpendek2)
}

if (window.location.search) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url = `https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&${window.location.search.slice(1)}`
    fetch(proxyurl + url)
        .then((response) => response.text())
        .then((contents) => generateIndicators(JSON.parse(contents)))
        .catch(console.log)
} else {
    document.body.style.overflow = "hidden"
    document.getElementsByClassName("spinner")[0].style.display = "none"
}

let offset = 0
const offsetIndicator = (time, indicator, includesec) => {
    let sec =
        time.getSeconds() + time.getMinutes() * 60 + time.getHours() * 60 * 60
    offset = Math.floor((sec / 86400) * 2400)
    indicator.style.top = `${offset + 40}px`
    let timestring = `${time}`.substr(16, includesec ? 8 : 5)
    indicator.children[0].innerText = `${
        includesec ? "" : `${indicator.id} `
    }${timestring}`
}

document.getElementById("location").addEventListener("click", () => {
    let overlay = document.getElementById("overlay")
    overlay.style.display = overlay.style.display ? "" : "none"
    document.body.style.overflow = overlay.style.display ? "" : "hidden"
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
