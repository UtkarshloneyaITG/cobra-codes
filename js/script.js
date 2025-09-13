

const content_post_container = document.querySelector('.menu-page-home-bottom')
let gmail = 'gamith0024@gmail.com'
const arr_of_history = null;
const save_settings = {
  fontFamily: null,
  timeFormate: true,
  color_mode: 'dark',
  animation: true,
}


class code_post {
  constructor(title, img, details, links, type) {
    this.title = title;
    this.img = img;
    this.details = details;
    this.links = links;
    this.type = type;
  }
}
content_div('js')
function content_div(ele) {
  let content_shoing = ele

  let code_post_arr = arr.filter((value, index) => {
    return value.type == content_shoing
  })
  content_post_container.innerHTML = ''
  console.log(code_post_arr)
  code_post_arr.forEach((ele) => {
    let div = document.createElement('div')
    div.setAttribute('class', 'content_post__')
    div.innerHTML = ` <div class="thumbnail">
                                <img src="${ele.img}" alt="${ele.title}" width="100%" height="100%">
                              </div>
                              <div class="info">
                                <p>Title : ${ele.title}</p>
                                <p>Details : ${ele.details}</p>
                                <p>link : <a onclick='savehistory('${ele.link}','${ele.title}')'href="${ele.links}">${ele.links}</a></p>
                              </div>`
    content_post_container.appendChild(div)
  })
}

// async function posthistory(obj) {
//   try {
//     const data = await fetch('https://ewltest.vercel.app/api/v1/Auth/addHistory',obj) 
//     console.log( await data.json())
//   } catch (error) {
//     console.log(error)
//   }
//   getHistory()
// }
// async function savehistory(link, title) {
//   let date = new Date()
//   let exact_date = `${date.getDate} ${date.getTime}` 
//   let history = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         "email": gmail,
//         "history": [{
//           "tool": [link,title],
//           "date": exact_date
//         }]
//     })
// }
// posthistory(history)
// }
// savehistory('link', 'title')
// async function getHistory() { 
//   try {
//     let data = await fetch(' https://ewltest.vercel.app/api/v1/Auth/getHistory', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({  
//         "email": gmail,
//     })
// })
// arr_of_history = await data.json()
// console.log(arr_of_history.history,data)
//   } catch (error) {
    
//   }
// }
