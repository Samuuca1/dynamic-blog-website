const posts = JSON.parse(localStorage.getItem('blogpost')) || [];

    const container = document.getElementById('blogpost');
    if (posts.length === 0) {
      container.innerHTML = "<p>No blog posts found.</p>";
    } else {
      posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = "post";
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p class="date">${post.date}</p>
          <p>${post.content.substring(0, 100)}...</p>
        `;
        container.appendChild(postElement);
      });
    }