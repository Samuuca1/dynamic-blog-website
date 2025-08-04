document.addEventListener("DOMContentLoaded", () => {
  let postsContainer = document.getElementById("posts-container");
  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  if (posts.length === 0) {
    postsContainer.innerHTML = "<p>No blog posts yet.</p>";
    return;
  }

  posts.reverse().forEach(post => {
    let postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" alt="Post image">` : ""}
    `;

    postsContainer.appendChild(postDiv);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");

  if (postForm) {
    postForm.addEventListener("submit", e => {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const content = document.getElementById("content").value.trim();
      const image = document.getElementById("image").value.trim();

      if (!title || !content) {
        alert("Title and content are required.");
        return;
      }

      const newPost = {
        title,
        content,
        image: image || null,
        timestamp: new Date().toISOString()
      };

      const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
      existingPosts.push(newPost);
      localStorage.setItem("blogPosts", JSON.stringify(existingPosts));

      alert("Post published!");
      window.location.href = "index.html";
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const editForm = document.getElementById("editForm");

 if (editForm) {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const post = posts.find(p => p.id === postId);

    if (!post) {
      editForm.innerHTML = "<p>Post not found.</p>";
      return;
    }

    document.getElementById("edit-title").value = post.title;
    document.getElementById("edit-content").value = post.content;
    document.getElementById("edit-image").value = post.image || "";

    editForm.addEventListener("submit", e => {
      e.preventDefault();

      post.title = document.getElementById("edit-title").value.trim();
      post.content = document.getElementById("edit-content").value.trim();
      post.image = document.getElementById("edit-image").value.trim();

      localStorage.setItem("blogPosts", JSON.stringify(posts));
      alert("Post updated!");
      window.location.href = "index.html";
    });
  }
});

function deletePost(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem("blogPosts", JSON.stringify(filtered));
    window.location.reload();
  }
}

function editPost(id) {
  window.location.href = `edit.html?id=${id}`;
}