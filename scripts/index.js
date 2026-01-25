document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#memorize-now-btn').onclick = () => {
        localStorage.removeItem('resume')
    }

    resume = JSON.parse(localStorage.getItem('resume'))
    if (resume !== null) {
        let resume_btn = document.createElement('button')
        let resume_a = document.createElement('a')
        if (document.documentElement.lang === 'en') {
            document.querySelector('#memorize-now-btn').innerHTML = 'Start new session'
            resume_btn.textContent = 'Resume last session'
            resume_a.href = `${resume.address}.html`
        } else {
            document.querySelector('#memorize-now-btn').innerHTML = 'Começar nova sessão'
            resume_btn.textContent = 'Retomar última sessão'
            resume_a.href = `${resume.address}_pt-br.html`
        }
        resume_btn.id = 'resume-btn'
        resume_a.append(resume_btn)
        document.querySelector('#get_started').append(resume_a)
    }
})