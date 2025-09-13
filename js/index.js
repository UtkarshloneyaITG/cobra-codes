
let token = document.cookie
const clock = document.querySelector('.clock')
let dark_bright_mode = document.getElementById('dark-bright-mode'); //dark bright mode box
let dark_bright_box = document.getElementById('dark-bright-mode-box') // dark bright mode ball
// let element = document.getElementsByClassName('element'); // dark bright mode class
let sun_moon = document.getElementById('sun-moon') // dark bright mode sun moon emoji
let timecondition = false;
const profile = document.querySelector('.profile')
const menu = document.querySelector('.menu-button')
const menu_grid = document.querySelector('.side-bar-grid')
const home_page_body_grid = document.querySelector('.home-page-body-grid')
const choose_font_family = document.getElementById('choose-font-family')
const setting_page = document.querySelector('.setting-page')
const menu_page_home = document.querySelector('.menu-page-home')

if (token == '') {
  location.href = '../pages/login.html'
}

function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload()
}

let clocks = () => {
  let date = new Date()
  let formate = 'AM'
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  requestAnimationFrame(clocks)
  if (hours > 12) {
    formate = 'PM'
  }
  else {
    formate = 'AM'
  }
  if (timecondition) {
    clock.innerHTML = `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)} ${formate}`
  }
  else {
    clock.innerHTML = `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)} ${formate}`
  }
}
clocks()


function timeFormate(ele) {
  if (ele.innerText == 'without seconds') {
    ele.innerText = 'with seconds'
    timecondition = false
    return 
  }
    ele.innerText = 'without seconds'
    timecondition = true
  setToLocalStorage()
}



function darkBrightmodeChanger() {

  if (dark_bright_mode.style.marginLeft == '20px') {
    dark_bright_mode.style.marginLeft = '0px';
    dark_bright_mode.style.background = 'black'
    dark_bright_box.style.background = 'black'
    dark_bright_mode.style.borderColor = 'white'
    sun_moon.innerHTML = `<span id="sun-moon"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%"
                          height="100%" viewBox="0 0 50 50" style="fill:#FFFFFF;">
                          <path
                            d="M 24.90625 3.96875 C 24.863281 3.976563 24.820313 3.988281 24.78125 4 C 24.316406 4.105469 23.988281 4.523438 24 5 L 24 11 C 23.996094 11.359375 24.183594 11.695313 24.496094 11.878906 C 24.808594 12.058594 25.191406 12.058594 25.503906 11.878906 C 25.816406 11.695313 26.003906 11.359375 26 11 L 26 5 C 26.011719 4.710938 25.894531 4.433594 25.6875 4.238281 C 25.476563 4.039063 25.191406 3.941406 24.90625 3.96875 Z M 10.65625 9.84375 C 10.28125 9.910156 9.980469 10.183594 9.875 10.546875 C 9.769531 10.914063 9.878906 11.304688 10.15625 11.5625 L 14.40625 15.8125 C 14.648438 16.109375 15.035156 16.246094 15.410156 16.160156 C 15.78125 16.074219 16.074219 15.78125 16.160156 15.410156 C 16.246094 15.035156 16.109375 14.648438 15.8125 14.40625 L 11.5625 10.15625 C 11.355469 9.933594 11.054688 9.820313 10.75 9.84375 C 10.71875 9.84375 10.6875 9.84375 10.65625 9.84375 Z M 39.03125 9.84375 C 38.804688 9.875 38.59375 9.988281 38.4375 10.15625 L 34.1875 14.40625 C 33.890625 14.648438 33.753906 15.035156 33.839844 15.410156 C 33.925781 15.78125 34.21875 16.074219 34.589844 16.160156 C 34.964844 16.246094 35.351563 16.109375 35.59375 15.8125 L 39.84375 11.5625 C 40.15625 11.265625 40.246094 10.800781 40.0625 10.410156 C 39.875 10.015625 39.460938 9.789063 39.03125 9.84375 Z M 25 15 C 19.484375 15 15 19.484375 15 25 C 15 30.515625 19.484375 35 25 35 C 30.515625 35 35 30.515625 35 25 C 35 19.484375 30.515625 15 25 15 Z M 4.71875 24 C 4.167969 24.078125 3.78125 24.589844 3.859375 25.140625 C 3.9375 25.691406 4.449219 26.078125 5 26 L 11 26 C 11.359375 26.003906 11.695313 25.816406 11.878906 25.503906 C 12.058594 25.191406 12.058594 24.808594 11.878906 24.496094 C 11.695313 24.183594 11.359375 23.996094 11 24 L 5 24 C 4.96875 24 4.9375 24 4.90625 24 C 4.875 24 4.84375 24 4.8125 24 C 4.78125 24 4.75 24 4.71875 24 Z M 38.71875 24 C 38.167969 24.078125 37.78125 24.589844 37.859375 25.140625 C 37.9375 25.691406 38.449219 26.078125 39 26 L 45 26 C 45.359375 26.003906 45.695313 25.816406 45.878906 25.503906 C 46.058594 25.191406 46.058594 24.808594 45.878906 24.496094 C 45.695313 24.183594 45.359375 23.996094 45 24 L 39 24 C 38.96875 24 38.9375 24 38.90625 24 C 38.875 24 38.84375 24 38.8125 24 C 38.78125 24 38.75 24 38.71875 24 Z M 15 33.875 C 14.773438 33.90625 14.5625 34.019531 14.40625 34.1875 L 10.15625 38.4375 C 9.859375 38.679688 9.722656 39.066406 9.808594 39.441406 C 9.894531 39.8125 10.1875 40.105469 10.558594 40.191406 C 10.933594 40.277344 11.320313 40.140625 11.5625 39.84375 L 15.8125 35.59375 C 16.109375 35.308594 16.199219 34.867188 16.039063 34.488281 C 15.882813 34.109375 15.503906 33.867188 15.09375 33.875 C 15.0625 33.875 15.03125 33.875 15 33.875 Z M 34.6875 33.875 C 34.3125 33.941406 34.011719 34.214844 33.90625 34.578125 C 33.800781 34.945313 33.910156 35.335938 34.1875 35.59375 L 38.4375 39.84375 C 38.679688 40.140625 39.066406 40.277344 39.441406 40.191406 C 39.8125 40.105469 40.105469 39.8125 40.191406 39.441406 C 40.277344 39.066406 40.140625 38.679688 39.84375 38.4375 L 35.59375 34.1875 C 35.40625 33.988281 35.148438 33.878906 34.875 33.875 C 34.84375 33.875 34.8125 33.875 34.78125 33.875 C 34.75 33.875 34.71875 33.875 34.6875 33.875 Z M 24.90625 37.96875 C 24.863281 37.976563 24.820313 37.988281 24.78125 38 C 24.316406 38.105469 23.988281 38.523438 24 39 L 24 45 C 23.996094 45.359375 24.183594 45.695313 24.496094 45.878906 C 24.808594 46.058594 25.191406 46.058594 25.503906 45.878906 C 25.816406 45.695313 26.003906 45.359375 26 45 L 26 39 C 26.011719 38.710938 25.894531 38.433594 25.6875 38.238281 C 25.476563 38.039063 25.191406 37.941406 24.90625 37.96875 Z">
                          </path>
                        </svg>`
  }
  else {
    dark_bright_mode.style.marginLeft = '20px';
    dark_bright_mode.style.background = 'white'
    dark_bright_box.style.background = 'white'
    dark_bright_mode.style.borderColor = 'black'
    sun_moon.innerHTML = `<svg width="100%" height="100%F" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="cutout">
      <rect width="100" height="100" fill="white"/>
      <circle cx="60" cy="50" r="35" fill="black"/>
    </mask>
  </defs>
  <circle cx="50" cy="50" r="40" fill="black" mask="url(#cutout)"/>
</svg>

`
  }
}


function settings() {
  if (setting_page.style.display == 'block') {
    setting_page.style.display = 'none'
    menu_page_home.style.display = 'block'
  }
  else {
    setting_page.style.display = 'block'
    menu_page_home.style.display = 'none'
  }
}

menu.addEventListener('click', () => {
  if (menu_grid.style.left == '0px') {
    profile.style.left = '-200px';
    menu_grid.style.left = '-210px'
    home_page_body_grid.style.paddingLeft = '60px'
  }
  else {
    menu_grid.style.left = '0px'
    profile.style.left = '0px';
    home_page_body_grid.style.paddingLeft = '270px'
  }
})

choose_font_family.addEventListener('change', (e) => {
  if (e.target.value == 'default') {
    document.body.style.fontFamily = 'sans-serif'
  }
  else {
    document.body.style.fontFamily = e.target.value
  }
})

function animetion(ele){
  if(ele.innerText == 'Off') {
    document.body.transition = '0.3s'
    ele.innerText = 'On'
  }
  else {
    ele.innerText = 'Off'
    document.body.transition = 'none'
  }
}