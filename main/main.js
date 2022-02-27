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