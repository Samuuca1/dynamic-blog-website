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