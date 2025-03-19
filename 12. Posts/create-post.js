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
      showSuccessMessage("Post created successfully!");
      clearForm();
    })
    .catch((error) => {
      console.error("Error creating post:", error);
      showErrorMessage("Failed to create post. Please try again.");
    });
}

function showSuccessMessage(message) {
  const successMessageElement = document.getElementById("success-message");
  successMessageElement.textContent = message;
  successMessageElement.style.display = "block";

  setTimeout(() => {
    successMessageElement.style.display = "none";
  }, 3000);
}

function showErrorMessage(message) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
  errorMessageElement.style.display = "block";

  setTimeout(() => {
    errorMessageElement.style.display = "none";
  }, 3000);
}

function clearForm() {
  document.getElementById("create-post-form").reset();
}
document
  .getElementById("clear-form-button")
  .addEventListener("click", clearForm);

document.getElementById("back-to-home").addEventListener("click", () => {
  window.location.href = "./index.html";
});
