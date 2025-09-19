const login_inputs = document.querySelector(".login-page-grid");
const login_inputs_value = login_inputs.getElementsByTagName("input");
const loader = document.querySelector(".loader-div");
loader.style.display = "flex";
async function login() {
  const loader = document.querySelector(".loader-div");
  loader.style.display = "flex";
  try {
    const data = await axios.post(
      `https://ai-agent-steel-ten.vercel.app/api/v1/auth/Login`,
      {
        Email: login_inputs_value[0].value,
        Password: login_inputs_value[1].value,
      }
    );
    if (data.data.success == true) {
      setCookie("token", login_inputs_value[0].value, 24 * 60);
      window.history.back();
    } else {
      alert(data.data.msg);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
  }
}
window.addEventListener("load", () => {
  loader.style.display = "none";
});

function setCookie(name, value, minutes) {
  const d = new Date();
  d.setTime(d.getTime() + minutes * 60 * 1000);

  const expiresUTC = d.toUTCString();
  document.cookie = `${name}=${value};expires=${expiresUTC};path=/`;
}
