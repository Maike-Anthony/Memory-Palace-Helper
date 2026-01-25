let list_items = JSON.parse(localStorage.getItem('list_items'))
let length = list_items.length
let images = JSON.parse(localStorage.getItem('images'))
let recalled = 0
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
    if (recalled > 0) {
        avg_time = timeToString(Math.floor(timeElapsed / recalled))
    } else {
        avg_time = '--'
    }
    document.querySelector('#avg-time').innerHTML = avg_time
}

function saveTime() {
    let recall_time = {
        'total_time': document.querySelector('#total-time').innerHTML,
        'avg_time': document.querySelector('#avg-time').innerHTML
    }
    localStorage.setItem('recall_time', JSON.stringify(recall_time))
}

function addItem(num) {
    new_item = document.createElement('div')
    new_item.className = 'item'
    new_item.innerHTML = `
        <div>Item ${num}:</div>
        <input class='user-input' data-id='${num}' type="text" placeholder="Item ${num}" autocomplete="off">
        <div class="answer" hidden>${list_items[num-1]} (${images[num-1]})</div>
        `

    document.querySelector('#all-inputs').append(new_item)
    if (num === 1) {
        document.querySelector('input').focus()
    }
}

function addAllItems() {
    for (let i = 1; i <= length; i++) {
        addItem(i)
    }
}

function check() {
    let correct = 0
    let mistakes = 0

    document.querySelectorAll('.user-input').forEach(input => {
        console.log(`"${input.value}"`,`"${list_items[Number(input.dataset.id) - 1]}"`)
        if (input.value.toLowerCase().trim() === list_items[Number(input.dataset.id)-1].toLowerCase().trim()) {
            input.style.backgroundColor = 'rgb(106, 255, 106)';
            correct++;
        } else {
            input.style.backgroundColor = 'rgb(255, 74, 74)';
            input.parentElement.querySelector('.answer').hidden = false;
            mistakes++;
        }
    })
    let accuracy = (correct / (correct + mistakes) * 100).toFixed(2)

    if (document.documentElement.lang === 'en') {
        document.querySelector('#correct-score').innerHTML = `Correct Items: ${correct}`
        document.querySelector('#mistake-score').innerHTML = `Mistakes: ${mistakes}`
        document.querySelector('#accuracy-score').innerHTML = `Accuracy: ${accuracy}%`
    } else {
        document.querySelector('#correct-score').innerHTML = `Itens Corretos: ${correct}`
        document.querySelector('#mistake-score').innerHTML = `Erros: ${mistakes}`
        document.querySelector('#accuracy-score').innerHTML = `Taxa de Acertos: ${accuracy}%`
    }

    document.querySelector('#scoreboard').hidden = false

    let scoreboard = {
        'correct': correct,
        'mistakes': mistakes,
        'accuracy': accuracy
    }
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard))
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#scoreboard').hidden = true
    hide_time_btn = document.querySelector('#hide-time')
    if (document.documentElement.lang === 'en') {
        hide_time_btn.innerHTML = 'Hide'
    } else {
        hide_time_btn.innerHTML = 'Ocultar'
    }
    myTimer = setInterval(tick, 1000)

    addAllItems()

    hide_time_btn.onclick = () => {
        document.querySelector('#time-container').hidden = !document.querySelector('#time-container').hidden;
        if (document.documentElement.lang === 'en') {
            if (hide_time_btn.innerHTML === 'Hide') {
            hide_time_btn.innerHTML = 'Show'
            } else {
                hide_time_btn.innerHTML = 'Hide'
            }
        } else {
            if (hide_time_btn.innerHTML === 'Ocultar') {
            hide_time_btn.innerHTML = 'Exibir'
            } else {
                hide_time_btn.innerHTML = 'Ocultar'
            }
        }
    }

    document.addEventListener('keyup', event => {
        let currentlyFocusedElement = document.activeElement;
        if (event.key === 'Enter' && currentlyFocusedElement.hasAttribute('data-id')) {
            let cur_id = Number(currentlyFocusedElement.dataset.id)
            let next_input = document.querySelector(`[data-id="${cur_id+1}"]`)
            if (next_input) {
                next_input.focus()
            } else {
                document.querySelector('#check-answers').focus()
            }
        } else if (event.key === 'Enter' && currentlyFocusedElement.id === 'check-answers') {
            document.querySelector('#next-page').focus()
        }

        let temp_recalled = 0;
        document.querySelectorAll('.user-input').forEach(input => {
            if (input.value != '') {
                temp_recalled++;
            }
        })
        recalled = temp_recalled
    })

    document.querySelector('#check-answers').onclick = () => {
        check()
        clearInterval(myTimer)
        saveTime()
    }

})