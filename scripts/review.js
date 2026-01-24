const list_name = localStorage.getItem('list_name')
const list_items = JSON.parse(localStorage.getItem('list_items'))
const loci = JSON.parse(localStorage.getItem('loci'))
const images = JSON.parse(localStorage.getItem('images'))
const memorize_time = JSON.parse(localStorage.getItem('memorize_time'))
const recall_time = JSON.parse(localStorage.getItem('recall_time'))
const scoreboard = JSON.parse(localStorage.getItem('scoreboard'))

function writeCsvString() {
    let csv_str = '#html:true';
    let length = list_items.length;

    if (document.documentElement.lang === 'en') {
        for (let i = 0; i < length; i++) {
            csv_str += `\n${loci[i]},${list_items[i]}<br><br><details><summary>Image</summary>${images[i]}</details>`;
        }
    } else {
        for (let i = 0; i < length; i++) {
            csv_str += `\n${loci[i]},${list_items[i]}<br><br><details><summary>Imagem</summary>${images[i]}</details>`;
        }
    }

    return csv_str;
}

function downloadCsv() {
    let hiddenA = document.createElement('a');
    hiddenA.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(writeCsvString());
    hiddenA.download = `AnkiFlashcards_${list_name}.csv`;
    hiddenA.click();
}

function createHistory() {
    let new_history = {
        'list_name': list_name,
        'list_items': list_items,
        'loci': loci,
        'images': images,
        'memorize_time': memorize_time,
        'recall_time': recall_time,
        'scoreboard': scoreboard
    }

    let history = [];
    if (localStorage.getItem('history') !== null) {
        history = JSON.parse(localStorage.getItem('history'))
    }

    const seen = new Set(history.map(JSON.stringify))
    const new_history_stringified = JSON.stringify(new_history)

    if (!seen.has(new_history_stringified)) {
        history.push(new_history)
    }
    localStorage.setItem('history', JSON.stringify(history))
}

document.addEventListener("DOMContentLoaded", () => {
    createHistory()

    document.querySelector('.download-btn').onclick = () => {
        downloadCsv()
    }
})