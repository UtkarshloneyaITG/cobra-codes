
let token = document.cookie;
const clock = document.querySelector(".clock");
const profile = document.querySelector(".profile");
const menu = document.querySelector(".menu-button");
const menu_grid = document.querySelector(".side-bar-grid");
const home_page_body_grid = document.querySelector(".home-page-body-grid");
let gett_all_answers = null;
let Question_holder = document.querySelector(".Question-in-answer-page");
let answer_in_answer_page = document.querySelector(".answer-in-answer-page");
let Answer_data = null;
let arr_of_questions = [];
let timecondition = false;
let answer_filled = document.getElementById("answer-filled");
let localdata = localStorage.getItem("user");
let localdataBox = JSON.parse(localdata);
let question_page = document.querySelector(".Questions-grid");
let answer_page = document.querySelector(".answer-grid");
let ask_question_grid = document.querySelector(".ask_question_grid");
console.log(localdataBox._id);
const over_flow_page = document.querySelector(".page-content");
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
show_menu();
function show_menu() {
  if (menu_grid.style.left == "0px") {
    profile.style.left = "-200px";
    menu_grid.style.left = "-210px";
    home_page_body_grid.style.paddingLeft = "60px";
  } else {
    menu_grid.style.left = "0px";
    profile.style.left = "0px";
    home_page_body_grid.style.paddingLeft = "270px";
  }
}

async function Question_fetch() {
  try {
    const response = await axios.get(
      "https://ai-agent-steel-ten.vercel.app/api/v1/stackFlowRoutes/questions/getAllQuestion"
    );
    arr_of_questions = response.data;
    // console.log(arr_of_questions);
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
                              <button onclick=feth_upvote('${ele._id}','questions/upvote')>
                                👍
                              </button>
                              <span>${ele.votes}</span>
                              <button onclick=feth_upvote('${ele._id}','questions/downvote')>👎</button>
                            </div>
                            <div class="Questions-body-inner">
                          <p class="question">${ele.title}</p>
                            <p class="quetion-asker">Asked by <span>${name}</span><p>
                              <button onclick="answer_renderer('${ele._id}')">See Answers</button>
                            </div> `;
    document.querySelector(".Questions-body").appendChild(div);
  });
}
async function feth_upvote(ids, type) {
  try {
    const response = await axios.post(
      `https://ai-agent-steel-ten.vercel.app/api/v1/stackFlowRoutes/${type}`,
      { id: ids }
    );
    await question_render();
    question_render_one(ids);
  } catch (error) {
    console.log(error);
  }
}

async function see_answer() {
  try {
    const response = await axios.get(
      "https://ai-agent-steel-ten.vercel.app/api/v1/stackFlowRoutes/answers/getAllAnswer"
    );
    gett_all_answers = response.data;
  } catch (error) {
    console.log("error", error);
  }
}
async function answer_vote(ids, type) {
  try {
    const response = await axios.post(
      `https://ai-agent-steel-ten.vercel.app/api/v1/stackFlowRoutes/${type}`,
      { id: ids }
    );
    Answer_data.forEach((ele) => {
      if (ele._id == response.data._id) {
        ele.votes = response.data.votes;
      }
    });
    console.log(Answer_data);
    await answerRenderer(Answer_data);
  } catch (error) {
    console.log(error);
  }
}
let QuestionID = 0;
async function answer_renderer(id) {
  question_page.style.display = "none";
  answer_page.style.display = "block";
  await Question_fetch();
  await see_answer();
  await question_render_one(id);
  QuestionID = id;
  let filterd_data = gett_all_answers.filter((val) => {
    return val.questionId._id == id;
  });
  Answer_data = filterd_data;
  if (filterd_data.length != 0) {
    answerRenderer(Answer_data);
  } else {
    answer_in_answer_page.innerHTML = "<h3>No Answers</h3>";
  }
}

async function answerRenderer(ele) {
  answer_in_answer_page.innerHTML = "";
  ele.forEach((value) => {
    let div = document.createElement("div");
    div.setAttribute("class", "answer-holder");
    div.innerHTML = `
                        <div class="answer-vote-box">
                              <button onclick="answer_vote('${value._id}','answers/upvote')">
                                👍
                              </button>
                              <span>${value.votes}</span>
                              <button onclick="answer_vote('${value._id}','answers/downvote')">👎</button>
                            </div>
                            <div class="answer-body-inner">
                            <p class="answer">${value.text}</p>
                            <p class="answer-giver">Answered by <span>${value.user.Name}</span><p>
                            </div>`;
    answer_in_answer_page.appendChild(div);
  });
}

let userID = localdataBox._id;
async function question_render_one(id) {
  let element = arr_of_questions.filter((value) => {
    console.log(id == value._id, id, value._id);
    return id == value._id;
  });

  let name = element[0].user.Name;
  Question_holder.innerHTML = `
   <div class="questions-holder">
                            <div class="question-vote-box">
                              <button onclick="feth_upvote('${element[0]._id}','questions/upvote')">
                                👍
                              </button>
                              <span>${element[0].votes}</span>
                              <button onclick="feth_upvote('${element[0]._id}','questions/downvote')" >👎</button>
                            </div>
                            <div class="Questions-body-inner">
                            <p class="question">${element[0].title}</p>
                            <p class="quetion-asker">Asked by <span>${name}</span><p>
                            </div> 
                          </div>
  `;
}

async function Post_answer(ans) {
  try {
    let response = await axios.post(
      "https://ai-agent-steel-ten.vercel.app/api/v1/stackFlowRoutes/answers/addAnswer",
      ans
    );
  } catch (error) {}
}
async function get_answer_details() {
  let ans_obj = {
    questionId: QuestionID,
    text: answer_filled.value,
    userId: userID,
  };
  answer_filled.value = "";
  Post_answer(ans_obj);
  answer_renderer(QuestionID);
}
function return_to_que_page() {
  question_page.style.display = "block";
  answer_page.style.display = "none";
}
function askQuestion_popUP() {
  ask_question_grid.style.display = "flex";
  over_flow_page.style.overflow = "hidden";
}
async function send_question_fetch(que) {
  try {
    const response = await axios.post('https://ai-agent-steel-ten.vercel.app/api/v1/stackFlowRoutes/questions/addQuestions',que)
  } catch (error) {
    
  }
}
function send_question(){

}
