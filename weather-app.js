const tempratureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "Allahabad";


function input(e){
  searchField(e.preventDefault);
}

const fetchData = async (target)=> {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=2f3e3a291df54029b5b214300240902&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    const {
      current:{ temp_c,condition:{
        text,icon
      } },
      location:{name,localtime},

    } = data;

    updateDOM(temp_c,name,localtime,icon,text);

  } catch (error) {
    alert("Location not found");
  }
};

function updateDOM(temperature,city,time,emoji,text){
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();

  tempratureField.innerText = temperature +"°" ;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} - ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);

function search (e){
  e.preventDefault();

  target = searchField.value;
  fetchData(target);

}

form.addEventListener("submit", search);

function getDayFullName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
      break;
  
    default:
      return "💀";
      break;
  }
};