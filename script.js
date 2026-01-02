const root = document.documentElement;
const burger = document.querySelector(".burger");
const menu = document.querySelector(".planets_mobile_choise");
const planetButtons = document.querySelectorAll(".planet-btn");
const menuItem = document.querySelectorAll(".menu-item");
const structure_g = document.querySelector(".stucture_g");
const planetImg = document.querySelector(".planet_img");
let planet = "mercury";

// MOBILE MENU
burger.addEventListener("click", () => {
  menu.classList.toggle("open");
  burger.classList.toggle("burger_active");
  document.body.classList.toggle("no-scroll", menu.classList.contains("open"));
});

// PLANET BUTTONS
planetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    planetButtons.forEach((btn) => btn.classList.remove("active_nav"));
    button.classList.add("active_nav");
    planet = button.dataset.planet;
    const cssVar = `--${planet}`;
    const activeColor = getComputedStyle(root).getPropertyValue(cssVar).trim();

    // for CSS variable
    root.style.setProperty("--active-color", activeColor);

    updateGeologyImage(
      planet,
      document.querySelector(".menu-item.active").dataset.section
    );
    menu.classList.remove("open");
    burger.classList.remove("burger_active");
    document.body.classList.remove("no-scroll");
  });
});

// update from JSON
function updateGeologyImage(planet, section) {
  const selectedPlanet = planetsData.find(
    (p) => p.name.toLowerCase() === planet
  );
  if (!selectedPlanet) return;

  if (section === "overview") {
    planetImg.src = selectedPlanet.images.planet;
    structure_g.classList.remove("geology");
  } else if (section === "structure") {
    planetImg.src = selectedPlanet.images.internal;
    structure_g.classList.remove("geology");
  } else if (section === "surface") {
    planetImg.src = selectedPlanet.images.planet;
    structure_g.classList.add("geology");
    structure_g.style.backgroundImage = `url(${selectedPlanet.images.geology})`;
  }
}

// responseve menu
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const firstHr = document.querySelector("hr");
  const planetsInfo = document.querySelector(".planets_info");

  // menu where it was originally
  const menuOriginalNext = menu.nextElementSibling;

  function moveMenu() {
    if (window.innerWidth <= 600) {
      // place after the first hr
      firstHr.insertAdjacentElement("afterend", menu);
    } else {
      // move back
      if (menuOriginalNext) {
        planetsInfo.insertBefore(menu, menuOriginalNext);
      } else {
        planetsInfo.appendChild(menu);
      }
    }
  }

  moveMenu();

  // for resizing window
  window.addEventListener("resize", moveMenu);
});

//data from JSON
let planetsData = [];
async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    planetsData = data;

    initApp();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function initApp() {
  //text replacement depending on the planet
  const planetsnName = document.querySelector(".planets_name");
  const planetsDescription = document.querySelector(".planets_description");
  const rotation = document.querySelector(".rotation");
  const revolution = document.querySelector(".revolution");
  const radius = document.querySelector(".radius");
  const temperature = document.querySelector(".temperature");
  const wikipedia = document.querySelector(".wikipedia");

  function getPlanetData(name) {
    return planetsData.find((p) => p.name.toLowerCase() === name);
  }

  planetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedPlanet = getPlanetData(button.dataset.planet);
      if (selectedPlanet) {
        planetsnName.textContent = selectedPlanet.name;
        planetsDescription.textContent = selectedPlanet.overview.content;
        wikipedia.querySelector("a").href = selectedPlanet.overview.source;
        rotation.textContent = selectedPlanet.rotation;
        revolution.textContent = selectedPlanet.revolution;
        radius.textContent = selectedPlanet.radius;
        temperature.textContent = selectedPlanet.temperature;
      }
    });
  });

  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      menuItem.forEach((itm) => itm.classList.remove("active"));
      item.classList.add("active");
      updateGeologyImage(planet, item.dataset.section);
      const selectedPlanet = getPlanetData(planet);
      if (selectedPlanet) {
        if (item.dataset.section === "overview") {
          planetsDescription.textContent = selectedPlanet.overview.content;
          wikipedia.querySelector("a").href = selectedPlanet.overview.source;
        } else if (item.dataset.section === "structure") {
          planetsDescription.textContent = selectedPlanet.structure.content;
          wikipedia.querySelector("a").href = selectedPlanet.structure.source;
        } else if (item.dataset.section === "surface") {
          planetsDescription.textContent = selectedPlanet.geology.content;
          wikipedia.querySelector("a").href = selectedPlanet.geology.source;
        }
      }
    });
  });
}
fetchData();
