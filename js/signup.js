const signup_inputs = document.querySelector('.signup-page-grid')
const signup_inputs_value = signup_inputs.getElementsByTagName('input')
loader.style.display = 'flex'
async function signup() {
   const loader = document.querySelector('.loader-div')
  loader.style.display = 'flex'
  try {
    const data = await axios.post(`https://ewltest.vercel.app/api/v1/Auth/Signup`, {
      Name : signup_inputs_value[0].value,
      Email :  signup_inputs_value[1].value,
      Password :  signup_inputs_value[2].value
    })
     if(data.data.success == true){
      location.href = '../pages/login.html'
    }
    else{
      alert(data.data.msg)
    }
  } catch (error) {
    console.log(error)
  } finally{
    loader.style.display = 'none'
  }
}

window.addEventListener('load',()=>{
  loader.style.display = 'none'
})