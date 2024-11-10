const formDOM = document.querySelector('.form')
const formAlertDOM = document.querySelector('.form-alert')
const tokenDOM = document.querySelector('.token')
const emailInputDOM = document.querySelector('.email-input')
const passwordInputDOM = document.querySelector('.password-input')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')

formDOM.addEventListener('submit', async (e) => {
    formAlertDOM.classList.remove('text-success')
    tokenDOM.classList.remove('text-success')

    e.preventDefault()
    const email = emailInputDOM.value
    const password = passwordInputDOM.value

    try {
        const { data } = await axios.post('/api/v1/login', { email, password })

        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = data.msg

        formAlertDOM.classList.add('text-success')
        emailInputDOM.value = ''
        passwordInputDOM.value = ''
        
        localStorage.setItem('token', data.token)
        resultDOM.innerHTML = ''
        tokenDOM.textContent = 'token present'
        tokenDOM.classList.add('text-success')
    } catch (err) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = err.response.data.msg
        localStorage.removeItem('token')
        resultDOM.innerHTML = ''
        tokenDOM.textContent = 'no token present'
        tokenDOM.classList.remove('text-success')
    }

    setTimeout(() => {
        formAlertDOM.style.display = 'none'
    }, 2000)
})

btnDOM.addEventListener('click', async () => {
    const token = localStorage.getItem('token')
    try {
        const { data } = await axios.get('/api/v1/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`
    } catch (err) {
        localStorage.removeItem('token')
        resultDOM.innerHTML = `<p>${err.response.data.msg}</p>`
    }
})

const checkToken = () => {
    tokenDOM.classList.remove('text-success')

    const token = localStorage.getItem('token')
    if (token) {
        tokenDOM.textContent = 'token present'
        tokenDOM.classList.add('text-success')
    }
}

checkToken()