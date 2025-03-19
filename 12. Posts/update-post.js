const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
console.log(params, postId);

// TODO
// Make API request to fetch the post with the given ID (Get request)
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

// Prefill the form in update-post.html with the post title and body
function prefillForm(postData) {
  document.getElementById("title").value = postData.title;
  document.getElementById("body").value = postData.body;
}

fetchPostData(postId);

// When a user submits the form, validate the form data
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

  // If form data is not valid, show error messages
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

    // Display success message
    showSuccessMessage("Post updated successfully!");
  } catch (error) {
    console.error("Error updating post:", error);
    // Handle error (e.g., display error message)
    showErrorMessage("Error updating post. Please try again.");
  }
}

// Show a success message (do NOT use alert!) on the screen after successful response is received in the API request
function showSuccessMessage(message) {
  const successMessageElement = document.getElementById("success-message");
  successMessageElement.textContent = message;
  successMessageElement.style.display = "block"; // Show the message

  // Optional: Hide the message after a few seconds
  setTimeout(() => {
    successMessageElement.style.display = "none";
  }, 3000); // Hide after 3 seconds
}

// Show an error message on the screen
function showErrorMessage(message) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = message;
  errorMessageElement.style.display = "block"; // Show the message

  // Optional: Hide the message after a few seconds
  setTimeout(() => {
    errorMessageElement.style.display = "none";
  }, 3000); // Hide after 3 seconds
}

// Add a button to navigate back to the home page (index.html)
document.getElementById("back-to-home").addEventListener("click", () => {
  window.location.href = "./index.html";
});
