// open_close modal login
const login = document.querySelector('.js_login')  
const modal_login = document.querySelector('.js_modal')
const close_login = document.querySelector('.js_modalClose')
const js_modal = document.querySelector('.js_modal_login')
function showModalLogin(){
    modal_login.classList.add('open')
}
function closeModalLogin(){
    modal_login.classList.remove('open')
}
function modal_event(){
    event.stopPropagation()
}
login.addEventListener('click',showModalLogin)
close_login.addEventListener('click',closeModalLogin)
modal_login.addEventListener('click',closeModalLogin)
js_modal.addEventListener('click',modal_event)

//open_close modal register

const register = document.querySelector('.js_register')
const modal_register = document.querySelector('.modal1')
const close_register = document.querySelector('.js_close_register')
const register_contern = document.querySelector('.js_modal_register')
function showModalRegister(){
    modal_register.classList.add('open')
}
function closeModalRegister(){
    modal_register.classList.remove('open')
}
function event_modal(){
    event.stopPropagation()
}
register.addEventListener('click',showModalRegister)
close_register.addEventListener('click',closeModalRegister)
modal_register.addEventListener('click',closeModalRegister)
register_contern.addEventListener('click',event_modal)
