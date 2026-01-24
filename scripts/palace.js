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
    remaining_p.innerHTML = `You still need to add ${list_length} more loci.`
    const sbmt_btn = document.querySelector('#submit-loci')
    sbmt_btn.disabled = true

    document.querySelector('#total-loci-paragraph').innerHTML = `The list "${list_name}" has ${list_length} items, so you need ${list_length} loci.`

    document.querySelector('.add-palace').focus()

    function check_complete() {
        let total_loci = count_loci()

        if (total_loci === list_length) {
            if (is_empty()) {
                remaining_p.innerHTML = 'You have enough loci to memorize the list, but you still need to label all entries.'
                sbmt_btn.disabled = true
            } else {
                remaining_p.innerHTML = 'You have enough loci to memorize the list.'
                sbmt_btn.disabled = false
            }
        } else if (total_loci > list_length) {
            remaining_p.innerHTML = `You have more loci than necessary. Please delete ${total_loci-list_length} loci.`
            sbmt_btn.disabled = true
        } else {
            remaining_p.innerHTML = `You still need to add ${list_length-total_loci} more loci.`
            sbmt_btn.disabled = true
        }
    }

    document.addEventListener('keyup', event => {
        check_complete()

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
            new_palace.innerHTML = `
            <input class="palace-input" type="text" placeholder="Palace Name">
            <button type="button" class="minus">-</button>
            <div class="all-rooms-container">
            </div>
            <button class="add-room">Add room</button>
            `

            element.parentElement.querySelector('.all-palaces-container').append(new_palace)
            new_palace.classList.add('animate-opacity')
            new_palace.querySelector('input').focus()

        } else if (element.className === 'add-room') {
            const new_room = document.createElement('div')
            new_room.className = 'room-container'
            new_room.innerHTML = `
            <input class="room-input" type="text" placeholder="Room Name">
            <button type="button" class="minus">-</button>
            <div class="all-loci-container">
            </div>
            <button class="add-locus">Add locus</button>
            `

            element.parentElement.querySelector('.all-rooms-container').append(new_room)
            new_room.classList.add('animate-opacity')
            new_room.querySelector('input').focus()

        } else if (element.className === 'add-locus') {
            const new_locus = document.createElement('div')
            new_locus.className = 'locus-container'
            new_locus.innerHTML = `
            <input class="locus-input" type="text" placeholder="Locus Name">
            <button type="button" class="minus">-</button>
            `

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

            window.location.href = 'memorize.html'
        }

        check_complete()
    })
})