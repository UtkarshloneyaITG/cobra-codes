// const mail_box = document.getElementById("contect_us_form");
// const mail_box_name = getElementById("Contact_form_name");
// const mail_box_mail = getElementById("Contact_form_mail");
// const contect_us_form_error = getElementById("contect_us_form_error");

async function sent_mail_fetch(obj) {
  try {
    const response = await fetch(
      "https://ewltest.vercel.app/api/v1/Auth/sendMail",
     {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Doe",
        message: "Hello, I’d like to know more about your services.",
        email: "utkarshloneya@itgeeks.com",
      }),
    }
    );
    console.log(await response.json());
  } catch (error) {}
}
sent_mail_fetch()
// mail_box.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (mail_box_mail.value.trim() == "") {
//     contect_us_form_error.innerText = "Please fill the contentent";
//   } else {
//     contect_us_form_error.innerText = "";
//     let obj = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: "John Doe",
//         message: "Hello, I’d like to know more about your services.",
//         email: "gamith0024@gmail.com",
//       }),
//     };
//     sent_mail_fetch(obj);
//   }
// });
