const urlIndex = "https://project-1-api.herokuapp.com/";
const apiKeyIndex = "a64cef94-0295-4c01-8470-4e776116845e";

const parentClassUserComments = document.querySelector(
  ".user-comments-container"
);
const formSubmission = document.querySelector(
  ".conversation__comment-contaier__comment-outer-container--form"
);
const formErrorName = document.getElementById("name");
const formErrorComment = document.getElementById("comment");

let conversationArray = [];

axios.get(`${urlIndex}comments?api_key=${apiKeyIndex}`).then((response) => {
  conversationArray = response.data;
  conversationArray.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  console.log(conversationArray);
  displayComments();
});

formSubmission.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.name.value.trim();
  const comment = event.target.comment.value.trim();

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

  const dateTime = new Date();
  const date = dateTime.toLocaleDateString();

  addComment(name, date, comment);

  axios
    .post(`${urlIndex}comments?api_key=${apiKeyIndex}`, { name, comment })
    .then((response) => {
      conversationArray.unshift(response.data);
      displayComments();
    })
    .catch((error) => {
      console.error(error);
    });

  event.target.name.value = "";
  event.target.comment.value = "";
});

function addComment(name, date, comment) {
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

  parentClassUserComments.appendChild(newOuterDiv);
  parentClassUserComments.appendChild(newHr);

  likebtn.addEventListener("click", () => {
    likebtn.innerHTML = `Like ${comment.likes + 1}`;
    comment.likes += 1;
  });

  deletebtn.addEventListener("click", () => {
    newOuterDiv.remove();
    const hr = document.querySelector(
      ".conversation__comment-contaier--line-break"
    );

    axios
      .delete(`${urlIndex}comments/${comment.id}/?api_key=${apiKeyIndex}`)
      .then((response) => {
        console.log(comment.id);
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

function displayComments() {
  console.log("display comments");
  parentClassUserComments.innerHTML = "";

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

    parentClassUserComments.appendChild(newOuterDiv);
    parentClassUserComments.appendChild(newHr);

    likebtn.addEventListener("click", () => {
      likebtn.innerHTML = `Like ${comment.likes + 1}`;
      comment.likes += 1;
      axios
        .put(`${urlIndex}comments/${comment.id}/like?api_key=${apiKeyIndex}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    deletebtn.addEventListener("click", () => {
      newOuterDiv.remove();
      const hr = document.querySelector(
        ".conversation__comment-contaier--line-break"
      );

      axios
        .delete(`${urlIndex}comments/${comment.id}/?api_key=${apiKeyIndex}`)
        .then((response) => {
          console.log(comment.id);
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
