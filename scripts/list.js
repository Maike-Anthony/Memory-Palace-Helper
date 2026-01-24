document.addEventListener("DOMContentLoaded", () => {
    const new_items = document.querySelector('#new-items')
    const sbmt_btn = document.querySelector('#submit-list-items')
    const name_btn = document.querySelector('#submit-list-name')
    const csv_container = document.querySelector('#csv-container')
    const alternative_container = document.querySelector('#alternative')
    const sbmt_csv = document.querySelector('#csv-submit')
    const csv_toggle_btn = document.querySelector('#csv-toggle')
    alternative_container.hidden = true
    csv_toggle_btn.disabled = true
    sbmt_csv.disabled = true
    csv_container.hidden = true
    sbmt_btn.disabled = true
    name_btn.disabled = true

    document.querySelector('#insertion').hidden = true

    function is_empty() {
        let empty = false;

        const elements = document.querySelectorAll('.new-item-input')

        if (elements.length === 0) {
            empty = true;
        } else {
            elements.forEach(input => {
                if (empty === false && input.value === '') {
                    empty = true;
                }
            })   
        }

        return empty
    }

    const plus_btn = document.querySelector('.plus')
    plus_btn.addEventListener('click', () => {
        const new_block = document.createElement('div')
        new_block.className = 'new-item-block'
        if (document.documentElement.lang === 'en') {
            new_block.innerHTML = `
            <input class="new-item-input" type="text" placeholder="New Item">
            <button class="minus">-</button>
        `
        } else {
            new_block.innerHTML = `
            <input class="new-item-input" type="text" placeholder="Novo Item">
            <button class="minus">-</button>
        `
        }

        new_items.append(new_block)
        new_block.querySelector('input').focus()
        sbmt_btn.disabled = true
    })

    document.addEventListener('click', event => {
        const element = event.target
        if (element.className === 'minus') {
            element.parentElement.classList.add('animate-disappear')
            element.parentElement.addEventListener('animationend', () => {
                element.parentElement.remove()
            })
        } else if (element.id === 'csv-toggle') {
            csv_container.hidden = false
        }
        sbmt_btn.disabled = is_empty()
    })

    document.querySelector('#csv-submit').onclick = () => {
        let list_items = document.querySelector('#csv-list-items').value.split(",").map(s => s.trim()).filter(s => s !== '');

        localStorage.setItem('list_items', JSON.stringify(list_items))

        document.querySelector('#csv-list-items').value = ''

        if (document.documentElement.lang === 'en') {
            window.location.href = 'palace.html'
        } else {
            window.location.href = 'palace_pt-br.html'
        }
    }

    name_btn.onclick = () => {
        const list_name = document.querySelector('#list-name-input').value;

        const title = document.querySelector('#title-list')
        title.innerHTML = list_name
        document.querySelector('#list-name-input').value = ''
        name_btn.disabled = true
        localStorage.setItem('list_name', list_name)

        document.querySelector('#insertion').hidden = false
        document.querySelector('#insertion').querySelector('input').focus()
        alternative_container.hidden = false
        csv_toggle_btn.disabled = false
    }

    document.addEventListener('keyup', event => {
        const input_list_name = document.querySelector('#list-name-input')
        if (input_list_name.value === '') {
            name_btn.disabled = true
        } else {
            name_btn.disabled = false
        }

        if (document.querySelector('#csv-list-items').value === '') {
            sbmt_csv.disabled = true
        } else {
            sbmt_csv.disabled = false
        }

        if (event.key === 'Enter' && event.target.id === 'list-name-input') {
            name_btn.click()
        }

        sbmt_btn.disabled = is_empty()
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'Enter' && event.target.className === 'new-item-input') {
            event.preventDefault()
            document.querySelector('.plus').click()
        }
    })


    sbmt_btn.onclick = () => {
        let list_items = [];
        
        document.querySelectorAll('.new-item-input').forEach(input => {
            list_items.push(input.value)
            input.value = ''
        })

        localStorage.setItem('list_items', JSON.stringify(list_items))

        if (document.documentElement.lang === 'en') {
            window.location.href = 'palace.html'
        } else {
            window.location.href = 'palace_pt-br.html'
        }
        return false;
    }
})