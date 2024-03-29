const url = "https://project-1-api.herokuapp.com/";
const api_key = "a64cef94-0295-4c01-8470-4e776116845e";

let shows = [];

// Function to display shows
function displayShows() {
  axios.get(`${url}showdates?api_key=${api_key}`).then((response) => {
    shows = response.data;
    const firstShow = shows[0];
    specialFirstDiv(firstShow);
    console.log(shows[0]);

    // Loop through the shows array starting from index 1
    for (let i = 1; i < shows.length; i++) {
      // Date div
      let showsContainerDate = document.createElement("div");
      showsContainerDate.classList.add("shows__container--date");

      // Date title
      let showsContainerDateTitle = document.createElement("div");
      showsContainerDateTitle.classList.add("shows__container--date--title");
      showsContainerDateTitle.innerText = "DATE";

      // Date value
      let showsContainerDateActualValue = document.createElement("div");
      showsContainerDateActualValue.classList.add(
        "shows__container--date--actualvalue"
      );
      let d = new Date(shows[i].date);
      showsContainerDateActualValue.innerText = d.toDateString();

      showsContainerDate.appendChild(showsContainerDateTitle);
      showsContainerDate.appendChild(showsContainerDateActualValue);

      // Venue div
      let venueContainer = document.createElement("div");
      venueContainer.classList.add("shows__container--venue");

      // Venue title
      let venueContainerTitle = document.createElement("div");
      venueContainerTitle.classList.add("shows__container--venue--title");
      venueContainerTitle.innerText = "VENUE";

      // Venue value
      let venueContainerActualValue = document.createElement("div");
      venueContainerActualValue.classList.add(
        "shows__container--venue--actualvalue"
      );
      venueContainerActualValue.innerText = shows[i].place;

      venueContainer.appendChild(venueContainerTitle);
      venueContainer.appendChild(venueContainerActualValue);

      // Location div
      let locationContainerDate = document.createElement("div");
      locationContainerDate.classList.add("shows__container--location");

      // Location title
      let locationContainerDateTitle = document.createElement("div");
      locationContainerDateTitle.classList.add(
        "shows__container--location--title"
      );
      locationContainerDateTitle.innerText = "LOCATION";

      // Location value
      let locationContainerDateActualValue = document.createElement("div");
      locationContainerDateActualValue.classList.add(
        "shows__container--location--actualvalue"
      );
      locationContainerDateActualValue.innerText = shows[i].location;

      locationContainerDate.appendChild(locationContainerDateTitle);
      locationContainerDate.appendChild(locationContainerDateActualValue);

      // Button div
      let button = document.createElement("button");
      let buttonContainer = document.createElement("div");
      buttonContainer.className = "shows__container--btn";
      button.classList.add("shows__container--btn-buy-tickets");
      button.innerHTML = "BUY TICKETS";
      buttonContainer.appendChild(button);

      // Outer shows container
      let showsOuterContainer = document.createElement("div");
      showsOuterContainer.className = "shows__container__showsOuterContainer";
      showsOuterContainer.appendChild(showsContainerDate);
      showsOuterContainer.appendChild(venueContainer);
      showsOuterContainer.appendChild(locationContainerDate);
      showsOuterContainer.appendChild(buttonContainer);

      showsContainer.appendChild(showsOuterContainer);

      // Line divider
      let lineDivider = document.createElement("hr");
      lineDivider.classList.add("shows__container--line-divider");
      showsContainer.appendChild(lineDivider);
    }
  });
}

const showsContainer = document.querySelector(".shows__container");

// Call the displayShows function to display the shows
displayShows();

// Add event listener for click event on showsContainer
showsContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const outerContainer = clickedElement.closest(
    ".shows__container__showsOuterContainer"
  );
  if (outerContainer) {
    outerContainer.classList.toggle(
      "shows__container__showsOuterContainer--selected"
    );

    // Toggle selected class for other containers
    const otherContainers = showsContainer.querySelectorAll(
      ".shows__container__showsOuterContainer"
    );
    otherContainers.forEach((container) => {
      if (container !== outerContainer) {
        container.classList.remove(
          "shows__container__showsOuterContainer--selected"
        );
      }
    });
  }
});

const showsContain = document.querySelectorAll(
  ".shows__container__showsOuterContainer"
);

// Function to hide names
function hideName() {
  // Empty loop with no code inside
  for (let i = 1; i < showsContain.length; i++) {
    // Empty loop body
  }
}

// Function to create and display special first show div
function specialFirstDiv(firstShow) {
  // Date div
  let showsContainerDate = document.createElement("div");
  showsContainerDate.classList.add("shows__container--date");

  // Date title
  let showsContainerDateTitle = document.createElement("div");
  showsContainerDateTitle.classList.add("shows__container--date--firsttitle");
  showsContainerDateTitle.innerText = "DATE";

  // Date value
  let showsContainerDateActualValue = document.createElement("div");
  showsContainerDateActualValue.classList.add(
    "shows__container--date--firstactualvalue"
  );
  let d = new Date(firstShow.date);
  showsContainerDateActualValue.innerText = d.toDateString();

  showsContainerDate.appendChild(showsContainerDateTitle);
  showsContainerDate.appendChild(showsContainerDateActualValue);

  // Venue div
  let venueContainer = document.createElement("div");
  venueContainer.classList.add("shows__container--venue");

  // Venue title
  let venueContainerTitle = document.createElement("div");
  venueContainerTitle.classList.add("shows__container--venue--firsttitle");
  venueContainerTitle.innerText = "VENUE";

  // Venue value
  let venueContainerActualValue = document.createElement("div");
  venueContainerActualValue.classList.add(
    "shows__container--venue--firstactualvalue"
  );
  venueContainerActualValue.innerText = firstShow.place;

  venueContainer.appendChild(venueContainerTitle);
  venueContainer.appendChild(venueContainerActualValue);

  // Location div
  let locationContainerDate = document.createElement("div");
  locationContainerDate.classList.add("shows__container--location");

  // Location title
  let locationContainerDateTitle = document.createElement("div");
  locationContainerDateTitle.classList.add(
    "shows__container--location--firsttitle"
  );
  locationContainerDateTitle.innerText = "LOCATION";

  // Location value
  let locationContainerDateActualValue = document.createElement("div");
  locationContainerDateActualValue.classList.add(
    "shows__container--location--firstactualvalue"
  );
  locationContainerDateActualValue.innerText = firstShow.location;

  locationContainerDate.appendChild(locationContainerDateTitle);
  locationContainerDate.appendChild(locationContainerDateActualValue);

  // Button div
  let button = document.createElement("button");
  let buttonContainer = document.createElement("div");
  buttonContainer.className = "shows__container--btn";
  button.classList.add("shows__container--btn-buy-tickets");
  button.innerHTML = "BUY TICKETS";
  buttonContainer.appendChild(button);

  // Outer shows container
  let showsOuterContainer = document.createElement("div");
  showsOuterContainer.className = "shows__container__showsOuterContainer";
  showsOuterContainer.appendChild(showsContainerDate);
  showsOuterContainer.appendChild(venueContainer);
  showsOuterContainer.appendChild(locationContainerDate);
  showsOuterContainer.appendChild(buttonContainer);

  showsContainer.appendChild(showsOuterContainer);

  // Line divider
  let lineDivider = document.createElement("hr");
  lineDivider.classList.add("shows__container--line-divider");
  showsContainer.appendChild(lineDivider);
}
