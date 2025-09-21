document.addEventListener('DOMContentLoaded', function() {
    const appList = document.getElementById('appList');
    const appCards = Array.from(document.querySelectorAll('.window'));
    let activeCard = null;
    let isAnimating = false;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isScrolling = false;
    let scrollPosition = 0;

    // カードの初期化
    function initCards() {
        // 各カードにイベントリスナーを設定
        appCards.forEach((card, index) => {
            // タッチ開始時の処理
            card.addEventListener('touchstart', handleTouchStart, { passive: true });
            // タッチ移動時の処理
            card.addEventListener('touchmove', handleTouchMove, { passive: true });
            // クリック/タップ時の処理
            card.addEventListener('click', handleCardClick, { passive: false });
            
            // 閉じるボタンの設定
            const closeBtn = card.querySelector('#close-btn-color');
            if (closeBtn) {
                closeBtn.addEventListener('click', handleCloseButtonClick);
            }
        });

        // ドキュメント全体のクリックイベント（カードの外側をクリックしたときの処理）
        document.addEventListener('click', handleDocumentClick, true);
        
        // スクロールイベントの設定
        appList.addEventListener('scroll', handleScroll, { passive: true });
        
        // 初期状態で最初のカードをアクティブに
        if (appCards.length > 0) {
            setTimeout(() => activateCard(appCards[0]), 300);
        }
    }

    // タッチ開始時の処理
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isScrolling = false;
    }

    // タッチ移動時の処理
    function handleTouchMove(e) {
        if (!activeCard) return;
        
        const y = e.touches[0].clientY;
        const dy = Math.abs(y - touchStartY);
        
        // 縦スクロールの検出
        if (dy > 5) {
            isScrolling = true;
        }
    }

    // カードクリック時の処理
    function handleCardClick(e) {
        // ボタンや入力フィールドのクリックは無視
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('button, input, textarea')) {
            return;
        }

        // スクロール中はクリックを無視
        if (isScrolling) {
            isScrolling = false;
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        const card = e.currentTarget;
        
        // タッチ時間が長い場合は無視（ロングプレス対策）
        if (Date.now() - touchStartTime > 300) {
            return;
        }

        // すでにアクティブなカードをクリックしたら非アクティブに
        if (card === activeCard) {
            deactivateCard(card);
        } else {
            activateCard(card);
        }
    }

    // 閉じるボタンのクリック処理
    function handleCloseButtonClick(e) {
        e.stopPropagation();
        const card = this.closest('.window');
        if (card === activeCard) {
            deactivateCard(card);
        }
    }

    // ドキュメント全体のクリック処理
    function handleDocumentClick(e) {
        // アクティブなカード以外をクリックしたら非アクティブに
        if (activeCard && !activeCard.contains(e.target)) {
            deactivateCard(activeCard);
        }
    }

    // スクロール処理
    function handleScroll() {
        if (activeCard) return;
        
        // スクロール位置に応じてカードの状態を更新
        updateCardStates();
    }

    // カードをアクティブにする
    function activateCard(card) {
        if (isAnimating || !card) return;
        
        isAnimating = true;
        activeCard = card;
        
        // スクロール位置を保存
        scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        // カードの位置を計算してスクロール位置を調整
        const rect = card.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const cardTop = rect.top + scrollTop;
        
        // カードをアクティブに
        card.id = 'layer_top';
        card.style.position = 'fixed';
        card.style.top = '50%';
        card.style.left = '50%';
        card.style.transform = 'translate(-50%, -50%) scale(1)';
        card.style.zIndex = '1000';
        card.style.maxHeight = '85vh';
        card.style.overflowY = 'auto';
        
        // 他のカードを更新
        updateCardStates(true);
        
        // ボディのスクロールを無効化
        document.body.style.overflow = 'hidden';
        
        // アニメーション完了後に状態を更新
        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }

    // カードを非アクティブにする
    function deactivateCard(card) {
        if (isAnimating || !activeCard) return;
        isAnimating = true;
        
        // カードのIDをリセット
        card.removeAttribute('id');
        
        // カードのスタイルをリセット
        card.style.position = '';
        card.style.top = '';
        card.style.left = '';
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.maxHeight = '';
        card.style.overflowY = '';
        
        // すべてのカードの状態を更新
        updateCardStates(false);
        
        // ボディのスクロールを有効化
        document.body.style.overflow = '';
        
        // スクロール位置を復元
        window.scrollTo(0, scrollPosition);
        
        // アニメーション完了後に状態を更新
        setTimeout(() => {
            activeCard = null;
            isAnimating = false;
            
            // スクロール位置を再調整
            updateCardStates();
        }, 300);
    }

    // カードの状態を更新
    function updateCardStates(isActivating = false) {
        if (!activeCard && !isActivating) {
            // アクティブなカードがない場合、すべてのカードを表示
            appCards.forEach(card => {
                card.classList.remove('layer_other');
                card.style.opacity = '1';
                card.style.transform = '';
                card.style.pointerEvents = 'auto';
                card.style.visibility = 'visible';
                card.style.height = '';
                card.style.margin = '15px auto';
                card.style.padding = '';
            });
            return;
        }
        
        let foundActive = false;
        const scrollTop = appList.scrollTop;
        const viewportHeight = window.innerHeight;
        
        appCards.forEach((card, index) => {
            if (card === activeCard) {
                // アクティブなカード
                foundActive = true;
                card.classList.remove('layer_other');
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
            } else if (foundActive) {
                // アクティブなカードより下のカード（非表示）
                card.classList.remove('layer_other');
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
                card.style.visibility = 'hidden';
                card.style.height = '0';
                card.style.margin = '0 auto';
                card.style.padding = '0';
            } else {
                // アクティブなカードより上のカード（縮小表示）
                card.classList.add('layer_other');
                card.style.opacity = '0.7';
                card.style.pointerEvents = 'none';
                card.style.visibility = 'visible';
                card.style.height = '';
                card.style.margin = '10px auto';
                card.style.padding = '';
                
                // スクロール位置に応じてさらに縮小
                const rect = card.getBoundingClientRect();
                const distanceFromTop = rect.top + scrollTop;
                const distanceFromViewportTop = scrollTop + viewportHeight - distanceFromTop;
                
                if (distanceFromViewportTop < 0) {
                    // ビューポートより上にある場合、さらに縮小
                    const scale = Math.max(0.8, 0.9 + (distanceFromViewportTop / 1000));
                    card.style.transform = `scale(${scale})`;
                    card.style.opacity = `${0.5 + (scale - 0.8) * 2}`;
                } else {
                    card.style.transform = 'scale(0.9)';
                }
            }
        });
    }
    
    // 初期化を実行
    initCards();
});