const btn = document.querySelector('.btn')
const map = document.querySelector('#mapid')


document.addEventListener('DOMContentLoaded', inicioApp)


btn.addEventListener('click', function () {
    const search = document.querySelector('.search').value
    if (search === '') {
        const alerta = document.querySelector('.alerta')
        alerta.classList.add('error')
        alerta.textContent = 'Empty fields'

        setTimeout(() => {
            alerta.classList.remove('error')
            alerta.textContent = ''
        }, 2000);
        inicioApp()
        return
    }
    else {
        updateIP(search)
    }
});


function inicioApp() {
    const urlUser = `https://api.ipify.org?format=json`
    fetch(urlUser)
        .then(resp => resp.json())
        .then(data => {
            ipAddress = data.ip
            fetch(` https://geo.ipify.org/api/v1?apiKey=at_71YxAm5b7lW0RdOjIHKBWThPwDo4U&ipAddress=${ipAddress}`)
                .then(resp => resp.json())
                .then(data => {

                    const ip = document.querySelector('.showIp')
                    ip.innerText = data.ip

                    const location = document.querySelector('.showLocation')
                    location.innerText = data.location.region

                    const timezone = document.querySelector('.showTimezone')
                    timezone.innerText = data.location.timezone

                    const isp = document.querySelector('.showIsp')
                    isp.innerText = data.isp
                    getMap(data.location.lat, data.location.lng)
                })
        })
}


function updateIP(ip) {

    const url = ` https://geo.ipify.org/api/v1?apiKey=at_71YxAm5b7lW0RdOjIHKBWThPwDo4U&ipAddress=${ip}`
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            if (data.ip) {
                const ip = document.querySelector('.showIp')
                ip.innerText = data.ip

                const location = document.querySelector('.showLocation')
                location.innerText = data.location.region

                const timezone = document.querySelector('.showTimezone')
                timezone.innerText = data.location.timezone

                const isp = document.querySelector('.showIsp')
                isp.innerText = data.isp
                getMap(data.location.lat, data.location.lng)
            }
            else {
                const alerta = document.querySelector('.alerta')
                alerta.classList.add('error')
                alerta.textContent = 'Invalid IP'

                setTimeout(() => {
                    alerta.classList.remove('error')
                    alerta.textContent = ''
                }, 2000);

            }
        })
}

function getMap(lat, lng) {

    var container = L.DomUtil.get('mapid')
    if (container != null) {
        container._leaflet_id = null;
    }
    const map = L.map('mapid').setView([lat, lng], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .openPopup();
}

