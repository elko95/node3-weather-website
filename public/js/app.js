const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");

// messageOne.textContent = "javaScript";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = "Loading ...";
  messagetwo.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messagetwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});
