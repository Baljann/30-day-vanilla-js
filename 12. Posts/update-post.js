const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
console.log(params, postId);

async function fetchPostData(postId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const postData = await response.json();
    prefillForm(postData);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function prefillForm(postData) {
  document.getElementById("title").value = postData.title;
  document.getElementById("body").value = postData.body;
}

fetchPostData(postId);

document.getElementById("update-form").addEventListener("submit", updatePost);

function updatePost(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const post = {
    title,
    body,
  };
  console.log(post);

  if (!title || !body) {
    showError("Title and body are required.");
    return;
  }
  updatePostData(postId, post);
}

async function updatePostData(postId, post) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    showSuccessMessage("Post updated successfully!");
  } catch (error) {
    console.error("Error updating post:", error);
    showErrorMessage("Error updating post. Please try again.");
  }
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

document.getElementById("back-to-home").addEventListener("click", () => {
  window.location.href = "./index.html";
});
