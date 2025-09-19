const signup_inputs = document.querySelector(".signup-page-grid");
const signup_inputs_value = signup_inputs.getElementsByTagName("input");
loader.style.display = "flex";
async function signup() {
  const loader = document.querySelector(".loader-div");
  loader.style.display = "flex";
  try {
    const data = await axios.post(
      ` https://ai-agent-steel-ten.vercel.app/api/v1/auth/Signup`,
      {
        Name: signup_inputs_value[0].value,
        Email: signup_inputs_value[1].value,
        Password: signup_inputs_value[2].value,
      }
    );
    if (data.data.success == true) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
      location.href = "index.html";
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
