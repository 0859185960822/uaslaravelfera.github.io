/**
* Template Name: MyPortfolio
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * burgerMenu
   */
  const burgerMenu = select('.burger')
  on('click', '.burger', function(e) {
    burgerMenu.classList.toggle('active');
  })

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('#portfolio-grid');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
      });

      let portfolioFilters = select('#filters a', true);

      on('click', '#filters a', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // blog mulai sini
document.addEventListener('DOMContentLoaded', function() {
  const postsDiv = document.getElementById('posts');
  const newPostForm = document.getElementById('newPostForm');
  const searchInput = document.getElementById('searchInput');

  // Ambil postingan dari localStorage
  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  // Fungsi untuk menyimpan postingan ke localStorage
  function savePosts() {
      localStorage.setItem('posts', JSON.stringify(posts));
  }

  // Fungsi untuk menampilkan postingan
  function displayPosts(filteredPosts = posts) {
      postsDiv.innerHTML = ''; // Kosongkan konten sebelumnya

      // Loop melalui setiap postingan dan tampilkan di halaman
      filteredPosts.forEach((post, index) => {
          const article = document.createElement('article');

          const titleElement = document.createElement('h3');
          titleElement.textContent = post.title;

          const contentElement = document.createElement('p');
          contentElement.textContent = post.content;

          const dateElement = document.createElement('time');
          dateElement.dateTime = post.date; // Format ISO 8601
          dateElement.textContent = new Date(post.date).toLocaleDateString('id-ID');

          // Tambahkan tombol update dan delete
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', () => updatePost(index));

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deletePost(index));

          // Tambahkan elemen ke dalam article
          article.appendChild(titleElement);
          article.appendChild(contentElement);
          article.appendChild(dateElement);
          article.appendChild(updateButton);
          article.appendChild(deleteButton);

          postsDiv.appendChild(article);
      });
  }

  // Fungsi untuk menambah postingan baru
  newPostForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;

      // Dapatkan tanggal saat ini
      const date = new Date().toISOString();

      // Tambahkan postingan ke array
      posts.push({ title, content, date });

      // Simpan postingan ke localStorage
      savePosts();

      // Tampilkan postingan baru
      displayPosts();

      // Reset form
      newPostForm.reset();
  });

  // Fungsi untuk memperbarui postingan
  function updatePost(index) {
      const newTitle = prompt('Masukkan judul baru:', posts[index].title);
      const newContent = prompt('Masukkan konten baru:', posts[index].content);

      if (newTitle !== null && newContent !== null) {
          posts[index].title = newTitle;
          posts[index].content = newContent;
          posts[index].date = new Date().toISOString(); // Perbarui tanggal

          // Simpan postingan ke localStorage
          savePosts();

          // Perbarui tampilan
          displayPosts();
      }
  }

  // Fungsi untuk menghapus postingan
  function deletePost(index) {
      posts.splice(index, 1); // Hapus postingan dari array

      // Simpan postingan ke localStorage
      savePosts();

      // Perbarui tampilan
      displayPosts();
  }

  // Fungsi untuk mencari postingan
  searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();

      // Filter postingan berdasarkan judul atau konten
      const filteredPosts = posts.filter(post => {
          return post.title.toLowerCase().includes(searchTerm) ||
                 post.content.toLowerCase().includes(searchTerm);
      });

      // Tampilkan postingan yang sesuai
      displayPosts(filteredPosts);
  });

  // Inisialisasi tampilan
  displayPosts();
});

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()