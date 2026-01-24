const list_name = localStorage.getItem('list_name')
const list_items = JSON.parse(localStorage.getItem('list_items'))
let list_length = list_items.length

function count_loci() {
    let count = 0;
    document.querySelectorAll('.locus-input').forEach(input => {
        if (input.value !== '') {
            count++;
        }
    })
    return count;
}

function is_empty() {
    let empty = false;

    document.querySelector('.all-palaces-container').querySelectorAll('input').forEach(input => {
        if (empty === false && input.value === '') {
            empty = true;
        }
    })

    return empty
}

document.addEventListener("DOMContentLoaded", () => {
    const remaining_p = document.querySelector('#remaining-loci-paragraph')
    if (document.documentElement.lang === 'en') {
        remaining_p.innerHTML = `You still need to add ${list_length} more loci.`
    } else {
        remaining_p.innerHTML = `Você ainda precisa adicionar ${list_length} loci.`
    }
    const sbmt_btn = document.querySelector('#submit-loci')
    sbmt_btn.disabled = true

    if (document.documentElement.lang === 'en') {
        document.querySelector('#total-loci-paragraph').innerHTML = `The list "${list_name}" has ${list_length} items, so you need ${list_length} loci.`
    } else {
        document.querySelector('#total-loci-paragraph').innerHTML = `A lista "${list_name}" tem ${list_length} items, então você precisa de ${list_length} loci.`
    }

    document.querySelector('.add-palace').focus()

    function check_complete() {
        let total_loci = count_loci()

        if (total_loci === list_length) {
            if (is_empty()) {
                if (document.documentElement.lang === 'en') {
                    remaining_p.innerHTML = 'You have enough loci to memorize the list, but you still need to label all entries.'
                } else {
                    remaining_p.innerHTML = 'Você tem loci suficientes para memorizar a lista, mas ainda falta nomear todas as caixas de texto.'
                }
                sbmt_btn.disabled = true
            } else {
                if (document.documentElement.lang === 'en') {
                    remaining_p.innerHTML = 'You have enough loci to memorize the list.'
                } else {
                    remaining_p.innerHTML = 'Você tem loci suficientes para memorizar a lista.'
                }
                sbmt_btn.disabled = false
            }
        } else if (total_loci > list_length) {
            if (document.documentElement.lang === 'en') {
                remaining_p.innerHTML = `You have more loci than necessary. Please delete ${total_loci-list_length} loci.`
            } else {
                remaining_p.innerHTML = `Você tem mais loci do que necessário. Remova ${total_loci-list_length} loci.`
            }
            sbmt_btn.disabled = true
        } else {
            if (document.documentElement.lang === 'en') {
                remaining_p.innerHTML = `You still need to add ${list_length-total_loci} more loci.`
            } else {
                remaining_p.innerHTML = `Você ainda precisa adicionar ${list_length-total_loci} loci.`
            }
            sbmt_btn.disabled = true
        }
    }

    document.addEventListener('input', event => {
        if (event.target.matches('.palace-input, .room-input, .locus-input')) {
            check_complete()
        }
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            if (event.target.className === 'palace-input') {
                event.target.parentElement.querySelector('.add-room').click()
            } else if (event.target.className === 'room-input') {
                event.target.parentElement.querySelector('.add-locus').click()
            } else if (event.target.className === 'locus-input') {
                event.target.closest('.room-container').querySelector('.add-locus').click()
            } else {
                document.querySelector('.add-palace').click()
            }
        }
    })

    document.addEventListener('click', event => {
        const element = event.target;

        if (element.className === 'minus') {
            element.parentElement.classList.remove('animate-opacity')
            element.parentElement.classList.add('animate-disappear')
            element.parentElement.addEventListener('animationend', () => {
                element.parentElement.remove()
                check_complete()
            })
        } else if (element.className === 'add-palace') {
            const new_palace = document.createElement('div')
            new_palace.className = 'palace-container'
            if (document.documentElement.lang === 'en') {
                new_palace.innerHTML = `
                <input class="palace-input" type="text" placeholder="Palace Name">
                <button type="button" class="minus">-</button>
                <div class="all-rooms-container">
                </div>
                <button class="add-room">Add room</button>
                `
            } else {
                new_palace.innerHTML = `
                <input class="palace-input" type="text" placeholder="Nome do Palácio">
                <button type="button" class="minus">-</button>
                <div class="all-rooms-container">
                </div>
                <button class="add-room">Adicionar cômodo</button>
                `
            }

            element.parentElement.querySelector('.all-palaces-container').append(new_palace)
            new_palace.classList.add('animate-opacity')
            new_palace.querySelector('input').focus()

        } else if (element.className === 'add-room') {
            const new_room = document.createElement('div')
            new_room.className = 'room-container'
            if (document.documentElement.lang === 'en') {
                new_room.innerHTML = `
                <input class="room-input" type="text" placeholder="Room Name">
                <button type="button" class="minus">-</button>
                <div class="all-loci-container">
                </div>
                <button class="add-locus">Add locus</button>
                `
            } else {
                new_room.innerHTML = `
                <input class="room-input" type="text" placeholder="Nome do Cômodo">
                <button type="button" class="minus">-</button>
                <div class="all-loci-container">
                </div>
                <button class="add-locus">Adicionar locus</button>
                `
            }

            element.parentElement.querySelector('.all-rooms-container').append(new_room)
            new_room.classList.add('animate-opacity')
            new_room.querySelector('input').focus()

        } else if (element.className === 'add-locus') {
            const new_locus = document.createElement('div')
            new_locus.className = 'locus-container'
            if (document.documentElement.lang === 'en') {
                new_locus.innerHTML = `
                <input class="locus-input" type="text" placeholder="Locus Name">
                <button type="button" class="minus">-</button>
                `
            } else {
                new_locus.innerHTML = `
                <input class="locus-input" type="text" placeholder="Nome do Locus">
                <button type="button" class="minus">-</button>
                `
            }

            element.parentElement.querySelector('.all-loci-container').append(new_locus)
            new_locus.classList.add('animate-opacity')
            new_locus.querySelector('input').focus()

        } else if (element.id === 'submit-loci') {
            let loci = [];

            document.querySelectorAll('.locus-input').forEach(input => {
                let locus = input.value.trim();
                let room = input.closest('.room-container').querySelector('.room-input').value.trim()
                let palace = input.closest('.palace-container').querySelector('.palace-input').value.trim()
                loci.push(`${palace} > ${room} > ${locus}`)
            })
            
            localStorage.setItem('loci', JSON.stringify(loci))

            if (document.documentElement.lang === 'en') {
                window.location.href = 'memorize.html'
            } else {
                window.location.href = 'memorize_pt-br.html'
            }
        }

        check_complete()
    })
})