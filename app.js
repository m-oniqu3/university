//const country = document.getElementById('country');
const form = document.getElementById("form");

const getCountry = (e) => {
  e.preventDefault();
  const country = form.country.value.trim();
  return getUni(country);
};

let getUni = async (country) => {
  try {
    let data = await fetch(
      `http://universities.hipolabs.com/search?country=${country}`
    );
    let response = await data.json();
    return getUniversities(response);
  } catch (error) {
    console.log(error, "Something went wrong");
  }
};

let getUniversities = async (response) => {
  console.log(response);

  let name = new Array();
  response.forEach((element) => {
    name.push(element.name);
    return name;
  });

  const uniSet = new Set(name);
  return updateUI(uniSet);
};

const updateUI = (uniSet) => {
  let list = "";
  let div = document.createElement("div");

  uniSet.forEach((item) => {
    list += `<li>${item}</li>`;
    return list;
  });

  div.innerHTML = list;
  form.after(div);
};
form.addEventListener("submit", getCountry);
