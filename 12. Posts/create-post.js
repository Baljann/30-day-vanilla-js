document
  .getElementById("create-post-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    createPost();
  });

function createPost() {
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  if (!title || !body) {
    console.error("Title and body are required");
    return;
  }

  const post = {
    title,
    body,
  };
  console.log(post);

  createPostData(post);
}

function createPostData(post) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post created:", data);
      // Optionally, redirect after success:
      // window.location.href = "index.html";
    })
    .catch((error) => console.error("Error creating post:", error));
}

// If form data is valid, make an API request to create the post (POST request)
// Once succesccful response is recieved, show a success message on the screen
// Clear the form
