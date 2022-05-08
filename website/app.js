//API Data
const api = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=b1ee62e165ba4cb6fb66d19836367c8a&units=metric";

//Selecting elements by ID
const button = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const temp = document.querySelector("#temp");
const date = document.querySelector("#date");
const feelings = document.querySelector("#feelings");
const content = document.querySelector("#content");

// Function to fetch zip data using the api
async function fetchZipCodeData(zipCode) {
  const res = await fetch(api + zipCode + apiKey);
  const data = await res.json();
  return data;
}

//Function to post data
async function postData(data) {
  //Post request configuration
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch(`/post`, config);
  try {
    response.json().then((data) => {
      updateUI();
    });
  } catch (e) {
    console.log("caught an error !");
    console.log(`error is ${e}`);
  }
}

//Function to update the ui
async function updateUI() {
  let response = await fetch(`/all`);
  try {
    response.json().then((data) => {
      date.innerHTML = `Date: ${data.date}`;
      temp.innerHTML = `Temperature: ${data.temp} Celsius`;
      content.innerHTML = `Feeling: ${data.content}`;
    });
  } catch (e) {
    console.log("caught an error !");
    console.log(`error is ${e}`);
  }
}
//Event listener to wait for button click
button.addEventListener("click", () => {
  let userData = {
    //Object to store user data
    zipCode: zip.value,
    content: feelings.value,
    date: new Date(),
  };

  fetchZipCodeData(userData.zipCode).then((zipData) => {
    userData.temp = zipData.list[0].main.temp;
    postData(userData);
  });
});
