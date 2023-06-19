const urlIndex = "https://project-1-api.herokuapp.com/";
const apiKeyIndex = "a64cef94-0295-4c01-8470-4e776116845e";

// Get the parent container element for comments
const parentClassUserComments = document.querySelector(
  ".user-comments-container"
);

// Get the form element for comment submission
const formSubmission = document.querySelector(
  ".conversation__comment-contaier__comment-outer-container--form"
);

// Get the error elements for form validation
const formErrorName = document.getElementById("name");
const formErrorComment = document.getElementById("comment");

// Array to store comments
let conversationArray = [];

// Retrieve comments from the API and sort them by timestamp in descending order
axios.get(`${urlIndex}comments?api_key=${apiKeyIndex}`).then((response) => {
  conversationArray = response.data;
  conversationArray.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  console.log(conversationArray);
  displayComments();
});

// Event listener for form submission
formSubmission.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the name and comment values from the form
  const name = event.target.name.value.trim();
  const comment = event.target.comment.value.trim();

  // Validate the form inputs
  if (name === "" || comment === "") {
    formErrorName.classList.add(
      "conversation__comment-contaier__comment-outer-container--form--error"
    );
    formErrorComment.classList.add(
      "conversation__comment-contaier__comment-outer-container--form--error"
    );
    return;
  } else {
    formErrorName.classList.remove(
      "conversation__comment-contaier__comment-outer-container--form--error"
    );
    formErrorComment.classList.remove(
      "conversation__comment-contaier__comment-outer-container--form--error"
    );
  }

  // Create the current date
  const dateTime = new Date();
  const date = dateTime.toLocaleDateString();

  // Add the comment to the UI
  addComment(name, date, comment);

  // Send the comment data to the API
  axios
    .post(`${urlIndex}comments?api_key=${apiKeyIndex}`, { name, comment })
    .then((response) => {
      // Add the new comment to the conversationArray and update the UI
      conversationArray.unshift(response.data);
      displayComments();
    })
    .catch((error) => {
      console.error(error);
    });

  // Clear the form inputs
  event.target.name.value = "";
  event.target.comment.value = "";
});

// Function to add a comment to the UI
function addComment(name, date, comment) {
  // Create and append the HTML elements for the comment
  const newImage = document.createElement("img");
  newImage.className = "user-comments-container__image-container--avatar";

  const imageDiv = document.createElement("div");
  imageDiv.className = "user-comments-container__image-container";
  imageDiv.appendChild(newImage);

  const newOuterDiv = document.createElement("div");
  newOuterDiv.className = "user-comments-container__outerdiv";
  newOuterDiv.appendChild(imageDiv);

  const nameAndEmailDiv = document.createElement("div");
  nameAndEmailDiv.className = "user-comments-container__name-email-div";

  const newName = document.createElement("div");
  newName.className = "user-comments-container__outerdiv--name";
  newName.innerHTML = name;
  nameAndEmailDiv.appendChild(newName);

  const newEmail = document.createElement("div");
  newEmail.className = "user-comments-container__outerdiv--email";
  newEmail.innerHTML = date;
  nameAndEmailDiv.appendChild(newEmail);

  newOuterDiv.appendChild(nameAndEmailDiv);

  const newComment = document.createElement("div");
  newComment.className = "user-comments-container__outerdiv--comment";
  newComment.innerHTML = comment;
  newOuterDiv.appendChild(newComment);

  const likebtnContainer = document.createElement("div");
  likebtnContainer.className =
    "user-comments-container__outerdiv--likebtnContainer";
  const likebtn = document.createElement("button");
  likebtn.className = "user-comments-container__outerdiv--likebtn";

  likebtnContainer.appendChild(likebtn);

  likebtn.innerHTML = `Like ${comment.likes}`;
  newOuterDiv.appendChild(likebtnContainer);

  const deletebtnContainer = document.createElement("div");
  deletebtnContainer.className =
    "user-comments-container__outerdiv--deletebtnContainer";
  const deletebtn = document.createElement("button");
  deletebtn.className = "user-comments-container__outerdiv--deletebtn";

  deletebtnContainer.appendChild(deletebtn);

  deletebtn.innerHTML = `Delete`;
  newOuterDiv.appendChild(deletebtnContainer);

  const newHr = document.createElement("hr");
  newHr.className = "user-comments-container__hr";
  newOuterDiv.appendChild(newHr);

  // Append the comment elements to the parent container
  parentClassUserComments.appendChild(newOuterDiv);
  parentClassUserComments.appendChild(newHr);

  // Event listener for the like button
  likebtn.addEventListener("click", () => {
    likebtn.innerHTML = `Like ${comment.likes + 1}`;
    comment.likes += 1;
  });

  // Event listener for the delete button
  deletebtn.addEventListener("click", () => {
    newOuterDiv.remove();

    // Delete the comment from the API and update the UI
    axios
      .delete(`${urlIndex}comments/${comment.id}/?api_key=${apiKeyIndex}`)
      .then((response) => {
        conversationArray = conversationArray.filter(
          (com) => com.id !== comment.id
        );
        displayComments();
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

// Function to display the comments
function displayComments() {
  console.log("display comments");
  // Clear the parent container
  parentClassUserComments.innerHTML = "";

  // Loop through the conversationArray and create the comment elements
  for (let i = 0; i < conversationArray.length; i++) {
    const comment = conversationArray[i];

    const newImage = document.createElement("img");
    newImage.className = "user-comments-container__image-container--avatar";

    const imageDiv = document.createElement("div");
    imageDiv.className = "user-comments-container__image-container";
    imageDiv.appendChild(newImage);

    const newOuterDiv = document.createElement("div");
    newOuterDiv.className = "user-comments-container__outerdiv";
    newOuterDiv.appendChild(imageDiv);

    const nameAndEmailDiv = document.createElement("div");
    nameAndEmailDiv.className = "user-comments-container__name-email-div";

    const newName = document.createElement("div");
    newName.className = "user-comments-container__outerdiv--name";
    newName.innerHTML = comment.name;
    nameAndEmailDiv.appendChild(newName);

    const newEmail = document.createElement("div");
    newEmail.className = "user-comments-container__outerdiv--email";
    const d = new Date(comment.timestamp);
    newEmail.innerHTML = d.toLocaleDateString();
    nameAndEmailDiv.appendChild(newEmail);

    newOuterDiv.appendChild(nameAndEmailDiv);

    const newComment = document.createElement("div");
    newComment.className = "user-comments-container__outerdiv--comment";
    newComment.innerHTML = comment.comment;
    newOuterDiv.appendChild(newComment);

    const likebtnContainer = document.createElement("div");
    likebtnContainer.className =
      "user-comments-container__outerdiv--likebtnContainer";
    const likebtn = document.createElement("button");
    likebtn.className = "user-comments-container__outerdiv--likebtn";

    likebtnContainer.appendChild(likebtn);

    likebtn.innerHTML = `Like ${comment.likes}`;
    newOuterDiv.appendChild(likebtnContainer);

    const deletebtnContainer = document.createElement("div");
    deletebtnContainer.className =
      "user-comments-container__outerdiv--deletebtnContainer";
    const deletebtn = document.createElement("button");
    deletebtn.className = "user-comments-container__outerdiv--deletebtn";

    deletebtnContainer.appendChild(deletebtn);

    deletebtn.innerHTML = `Delete`;
    newOuterDiv.appendChild(deletebtnContainer);

    const newHr = document.createElement("hr");
    newHr.className = "user-comments-container__hr";
    newOuterDiv.appendChild(newHr);

    // Append the comment elements to the parent container
    parentClassUserComments.appendChild(newOuterDiv);
    parentClassUserComments.appendChild(newHr);

    // Event listener for the like button
    likebtn.addEventListener("click", () => {
      likebtn.innerHTML = `Like ${comment.likes + 1}`;
      comment.likes += 1;
    });

    // Event listener for the delete button
    deletebtn.addEventListener("click", () => {
      newOuterDiv.remove();

      // Delete the comment from the API and update the UI
      axios
        .delete(`${urlIndex}comments/${comment.id}/?api_key=${apiKeyIndex}`)
        .then((response) => {
          conversationArray = conversationArray.filter(
            (com) => com.id !== comment.id
          );
          displayComments();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}

// Call the displayComments function to display the comments initially
displayComments();
