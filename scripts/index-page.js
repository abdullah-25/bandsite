const url_index = "https://project-1-api.herokuapp.com/";
const api_key_index = "a64cef94-0295-4c01-8470-4e776116845e";

let parentClassUserComments = document.querySelector(
  ".user-comments-container"
);

const formSubmission = document.querySelector(
  ".conversation__comment-contaier__comment-outer-container--form"
);

const formErrorName = document.getElementById("name");
const formErroComment = document.getElementById("comment");

let conversationArray = "";

axios.get(`${url_index}comments?api_key=${api_key_index}`).then((response) => {
  conversationArray = response.data;
  conversationArray.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  console.log(conversationArray);
  displayComments();
});

formSubmission.addEventListener("submit", (event) => {
  event.preventDefault();
  let dateTime = new Date();
  let date = dateTime.toLocaleDateString();

  if (
    event.target.name.value.trim() === "" ||
    event.target.comment.value.trim() === ""
  ) {
    formErrorName.classList.add(
      "conversation__comment-contaier__comment-outer-container--form--error"
    );
    formErroComment.classList.add(
      "conversation__comment-contaier__comment-outer-container--form--error"
    );
    // if (!event.target.name.value || !event.target.comment.value) {
    //   return res.status(400).json({ error: 'Both name and comment are required' });
    // }
    return;
  } else {
    formErrorName.classList.remove(
      "conversation__comment-contaier__comment-outer-container--form--error"
    );
    formErroComment.classList.remove(
      "conversation__comment-contaier__comment-outer-container--form--error"
    );
  }

  addComment(event.target.name.value, date, event.target.comment.value);

  axios
    .post(`${url_index}comments?api_key=${api_key_index}`, {
      name: event.target.name.value,
      comment: event.target.comment.value,
    })
    .then(function (response) {
      conversationArray.unshift(response.data);
      displayComments();
    });
  if (!event.target.name.value || !event.target.comment.value) {
    return res
      .status(400)
      .json({ error: "Both name and comment are required" });
  }

  // Clear the input fields
  event.target.name.value = "";
  event.target.comment.value = "";
});

function addComment(name, date, comment) {
  let newImage = document.createElement("img");
  newImage.className = "user-comments-container__image-container--avatar";

  let imageDiv = document.createElement("div");
  imageDiv.className = "user-comments-container__image-container";
  imageDiv.appendChild(newImage);

  let newOuterDiv = document.createElement("div");
  newOuterDiv.className = "user-comments-container__outerdiv";
  newOuterDiv.appendChild(imageDiv);

  let nameAndEmailDiv = document.createElement("div"); // New div for name and email
  nameAndEmailDiv.className = "user-comments-container__name-email-div"; // Replace with desired class name

  let newName = document.createElement("div");
  newName.className = "user-comments-container__outerdiv--name";
  newName.innerHTML = name;
  nameAndEmailDiv.appendChild(newName);

  let newEmail = document.createElement("div");
  newEmail.className = "user-comments-container__outerdiv--email";
  newEmail.innerHTML = date;
  nameAndEmailDiv.appendChild(newEmail);

  newOuterDiv.appendChild(nameAndEmailDiv); // Append the new div containing name and email

  let newComment = document.createElement("div");
  newComment.className = "user-comments-container__outerdiv--comment";
  newComment.innerHTML = comment;
  newOuterDiv.appendChild(newComment);

  let likebtnContainer = document.createElement("div");
  likebtnContainer.className =
    "user-comments-container__outerdiv--likebtnContainer";
  let likebtn = document.createElement("button");
  likebtn.className = "user-comments-container__outerdiv--likebtn";

  likebtnContainer.appendChild(likebtn);

  likebtn.innerHTML = `Like ${comment.likes}`;
  newOuterDiv.appendChild(likebtnContainer);

  let deletebtnContainer = document.createElement("div");
  likebtnContainer.className =
    "user-comments-container__outerdiv--deletebtnContainer";
  let deletebtn = document.createElement("button");
  deletebtn.className = "user-comments-container__outerdiv--deletebtn";

  deletebtnContainer.appendChild(deletebtn);

  deletebtn.innerHTML = `Delete`;
  newOuterDiv.appendChild(deletebtnContainer);

  if (likebtn) {
    likebtn.addEventListener("click", function () {
      likebtn.innerHTML = `Like ${comment.likes + 1}`;
      comment.likes += 1;
    });
  } else {
    console.log("Element with the specified selector was not found.");
  }

  if (deletebtn) {
    likebtn.addEventListener("click", function () {
      likebtn.innerHTML = `Like ${comment.likes + 1}`;
      comment.likes += 1;
    });
  } else {
    console.log("Element with the specified selector was not found.");
  }

  let newHr = document.createElement("hr");
  newOuterDiv.appendChild(newHr);

  parentClassUserComments.appendChild(newOuterDiv);
  parentClassUserComments.appendChild(newHr); // Append the <hr> element at the bottom
}

// Function to display the comments

function displayComments() {
  console.log("display comments");
  // Clear the existing comments
  parentClassUserComments.innerHTML = "";

  for (let i = 0; i < conversationArray.length; i++) {
    const comment = conversationArray[i];

    let newImage = document.createElement("img");
    newImage.className = "user-comments-container__image-container--avatar";

    let imageDiv = document.createElement("div");
    imageDiv.className = "user-comments-container__image-container";
    imageDiv.appendChild(newImage);

    let newOuterDiv = document.createElement("div");
    newOuterDiv.className = "user-comments-container__outerdiv";
    newOuterDiv.appendChild(imageDiv);

    let nameAndEmailDiv = document.createElement("div");
    nameAndEmailDiv.className = "user-comments-container__name-email-div";

    let newName = document.createElement("div");
    newName.className = "user-comments-container__outerdiv--name";
    newName.innerHTML = comment.name;
    nameAndEmailDiv.appendChild(newName);

    let newEmail = document.createElement("div");
    newEmail.className = "user-comments-container__outerdiv--email";
    let d = new Date(comment.timestamp);
    newEmail.innerHTML = d.toLocaleDateString();
    nameAndEmailDiv.appendChild(newEmail);

    newOuterDiv.appendChild(nameAndEmailDiv);

    let newComment = document.createElement("div");
    newComment.className = "user-comments-container__outerdiv--comment";
    newComment.innerHTML = comment.comment;
    newOuterDiv.appendChild(newComment);

    let likebtnContainer = document.createElement("div");
    likebtnContainer.className =
      "user-comments-container__outerdiv--likebtnContainer";
    let likebtn = document.createElement("button");
    likebtn.className = "user-comments-container__outerdiv--likebtn";

    likebtnContainer.appendChild(likebtn);

    likebtn.innerHTML = `Like ${comment.likes}`;
    newOuterDiv.appendChild(likebtnContainer);

    let deletebtnContainer = document.createElement("div");
    likebtnContainer.className =
      "user-comments-container__outerdiv--deletebtnContainer";
    let deletebtn = document.createElement("button");
    deletebtn.className = "user-comments-container__outerdiv--deletebtn";

    deletebtnContainer.appendChild(deletebtn);

    deletebtn.innerHTML = `Delete`;
    newOuterDiv.appendChild(deletebtnContainer);

    let newHr = document.createElement("hr");
    newOuterDiv.appendChild(newHr);

    parentClassUserComments.appendChild(newOuterDiv);
    parentClassUserComments.appendChild(newHr);

    if (likebtn) {
      likebtn.addEventListener("click", function () {
        likebtn.innerHTML = `Like ${comment.likes + 1}`;
        comment.likes += 1;
        axios
          .put(
            `${url_index}comments/${comment.id}/like?api_key=${api_key_index}`
          )
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    } else {
      console.log("Element with the specified selector was not found.");
    }

    if (deletebtn) {
      deletebtn.addEventListener("click", function () {
        newOuterDiv.remove();
        const hr = document.querySelector(
          ".conversation__comment-contaier--line-break"
        );
        // hr.remove();
        axios
          .delete(
            `${url_index}comments/${comment.id}/?api_key=${api_key_index}`
          )
          .then(function (response) {
            console.log(comment.id);
            conversationArray = conversationArray.filter(
              (com) => com.id !== comment.id
            );
            displayComments();
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    }
  }
}

// Call the displayComments function to display the comments initially
displayComments();

const bioLink = document.querySelector(".topnav__link--bio");
const showsLink = document.querySelector(".topnav__link--shows");

bioLink.addEventListener("click", function () {
  bioLink.classList.add("topnav__link--active");
  showsLink.classList.remove("topnav__link--active");
});

showsLink.addEventListener("click", function () {
  showsLink.classList.add("topnav__link--active");
  bioLink.classList.remove("topnav__link--active");
});

console.log(conversationArray);
