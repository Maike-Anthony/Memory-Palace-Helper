document.addEventListener("DOMContentLoaded", () => {
    const new_items = document.querySelector('#new-items')
    const sbmt_btn = document.querySelector('#submit-list-items')
    const name_btn = document.querySelector('#submit-list-name')
    const csv_container = document.querySelector('#csv-container')
    const alterantive_container = document.querySelector('#alternative')
    const sbmt_csv = document.querySelector('#csv-submit')
    const csv_toggle_btn = document.querySelector('#csv-toggle')
    alterantive_container.hidden = true
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
        new_block.innerHTML = `
            <input class="new-item-input" type="text" placeholder="New Item">
            <button class="minus">-</button>
        `
        new_items.append(new_block)
        new_block.querySelector('input').focus()
        sbmt_btn.disabled = true
    })

    document.addEventListener('click', event => {
        const element = event.target
        if (element.className === 'minus') {
            element.parentElement.remove()
        } else if (element.id === 'csv-toggle') {
            csv_container.hidden = false
        }
        sbmt_btn.disabled = is_empty()
    })

    document.querySelector('#csv-submit').onclick = () => {
        let list_items = document.querySelector('#csv-list-items').value.split(",").map(s => s.trim()).filter(s => s !== '');

        localStorage.setItem('list_items', JSON.stringify(list_items))

        document.querySelector('#csv-list-items').value = ''

        window.location.href = 'palace.html'
    }

    document.querySelector('#list-name').onsubmit = () => {
        const list_name = document.querySelector('#list-name-input').value;

        const title = document.querySelector('#title-list')
        title.innerHTML = list_name
        document.querySelector('#list-name-input').value = ''
        name_btn.disabled = true
        localStorage.setItem('list_name', list_name)

        document.querySelector('#insertion').hidden = false
        document.querySelector('#insertion').querySelector('input').focus()
        alterantive_container.hidden = false
        csv_toggle_btn.disabled = false
        
        return false;
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

        sbmt_btn.disabled = is_empty()
    })

    document.addEventListener('keydown', event => {
        if (event.key === 'Enter' && event.target.className === 'new-item-input') {
            event.preventDefault()
            document.querySelector('.plus').click()
        }
    })


    document.querySelector('#items').onsubmit = () => {
        let list_items = [];
        
        document.querySelectorAll('.new-item-input').forEach(input => {
            list_items.push(input.value)
            input.value = ''
        })

        localStorage.setItem('list_items', JSON.stringify(list_items))

        window.location.href = 'palace.html'
        return false;
    }
})