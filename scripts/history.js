let history = JSON.parse(localStorage.getItem('history'))
if (history === null) {
    history = []
}

function writeCsvString(dic) {
    let csv_str = '#html:true';
    let length = dic.list_items.length;

    if (document.documentElement.lang === 'en') {
        for (let i = 0; i < length; i++) {
            csv_str += `\n${dic.loci[i]},${dic.list_items[i]}<br><br><details><summary>Image</summary>${dic.images[i]}</details>`;
        }
    } else {
        for (let i = 0; i < length; i++) {
            csv_str += `\n${dic.loci[i]},${dic.list_items[i]}<br><br><details><summary>Imagem</summary>${dic.images[i]}</details>`;
        }
    }

    return csv_str;
}

function downloadCsv(i) {
    let hiddenA = document.createElement('a');
    hiddenA.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(writeCsvString(history[i]));
    hiddenA.download = `AnkiFlashcards_${history[i].list_name}.csv`;
    hiddenA.click();
}

function writeTable(i) {
    let list_items = history[i].list_items
    let loci = history[i].loci
    let images = history[i].images

    const table = document.querySelector(`[data-id="${i}"]`).querySelector('table')

    for (const [index, item] of list_items.entries()) {
        let new_row = document.createElement('tr')
        new_row.innerHTML = `
        <td>${item}</td>
        <td>${loci[index]}</td>
        <td>${images[index]}</td>
        `

        table.append(new_row)
    }
}

function again(address, index) {
    let type = ''
    if (document.documentElement.lang === 'en') {
        if (address === 'memorize') {
            type = 'Memorized again:'
        } else {
            type = 'Recalled again:'
        }
        address = `${address}.html`
    } else {
        if (address === 'memorize') {
            type = 'Memorizado novamente:'
        } else {
            type = 'Relembrado novamente:'
        }
        address = `${address}_pt-br.html`
    }
    let list_name = history[index].list_name
    let date = new Date()
    let now_time = date.toLocaleString()
    list_name = `${list_name} (${type} ${now_time})`
    let list_items = history[index].list_items
    let loci = history[index].loci
    let images = history[index].images

    localStorage.setItem('list_name', list_name)
    localStorage.setItem('list_items', JSON.stringify(list_items))
    localStorage.setItem('loci', JSON.stringify(loci))
    localStorage.setItem('images', JSON.stringify(images))

    localStorage.removeItem('resume')

    window.location.href = address
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.documentElement.lang === 'en') {
        if (history.length === 0) {
            document.querySelector('#container').querySelector('p').innerText = 'You have not finished any memorization session yet.'
        } else {
            document.querySelector('#container').querySelector('p').innerText = 'You can see your previous memorization sessions below:'
        }
    } else {
        if (history.length === 0) {
            document.querySelector('#container').querySelector('p').innerText = 'Você ainda não terminou nenhuma sessão de memorização.'
        } else {
            document.querySelector('#container').querySelector('p').innerText = 'Você pode encontrar as suas sessões de memorização anteriores abaixo:'
        }
    }

    for (let i = history.length - 1; i > -1; i--) {
        let session = document.createElement('div')
        session.className = 'session'
        session.dataset.id = `${i}`
        if (document.documentElement.lang === 'en') {
            session.innerHTML = `
            <details>
                <summary class="list-name"><span class="name-span">List Name: ${history[i].list_name}</span><span class="name-input-span" hidden><input class="name-input" value="${history[i].list_name}" type="text"></span></summary>
                <ul>
                    <li>Memorization
                        <ul>
                            <li>Number of items: ${history[i].list_items.length}</li>
                            <li>Total time: ${history[i].memorize_time.total_time}</li>
                            <li>Time/item: ${history[i].memorize_time.avg_time}</li>
                        </ul>
                        <button class="memorize-again">Memorize Again</button>
                    </li>
                    <li>Recall
                        <ul>
                            <li>Total time: ${history[i].recall_time.total_time}</li>
                            <li>Time/item: ${history[i].recall_time.avg_time}</li>
                            <li>Correct items: ${history[i].scoreboard.correct}</li>
                            <li>Mistakes: ${history[i].scoreboard.mistakes}</li>
                            <li>Accuracy: ${history[i].scoreboard.accuracy} %</li>
                        </ul>
                        <button class="recall-again">Recall Again</button>
                    </li>
                    <li>
                        <details>
                            <summary>List</summary>
                            <table>
                                <tr>
                                    <th>Item</th>
                                    <th>Locus</th>
                                    <th>Image</th>
                                </tr>
                            </table>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>Delete this session</summary>
                            <p>You can delete this memorization session by clicking the button below. This action cannot be undone.</p>
                            <button class="delete-session-btn">Delete</button>
                        </details>
                    </li>
                </ul>
                <button class="download-btn">Download Flashcards</button>
            </details>
            `
        } else {
            session.innerHTML = `
            <details>
                <summary class="list-name"><span class="name-span">Nome da Lista: ${history[i].list_name}</span><span class="name-input-span" hidden><input class="name-input" value="${history[i].list_name}" type="text"></span></summary>
                <ul>
                    <li>Memorização
                        <ul>
                            <li>Número de itens: ${history[i].list_items.length}</li>
                            <li>Tempo total: ${history[i].memorize_time.total_time}</li>
                            <li>Tempo/item: ${history[i].memorize_time.avg_time}</li>
                        </ul>
                        <button class="memorize-again">Memorize Novamente</button>
                    </li>
                    <li>Relembrar
                        <ul>
                            <li>Tempo total: ${history[i].recall_time.total_time}</li>
                            <li>Tempo/item: ${history[i].recall_time.avg_time}</li>
                            <li>Itens Corretos: ${history[i].scoreboard.correct}</li>
                            <li>Erros: ${history[i].scoreboard.mistakes}</li>
                            <li>Taxa de Acertos: ${history[i].scoreboard.accuracy} %</li>
                        </ul>
                        <button class="recall-again">Relembre Novamente</button>
                    </li>
                    <li>
                        <details>
                            <summary>Lista</summary>
                            <table>
                                <tr>
                                    <th>Item</th>
                                    <th>Locus</th>
                                    <th>Imagem</th>
                                </tr>
                            </table>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>Deletar esta sessão</summary>
                            <p>Você pode deletar esta sessão de memorização clicando no botão abaixo. Esta ação não pode ser desfeita.</p>
                            <button class="delete-session-btn">Deletar</button>
                        </details>
                    </li>
                </ul>
                <button class="download-btn">Baixar Flashcards</button>
            </details>
            `
        }

        document.querySelector('#all-sessions').append(session)
    }

    document.querySelectorAll('.list-name').forEach(element => {
        let new_name_btn = document.createElement('button')
        new_name_btn.innerHTML = '✏️'
        new_name_btn.className = 'new-name-btn'
        element.append(new_name_btn)
    })

    document.querySelectorAll('.new-name-btn').forEach(btn => {
        btn.onclick = () => {
            let session = btn.closest('.session')
            let i = session.dataset.id
            session.querySelector('.name-input-span').hidden = !session.querySelector('.name-input-span').hidden
            session.querySelector('.name-span').hidden = !session.querySelector('.name-span').hidden

            if (btn.innerHTML === '✏️') {
                btn.innerHTML = '✅'
            } else {
                btn.innerHTML = '✏️'
            }

            if (!session.querySelector('.name-input-span').hidden) {
                session.querySelector('.name-input').focus()
            }

            if (session.querySelector('.name-input-span').hidden) {
                let new_name = session.querySelector('input').value
                if (document.documentElement.lang === 'en') {
                    session.querySelector('.name-span').innerHTML = `List Name: ${new_name}`
                } else {
                    session.querySelector('.name-span').innerHTML = `Nome da Lista: ${new_name}`
                }
                history[i].list_name = new_name
                localStorage.setItem('history', JSON.stringify(history))
            }
        }
    })

    document.addEventListener('keyup', event => {
        if (event.target.className === 'name-input' && event.key === 'Enter') {
            event.target.closest('.list-name').querySelector('.new-name-btn').click()
        }
    })

    document.querySelectorAll('.session').forEach(element => {
        writeTable(element.dataset.id)
    })

    document.querySelectorAll('.download-btn').forEach(button => {
        button.onclick = () => {
            let i = button.closest('.session').dataset.id
            downloadCsv(i)
        }
    })

    document.querySelectorAll('.memorize-again').forEach(button => {
        button.onclick = () => {
            let i = button.closest('.session').dataset.id
            again('memorize', i)
        }
    })

    document.querySelectorAll('.recall-again').forEach(button => {
        button.onclick = () => {
            let i = button.closest('.session').dataset.id
            again('recall', i)
        }
    })

    document.querySelectorAll('.delete-session-btn').forEach(button => {
        button.onclick = () => {
            let new_history = history.filter((_, index) => index !== Number(button.closest('.session').dataset.id))
            localStorage.setItem('history', JSON.stringify(new_history))
            button.closest('.session').classList.add('animate-delete')
            button.closest('.session').addEventListener('animationend', () => {
                button.closest('.session').remove()
                if (document.documentElement.lang === 'en') {
                    window.location.href = 'history.html'
                } else {
                    window.location.href = 'history_pt-br.html'
                }
            })
        }
    })
})