const URL = "https://jsonplaceholder.typicode.com/posts";

document.getElementById("fetch-posts").addEventListener("click", getPosts);

function getPosts() {
  console.log("Getting posts");
  fetch(URL)
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = "";

      posts.forEach((post) => {
        const liItem = document.createElement("li");
        liItem.classList.add("post");
        liItem.id = `post-${post.id}`;

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

function getPostById(postId) {
  fetch(`${URL}/${postId}`)
    .then((response) => response.json())
    .then((post) => {
      console.log(post);
      const postContainer = document.getElementById("post-container");
      postContainer.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
    });
}

document.getElementById("create-post-btn").addEventListener("click", () => {
  window.location.href = "./create-post.html";
});

function updatePost(postId, updateData) {
  fetch(`${URL}/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  }).then(() => {
    getPosts();
  });
}

function deletePost(postId) {
  fetch(`${URL}/${postId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      return response.json();
    })
    .then(() => {
      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) {
        postElement.remove();
      }
      const successMessage = document.getElementById("success-message");
      successMessage.textContent = "Post deleted successfully!";
      successMessage.style.color = "green";
      successMessage.style.display = "block";

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
}
