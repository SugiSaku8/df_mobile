document.addEventListener('DOMContentLoaded', function() {
    const appList = document.getElementById('appList');
    const appCards = document.querySelectorAll('.window');
    let activeCard = null;
    let isAnimating = false;
    let touchStartY = 0;
    let isScrolling = false;

    // Set up card click handlers
    appCards.forEach((card, index) => {
        // Touch start handler
        card.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });

        // Touch move handler to detect scrolling
        card.addEventListener('touchmove', function(e) {
            const y = e.touches[0].clientY;
            const dy = Math.abs(y - touchStartY);
            if (dy > 5) {
                isScrolling = true;
            }
        }, { passive: true });

        // Click/tap handler
        card.addEventListener('click', function(e) {
            if (isScrolling || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            if (activeCard === this) {
                deactivateCard(this);
            } else if (!activeCard) {
                activateCard(this);
            }
        }, { passive: false });
    });

    // Back button handlers
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.window');
            deactivateCard(card);
        });
    });

    // Close card when clicking outside
    document.addEventListener('click', function(e) {
        if (activeCard && !activeCard.contains(e.target)) {
            deactivateCard(activeCard);
        }
    }, true);

    function activateCard(card) {
        if (isAnimating) return;
        isAnimating = true;
        activeCard = card;
        
        // Add active class and show back button
        card.classList.add('active');
        card.querySelector('.close-button').classList.remove('hidden');
        
        // Update other cards
        updateCardLayers(card);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Re-enable interaction after animation
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function deactivateCard(card) {
        if (isAnimating || !activeCard) return;
        isAnimating = true;
        
        // Hide back button
        card.querySelector('.close-button').classList.add('hidden');
        
        // Remove active class
        card.classList.remove('active');
        
        // Reset all cards
        appCards.forEach(c => {
            c.classList.remove('layer_other', 'layer_below');
            c.style.transform = '';
            c.style.opacity = '';
        });
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        
        // Reset active card after animation
        setTimeout(() => {
            activeCard = null;
            isAnimating = false;
        }, 500);
    }

    function updateCardLayers(activeCard) {
        const activeIndex = Array.from(appCards).indexOf(activeCard);
        
        appCards.forEach((card, index) => {
            if (card === activeCard) return;
            
            if (index < activeIndex) {
                // Cards above the active one
                card.classList.add('layer_other');
                card.classList.remove('layer_below');
            } else {
                // Cards below the active one
                card.classList.add('layer_below');
                card.classList.remove('layer_other');
            }
        });
    }
});