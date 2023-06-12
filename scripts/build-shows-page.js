const url = "https://project-1-api.herokuapp.com/";
const api_key = "a64cef94-0295-4c01-8470-4e776116845e";

let shows = [];

function displayShows() {
  axios.get(`${url}showdates?api_key=${api_key}`).then((response) => {
    shows = response.data;
    console.log(shows);
    for (let i = 0; i < shows.length; i++) {
      //date div
      let showsContainerDate = document.createElement("div");
      showsContainerDate.classList.add("shows__container--date");

      let showsContainerDateTitle = document.createElement("div");
      showsContainerDateTitle.classList.add("shows__container--date--title");
      showsContainerDateTitle.innerText = "DATE";

      let showsContainerDateActualValue = document.createElement("div");
      showsContainerDateActualValue.classList.add(
        "shows__container--date--actualvalue"
      );

      let d = new Date(shows[i].date);

      showsContainerDateActualValue.innerText = d.toDateString();

      showsContainerDate.appendChild(showsContainerDateTitle);
      showsContainerDate.appendChild(showsContainerDateActualValue);
      //showsContainer.appendChild(showsContainerDate);

      //venue div
      let venueContainer = document.createElement("div");
      venueContainer.classList.add("shows__container--venue");

      let venueContainerTitle = document.createElement("div");
      venueContainerTitle.classList.add("shows__container--venue--title");
      venueContainerTitle.innerText = "VENUE";

      let venueContainerActualValue = document.createElement("div");
      venueContainerActualValue.classList.add(
        "shows__container--venue--actualvalue"
      );
      venueContainerActualValue.innerText = shows[i].place;

      venueContainer.appendChild(venueContainerTitle);
      venueContainer.appendChild(venueContainerActualValue);
      //showsContainer.appendChild(venueContainer);

      //location div
      let locationContainerDate = document.createElement("div");
      locationContainerDate.classList.add("shows__container--location");

      let locationContainerDateTitle = document.createElement("div");
      locationContainerDateTitle.classList.add(
        "shows__container--location--title"
      );
      locationContainerDateTitle.innerText = "LOCATION";

      let locationContainerDateActualValue = document.createElement("div");
      locationContainerDateActualValue.classList.add(
        "shows__container--location--actualvalue"
      );
      locationContainerDateActualValue.innerText = shows[i].location;

      locationContainerDate.appendChild(locationContainerDateTitle);
      locationContainerDate.appendChild(locationContainerDateActualValue);
      //showsContainer.appendChild(locationContainerDate);

      //button div
      let button = document.createElement("button");
      let buttonContainer = document.createElement("div");
      buttonContainer.className = "shows__container--btn";
      button.classList.add("shows__container--btn-buy-tickets");
      button.innerHTML = "BUY TICKETS";
      buttonContainer.appendChild(button);

      let showsOuterContainer = document.createElement("div");
      showsOuterContainer.className = "shows__container__showsOuterContainer";
      showsOuterContainer.appendChild(showsContainerDate);
      showsOuterContainer.appendChild(venueContainer);
      showsOuterContainer.appendChild(locationContainerDate);
      showsOuterContainer.appendChild(buttonContainer);

      showsContainer.appendChild(showsOuterContainer);

      //line divider

      let lineDivider = document.createElement("hr");
      lineDivider.classList.add("shows__container--line-divider");

      showsContainer.appendChild(lineDivider);

      showsOuterContainer.addEventListener("click", () => {
        showsOuterContainer.classList.toggle("selected");
      });
    }
  });
}

displayShows();

let showsContainer = document.querySelector(".shows__container");
