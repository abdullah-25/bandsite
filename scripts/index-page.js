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

for (let i = 0; i < conversationArray.length; i++) {
  let parentClassUserComments = document.querySelector(
    ".user-comments-container"
  );
  let image = document.createElement("img");
  image.src = "http://placeholder.";
  image.className = "user-comments-container__avatar";
  image.style = "width: 36px;height: 36px";
  let outerDiv = document.createElement("div");
  outerDiv.className = "user-comments-container__outerdiv";
  let name = document.createElement("div");
  name.className = "user-comments-container__outerdiv--name";
  name.innerHTML = conversationArray[i].Name;
  let email = document.createElement("div");
  email.className = "user-comments-container__outerdiv--email";
  email.innerHTML = conversationArray[i].date;
  let comment = document.createElement("div");
  comment.className = "user-comments-container__outerdiv--comment";
  comment.innerHTML = conversationArray[i].comment;

  let hr = document.createElement("hr");

  parentClassUserComments.appendChild(image);
  parentClassUserComments.appendChild(outerDiv);
  outerDiv.appendChild(name);
  outerDiv.appendChild(email);
  outerDiv.appendChild(comment);
  parentClassUserComments.appendChild(outerDiv);
  parentClassUserComments.appendChild(hr);
}
