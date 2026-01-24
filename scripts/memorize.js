let list_items = JSON.parse(localStorage.getItem('list_items'))
let loci = JSON.parse(localStorage.getItem('loci'))
let length = list_items.length
let memorized = 0
let images = []
let timeElapsed = 0 
let myTimer

function timeToString(second) {
    let hour = Math.floor(second / 3600);
    second = second % 3600;
    let minute = Math.floor(second / 60);
    second = second % 60;
    let hour_str = String(hour).padStart(2, '0')
    let minute_str = String(minute).padStart(2, '0')
    let second_str = String(second).padStart(2, '0')
    return `${hour_str}:${minute_str}:${second_str}`
}

function tick() {
    timeElapsed++;

    total_time = timeToString(timeElapsed)
    document.querySelector('#total-time').innerHTML = total_time

    let avg_time
    if (memorized > 0) {
        avg_time = timeToString(Math.floor(timeElapsed / memorized))
    } else {
        avg_time = '--'
    }
    document.querySelector('#avg-time').innerHTML = avg_time
}

function saveTime() {
    let memorize_time = {
        'total_time': document.querySelector('#total-time').innerHTML,
        'avg_time': document.querySelector('#avg-time').innerHTML
    }
    localStorage.setItem('memorize_time', JSON.stringify(memorize_time))
}

function getCurMp() {
    return loci[memorized].split(' > ')[0]
}

function getCurRoom() {
    return loci[memorized].split(' > ')[1]
}

function getCurLocus() {
    return loci[memorized].split(' > ')[2]
}

function getCurItem() {
    return list_items[memorized]
}

function saveCurImage() {
    images.push(document.querySelector('.image-input').value.trim())
    memorized++
    if (memorized === length) {
        localStorage.setItem('images', JSON.stringify(images))
        clearInterval(myTimer)
        document.querySelector('#avg-time').innerHTML = timeToString(Math.floor(timeElapsed / memorized))
        saveTime()
    }
}

function addNextItem() {
    let curMp = getCurMp();
    let curRoom = getCurRoom();
    let curLocus = getCurLocus();
    let curItem = getCurItem();
    let new_item = document.createElement('div');

    new_item.className = 'cur-item';
    if (document.documentElement.lang === 'en') {
        new_item.innerHTML = `
        <p>Mentally visualize the ${curMp} and walk to the ${curLocus} in the ${curRoom}. <br> Now create a mental image happening in the ${curLocus} to represent the ${curItem} and type it in.</p>
        <div class="image-container">
            <p>${curLocus}: ${curItem}</p>
            <input class="image-input" type="text" placeholder="Type Image" autofocus autocomplete="off">
        </div>
        `
    } else {
        new_item.innerHTML = `
        <p>Visualize mentalmente o ${curMp} e caminhe até o ${curLocus} no ${curRoom}. <br> Agora crie uma imagem mental acontecendo no ${curLocus} para representar o ${curItem} e digite-a abaixo.</p>
        <div class="image-container">
            <p>${curLocus}: ${curItem}</p>
            <input class="image-input" type="text" placeholder="Digite a Imagem" autofocus autocomplete="off">
        </div>
        `
    }
    
    if (document.querySelector('#cur-item-container').innerHTML !== '') {
        document.querySelector('#cur-item-container').innerHTML = ''
    }
    document.querySelector('#cur-item-container').append(new_item)
    document.querySelector('.image-input').focus()
}

function nextBtnPressed() {
    saveCurImage()
    if (memorized === length) {
        document.querySelector('#cur-item-container').innerHTML = ''
        document.querySelector('#next-btn').hidden = true
        document.querySelector('#congratulations').hidden = false
        document.querySelector('#recall').hidden = false
        document.querySelector('#recall').focus()
    } else {
        addNextItem()
        document.querySelector('#next-btn').disabled = true
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#congratulations').hidden = true
    document.querySelector('#recall').hidden = true
    hide_time_btn = document.querySelector('#hide-time')
    hide_time_btn.innerHTML = 'Hide'
    addNextItem()
    myTimer = setInterval(tick, 1000)

    let next_btn = document.querySelector('#next-btn')
    next_btn.disabled = true

    document.addEventListener('keyup', event => {
        let input_image = document.querySelector('.image-input')
        if (event.key === 'Enter' && !next_btn.disabled) {
            nextBtnPressed()
        } else if (input_image && input_image.value === '') {
            next_btn.disabled = true
        } else if (input_image && input_image.value != '') {
            next_btn.disabled = false
        }
    })

    hide_time_btn.onclick = () => {
        document.querySelector('#time-container').hidden = !document.querySelector('#time-container').hidden;
        if (hide_time_btn.innerHTML === 'Hide') {
            hide_time_btn.innerHTML = 'Show'
        } else {
            hide_time_btn.innerHTML = 'Hide'
        }
    }

    next_btn.onclick = () => {
        nextBtnPressed()
    }

    document.querySelector('#recall').addEventListener('click', () => {
        if (document.documentElement.lang === 'en') {
            window.location.href = 'recall.html'
        } else {
            window.location.href = 'recall_pt-br.html'
        }
    })
})