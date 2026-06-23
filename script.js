const container = document.querySelector(".container");

document.querySelector(".open-navbar-icon").addEventListener("click", () => {
  container.classList.add("change");
});

document.querySelector(".close-navbar-icon").addEventListener("click", () => {
  container.classList.remove("change");
});

const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];

let i = 0;

Array.from(document.querySelectorAll(".nav-link")).forEach(item => {
  item.style.cssText = `background-color: ${colors[i++]}`;
});

Array.from(document.querySelectorAll(".navigation-button")).forEach(item => {
  item.onclick = () => {
    item.parentElement.parentElement.classList.toggle("change");
  };
});

 let reviews = [
            {
                id: 1,
                name: "Sarah Johnson",
                tour: "The island beach",
                rating: 5,
                title: "Absolutely Breathtaking!",
                text: "The island beach tour exceeded all my expectations! The pristine waters, friendly guides, and comfortable accommodations made it unforgettable. Highly recommend for anyone looking for a perfect beach getaway.",
                date: "2024-06-15",
                helpful: 24,
                tags: ["Amazing", "Beach", "Family-Friendly"]
            },
            {
                id: 2,
                name: "Michael Chen",
                tour: "Along the river",
                rating: 5,
                title: "Adventure of a Lifetime",
                text: "The river adventure was incredible! Our guides were knowledgeable and made us feel safe even during challenging parts. The scenic views were some of the best I've ever seen. Worth every penny!",
                date: "2024-06-10",
                helpful: 18,
                tags: ["Adventure", "Scenic", "Expert Guides"]
            },
            {
                id: 3,
                name: "Emma Wilson",
                tour: "The wild forest",
                rating: 4,
                title: "Great Experience with Minor Issues",
                text: "The forest tour was amazing, but the accommodation could have been better. The guides were fantastic and showed us incredible wildlife. The hiking was challenging but rewarding.",
                date: "2024-06-05",
                helpful: 12,
                tags: ["Nature", "Hiking", "Wildlife"]
            },
            {
                id: 4,
                name: "David Martinez",
                tour: "The island beach",
                rating: 5,
                title: "Perfect for Couples",
                text: "We took this tour for our honeymoon and it was perfect! The sunset dinners on the beach, the water sports activities, and the peaceful atmosphere made it truly romantic.",
                date: "2024-05-28",
                helpful: 31,
                tags: ["Romantic", "Couple-Friendly", "Activities"]
            },
            {
                id: 5,
                name: "Lisa Anderson",
                tour: "Along the river",
                rating: 4,
                title: "Good Value for Money",
                text: "Great tour with good organization. The guides knew a lot about the local culture and history. The meals were delicious. I'd come back for another tour!",
                date: "2024-05-20",
                helpful: 15,
                tags: ["Cultural", "Food", "Value"]
            },
            {
                id: 6,
                name: "James Thompson",
                tour: "The wild forest",
                rating: 5,
                title: "Unforgettable Wilderness Experience",
                text: "As an experienced hiker, I was impressed with this tour. The guides' expertise in wilderness survival and nature knowledge was outstanding. The camping experience was comfortable and safe.",
                date: "2024-05-15",
                helpful: 22,
                tags: ["Wilderness", "Camping", "Expert"]
            }
        ];

        let currentPage = 1;
        const reviewsPerPage = 6;
        let filteredReviews = [...reviews];

        // Rating input handler
        const ratingInputs = document.querySelectorAll('.star-input');
        const selectedRatingInput = document.getElementById('selectedRating');

        ratingInputs.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                selectedRatingInput.value = rating;
                ratingInputs.forEach(s => s.classList.remove('active'));
                for (let i = 0; i < rating; i++) {
                    ratingInputs[i].classList.add('active');
                }
            });
        });

        // Form submission
        document.getElementById('reviewForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const rating = parseInt(selectedRatingInput.value);
            if (rating === 0) {
                alert('Please select a rating');
                return;
            }

            const newReview = {
                id: reviews.length + 1,
                name: document.getElementById('reviewerName').value,
                tour: document.getElementById('reviewTour').value,
                rating: rating,
                title: document.getElementById('reviewTitle').value,
                text: document.getElementById('reviewText').value,
                date: new Date().toISOString().split('T')[0],
                helpful: 0,
                tags: ["New", "Verified"]
            };

            reviews.unshift(newReview);
            filteredReviews = [...reviews];
            currentPage = 1;

            this.reset();
            selectedRatingInput.value = 0;
            ratingInputs.forEach(s => s.classList.remove('active'));

            renderReviews();
            alert('Thank you for your review!');
        });

        // Sort handler
        document.getElementById('sortSelect').addEventListener('change', function() {
            const sortValue = this.value;
            filteredReviews = [...reviews];

            if (sortValue === 'highest') {
                filteredReviews.sort((a, b) => b.rating - a.rating);
            } else if (sortValue === 'lowest') {
                filteredReviews.sort((a, b) => a.rating - b.rating);
            } else if (sortValue === 'helpful') {
                filteredReviews.sort((a, b) => b.helpful - a.helpful);
            } else {
                filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            currentPage = 1;
            renderReviews();
        });

        // Filter handler
        document.getElementById('ratingFilter').addEventListener('change', function() {
            const ratingValue = this.value;
            filteredReviews = reviews.filter(review => {
                if (ratingValue === 'all') return true;
                return review.rating >= parseInt(ratingValue);
            });

            currentPage = 1;
            renderReviews();
        });

        function generateStars(rating) {
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                starsHTML += `<span class="star${i <= rating ? '' : ' empty'}">★</span>`;
            }
            return starsHTML;
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            const today = new Date();
            const diffTime = today - date;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Yesterday';
            if (diffDays < 30) return `${diffDays} days ago`;
            if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
            return dateString;
        }

        function renderReviews() {
            const reviewsGrid = document.getElementById('reviewsGrid');
            const pagination = document.getElementById('pagination');

            const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
            const startIdx = (currentPage - 1) * reviewsPerPage;
            const endIdx = startIdx + reviewsPerPage;
            const paginatedReviews = filteredReviews.slice(startIdx, endIdx);

            reviewsGrid.innerHTML = '';

            if (paginatedReviews.length === 0) {
                reviewsGrid.innerHTML = '<div style="text-align: center; padding: 5rem; color: #777;"><p>No reviews found.</p></div>';
            } else {
                paginatedReviews.forEach(review => {
                    const reviewHTML = `
                        <div class="review-card">
                            <div class="review-header">
                                <div class="reviewer-info">
                                    <div class="reviewer-avatar">${review.name.charAt(0).toUpperCase()}</div>
                                    <div class="reviewer-details">
                                        <h3>${review.name}</h3>
                                        <p class="reviewer-tour">${review.tour}</p>
                                    </div>
                                </div>
                                <div class="review-rating">
                                    ${generateStars(review.rating)}
                                </div>
                            </div>
                            <div class="review-date">${formatDate(review.date)}</div>
                            <h4 class="review-title">${review.title}</h4>
                            <p class="review-text">${review.text}</p>
                            <div class="review-tags">
                                ${review.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <div class="review-footer">
                                <button class="helpful-btn">👍 Helpful (${review.helpful})</button>
                                <button class="helpful-btn">👎 Not Helpful</button>
                            </div>
                        </div>
                    `;
                    reviewsGrid.innerHTML += reviewHTML;
                });
            }

            pagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                btn.className = i === currentPage ? 'active' : '';
                btn.addEventListener('click', () => {
                    currentPage = i;
                    renderReviews();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                pagination.appendChild(btn);
            }

            document.getElementById('totalReviews').textContent = reviews.length;
            const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
            document.getElementById('avgRating').textContent = avgRating;
        }

        renderReviews();