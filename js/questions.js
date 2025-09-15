// const { default: axios } = require("axios");

let token = document.cookie;
const clock = document.querySelector(".clock");
const profile = document.querySelector(".profile");
const menu = document.querySelector(".menu-button");
const menu_grid = document.querySelector(".side-bar-grid");
const home_page_body_grid = document.querySelector(".home-page-body-grid");
let arr_of_questions = [];
let timecondition = false;
if (token !== "") {
  document.getElementById("button_for_login").style.display = "none";
}
function login_pop_up(link) {
  if (token == "") {
    location.href = "../pages/login.html";
  } else {
    location.href = link;
  }
}
let clocks = () => {
  let date = new Date();
  let formate = "AM";
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  requestAnimationFrame(clocks);
  if (hours > 12) {
    formate = "PM";
  } else {
    formate = "AM";
  }
  if (timecondition) {
    clock.innerHTML = `${String(hours).padStart(2, 0)}:${String(
      minutes
    ).padStart(2, 0)}:${String(seconds).padStart(2, 0)} ${formate}`;
  } else {
    clock.innerHTML = `${String(hours).padStart(2, 0)}:${String(
      minutes
    ).padStart(2, 0)} ${formate}`;
  }
};
clocks();
menu.addEventListener("click", () => {
  if (menu_grid.style.left == "0px") {
    profile.style.left = "-200px";
    menu_grid.style.left = "-210px";
    home_page_body_grid.style.paddingLeft = "60px";
  } else {
    menu_grid.style.left = "0px";
    profile.style.left = "0px";
    home_page_body_grid.style.paddingLeft = "270px";
  }
});

async function Question_fetch() {
  try {
    const response = await axios.get(
      "https://ai-agent-steel-ten.vercel.app/api/v1/stackFlowRoutes/questions/getAllQuestion"
    );
    arr_of_questions = response.data;
    console.log(arr_of_questions);
  } catch (error) {
    console.log(error);
  }
}
question_render();

async function question_render() {
  await Question_fetch();
  document.querySelector(".Questions-body").innerHTML = "";
  arr_of_questions.reverse().forEach((ele) => {
    let name = ele.user == null ? "Anonymous" : ele.user.Name;

    let div = document.createElement("div");
    div.setAttribute("class", "questions-holder");
    div.innerHTML = `<div class = 'question-vote-box'>
                              <button onclick=feth_upvote('${ele._id}','upvote')>
                                +
                              </button>
                              <span>${ele.votes}</span>
                              <button onclick=feth_upvote('${ele._id}','downvote')>-</button>
                            </div>
                            <div class="Questions-body-inner">
                          <p class="question">${ele.title}</p>
                            <p class="quetion-asker">Asked by <span>${name}</span><p>
                              <button>See Answers</button>
                            </div> `;
    document.querySelector(".Questions-body").appendChild(div);
    console.log(ele.user);
  });
}
async function feth_upvote(id, type) {
  try {
    const response = await axios.post(
      `https://ai-agent-steel-ten.vercel.app/api/v1/stackFlowRoutes/questions/${type}`,
      { id: id }
    );
    question_render();
  } catch (error) {}
}
