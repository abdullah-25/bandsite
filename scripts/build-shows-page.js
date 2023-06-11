let shows = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

let showsContainer = document.querySelector(".shows__container");

for (let show of shows) {
  showDisplay(show);
}

function showDisplay(show) {
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
  showsContainerDateActualValue.innerText = show.date;

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
  venueContainerActualValue.innerText = show.venue;

  venueContainer.appendChild(venueContainerTitle);
  venueContainer.appendChild(venueContainerActualValue);
  //showsContainer.appendChild(venueContainer);

  //location div
  let locationContainerDate = document.createElement("div");
  locationContainerDate.classList.add("shows__container--location");

  let locationContainerDateTitle = document.createElement("div");
  locationContainerDateTitle.classList.add("shows__container--location--title");
  locationContainerDateTitle.innerText = "LOCATION";

  let locationContainerDateActualValue = document.createElement("div");
  locationContainerDateActualValue.classList.add(
    "shows__container--location--actualvalue"
  );
  locationContainerDateActualValue.innerText = show.location;

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
