// Main Application Module
class LinkHub {
  constructor() {
    this.currentUser = null;
    this.posts = [];
    this.friends = [];
    this.init();
  }

  async init() {
    await this.loadCurrentUser();
    await this.loadPosts();
    this.setupEventListeners();
    this.renderNavigation();
  }

  async loadCurrentUser() {
    try {
      const response = await fetch('/api/current-user');
      this.currentUser = await response.json();
      this.renderUserProfile();
    } catch (error) {
      console.error('Failed to load user:', error);
      this.showError('Failed to load profile data');
    }
  }

  async loadPosts() {
    try {
      const response = await fetch('/api/posts');
      this.posts = await response.json();
      this.renderPosts();
    } catch (error) {
      console.error('Failed to load posts:', error);
      this.showError('Failed to load posts');
    }
  }

  renderUserProfile() {
    if (!this.currentUser) return;
    
    const profileElements = document.querySelectorAll('.user-profile');
    profileElements.forEach(el => {
      if (el.classList.contains('avatar')) {
        el.src = this.currentUser.avatar;
        el.alt = `${this.currentUser.name}'s profile picture`;
      } else if (el.classList.contains('name')) {
        el.textContent = this.currentUser.name;
      }
    });
  }

  renderPosts() {
    const feed = document.getElementById('post-feed');
    if (!feed) return;

    feed.innerHTML = this.posts.map(post => `
      <div class="post-card">
        <div class="post-header">
          <img src="${this.currentUser.avatar}" class="post-avatar">
          <div>
            <h3>${this.currentUser.name}</h3>
            <small>${new Date(post.timestamp).toLocaleString()}</small>
          </div>
        </div>
        <p>${post.content}</p>
        <div class="post-actions">
          <button class="like-btn">Like (${post.likes})</button>
          <button class="comment-btn">Comment</button>
        </div>
      </div>
    `).join('');
  }

  setupEventListeners() {
    // Post creation form
    const postForm = document.getElementById('post-form');
    if (postForm) {
      postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = e.target.content.value.trim();
        if (!content) return;

        try {
          const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
          });
          
          if (response.ok) {
            await this.loadPosts();
            e.target.reset();
          }
        } catch (error) {
          console.error('Failed to create post:', error);
          this.showError('Failed to create post');
        }
      });
    }
  }

  showError(message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    document.body.prepend(errorEl);
    setTimeout(() => errorEl.remove(), 5000);
  }

  renderNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = link.href;
      });
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.linkhub = new LinkHub();
});