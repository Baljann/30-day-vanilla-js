/*
CRUD - set of basic operations or functions that are commonly used in the context of database management and web applications to manage and manipulate data.
C - create - POST method (has request body to transfer data)
R - read - GET method (cannot have request body to send data to the server)
U - update - PUT / PATCH method (have request body to transfer data)
D - delete - DELETE method


Status codes
HTTP status codes are three-digit numbers that the server sends in response to a client's request made to a web server. They provide information about the outcome of the request, whether it was successful, encountered an error, or requires further action. HTTP status codes are grouped into several ranges, each indicating a different category of response.
100... - Informational Responses
200... - Successful Responses (200 OK, 201 Created, 204 No content)
300.. - redirection (301 Moved Permanently, Found (or 307 Temporary Redirect))
400... - Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
500... - Service error (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable)
*/

const URL = "https://jsonplaceholder.typicode.com/posts";

document.getElementById("fetch-posts").addEventListener("click", getPosts);

function getPosts() {
  console.log("Getting posts");
  fetch(URL)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const liItem = document.createElement("li");
        liItem.classList.add("post");
        const postTitle = document.createElement("h2");
        postTitle.classList.add("post-title");
        postTitle.textContent = post.title;
        const pItem = document.createElement("p");
        pItem.classList.add("post-body");
        pItem.textContent = post.body;

        const postActions = document.createElement("div");
        postActions.classList.add("post-actions");

        const deletePostButton = document.createElement("button");
        deletePostButton.textContent = "Delete";
        deletePostButton.addEventListener("click", () => deletePost(post.id));
        deletePostButton.classList.add("button", "button--danger");

        const updatePostButton = document.createElement("a");
        updatePostButton.href = `./update-post.html?id=${post.id}`;
        updatePostButton.textContent = "Update";
        updatePostButton.classList.add("button", "button--success");

        postActions.appendChild(deletePostButton);
        postActions.appendChild(updatePostButton);

        liItem.appendChild(postTitle);
        liItem.appendChild(pItem);
        liItem.appendChild(postActions);
        document.getElementById("posts-container").appendChild(liItem);
      });
    });
}

function getPostById() {}

function createPost() {
  // Get the form data
  // Validate the form data
  // If form data is not valid, show error messages on the screen (do NOT use alert!)
  // If form data is valid, make an API request to create the post (POST request)
  // Once succesccful response is recieved, show a success message on the screen
  // Clear the form
}

function updatePost() {}

function deletePost(postId) {
  fetch(`${URL}/${postId}`, {
    method: "DELETE",
  });
}
