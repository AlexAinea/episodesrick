const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

const apiUrl = 'https://rickandmortyapi.com/api/episode';
let currentPage = 1;
const pageSize = 10;
let episodeData;

async function fetchData(page) {
  try {
    const response = await fetch(`${apiUrl}?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    episodeData = await response.json();
    if (episodeData.results && episodeData.results.length > 0) {
      displayEpisodes(episodeData.results);
      createPaginationControls(episodeData.info.pages);
    } else {
      throw new Error('Empty or invalid data returned from the API');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error fetching data');
  }
}

window.addEventListener("load", () => {
  fetchData(currentPage);
});

let searchButton = document.getElementById("buttoned");
searchButton.onclick = function() {
  search(episodeData.results);
};

function search(data) {
  let inputName = document.getElementById("searchbar").value;
  let episodeDisplayArea = document.querySelector(".episodeDisplayArea");
  episodeDisplayArea.innerHTML = '';
  for (let j = 0; j < data.length; j++) {
    if (inputName == data[j].name) {
      creation([data[j]]);
      break;
    }
  }
}

function displayEpisodes(data) {
  let episodeDisplayArea = document.querySelector(".episodeDisplayArea");
  episodeDisplayArea.innerHTML = '';
  creation(data);
}

function createPaginationControls(totalPages) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      fetchData(currentPage);
    });
    paginationContainer.appendChild(pageButton);
  }
}

function creation(data) {
  let episodeDisplayArea = document.querySelector(".episodeDisplayArea");
  for (let i = 0; i < data.length; i++) {
    let episodeDiv = document.createElement("div");
    
    let episodeName = document.createElement("h2");
    let episodeAirDate = document.createElement("p");
    let episodeCode = document.createElement("p");
    

    
    episodeName.textContent = data[i].name;
    episodeAirDate.textContent = `AIR DATE: ${data[i].air_date}`;
    episodeCode.textContent = `CODE: ${data[i].code}`;
    
    
    episodeDiv.appendChild(episodeName);
    episodeDiv.appendChild(episodeAirDate);
    episodeDiv.appendChild(episodeCode);
    

    episodeDisplayArea.appendChild(episodeDiv);

    episodeDiv.classList.add("episodeDivTag");
    
    episodeAirDate.classList.add("episodePTag");
    episodeCode.classList.add("episodePTag");
    
  }
}
