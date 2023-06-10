let conversationArray = [
  {
    Name: "Connor Walton",
    date: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    Name: "Emilie Beach",
    date: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    Name: "Miles Acosta",
    date: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

let parentClassUserComments = document.querySelector(
  ".user-comments-container"
);

const formSubmission = document.querySelector(
  ".conversation__comment-contaier__comment-outer-container--form"
);

formSubmission.addEventListener("submit", (event) => {
  event.preventDefault();
  let dateTime = new Date();
  let date = dateTime.toLocaleDateString();
  addComment(event.target.name.value, date, event.target.comment.value);
  // Create a new comment object
  const newComment = {
    Name: event.target.name.value,
    date: date,
    comment: event.target.comment.value,
  };

  // Push the new comment to the comments array
  conversationArray.unshift(newComment);
  console.log(conversationArray);

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

  let nameEmailDiv = document.createElement("div"); // New container div
  nameEmailDiv.className = "user-comments-container__name-email-div";

  let newName = document.createElement("div");
  newName.className = "user-comments-container__outerdiv--name";
  newName.innerHTML = name;
  nameEmailDiv.appendChild(newName);

  let newEmail = document.createElement("div");
  newEmail.className = "user-comments-container__outerdiv--email";
  newEmail.innerHTML = date;
  nameEmailDiv.appendChild(newEmail);

  newOuterDiv.appendChild(nameEmailDiv);

  let newComment = document.createElement("div");
  newComment.className = "user-comments-container__outerdiv--comment";
  newComment.innerHTML = comment;
  newOuterDiv.appendChild(newComment);

  let newHr = document.createElement("hr");

  parentClassUserComments.appendChild(newOuterDiv);
  parentClassUserComments.appendChild(newHr);
}

// function updateCommentSection(name, date, comment) {
//   let newObj = { Name: name, date, date, Comment: comment };
//   conversationArray.append(newObj);
//   return conversationArray;
//   //console.log(conversationArray);
//   //Clears all comments from the page
//   //Re-renders to the page all comments from the comment array
//   //Clears the input fields after submitting a new comment
// }

for (let i = 0; i < conversationArray.length; i++) {
  let image = document.createElement("img");
  image.className = "user-comments-container__image-container--avatar";
  let imageDiv = document.createElement("div");
  imageDiv.className = "user-comments-container__image-container";
  imageDiv.appendChild(image);

  let outerDiv = document.createElement("div");
  outerDiv.className = "user-comments-container__outerdiv";
  outerDiv.appendChild(imageDiv);

  let nameAndEmailDiv = document.createElement("div"); // New div for name and email
  nameAndEmailDiv.className = "user-comments-container__name-email-div"; // Replace with desired class name

  let name = document.createElement("div");
  name.className = "user-comments-container__outerdiv--name";
  name.innerHTML = conversationArray[i].Name;
  nameAndEmailDiv.appendChild(name);

  let email = document.createElement("div");
  email.className = "user-comments-container__outerdiv--email";
  email.innerHTML = conversationArray[i].date;
  nameAndEmailDiv.appendChild(email);

  outerDiv.appendChild(nameAndEmailDiv); // Append the new div containing name and email

  let comment = document.createElement("div");
  comment.className = "user-comments-container__outerdiv--comment";
  comment.innerHTML = conversationArray[i].comment;
  outerDiv.appendChild(comment);

  let hr = document.createElement("hr");

  parentClassUserComments.appendChild(outerDiv);
  parentClassUserComments.appendChild(hr);
}

console.log(conversationArray);
