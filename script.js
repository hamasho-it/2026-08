// script.js - ともだちのたね 共通JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // 1. 画面右上の設定（歯車）アイコン押下時のイベント
  const settingsBtns = document.querySelectorAll(".settings-btn");
  settingsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("設定機能（確認したいこと：仕様未確定）");
    });
  });

  // 2. 友達追加画面の「＋」ボタン動作
  const addBtns = document.querySelectorAll(".add-btn");
  addBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("added");
      if (btn.classList.contains("added")) {
        btn.textContent = "✓";
        alert("友達リクエストを送信しました");
      } else {
        btn.textContent = "＋";
      }
    });
  });

  // 3. 友達プロフィール画面の「いいね（ハート）」トグル動作
  const heartBtn = document.getElementById("heart-toggle");
  if (heartBtn) {
    const heartImg = heartBtn.querySelector("img");
    let isLiked = false;
    heartBtn.addEventListener("click", () => {
      isLiked = !isLiked;
      if (isLiked) {
        heartImg.src = "./images/icon_heart_filled.png";
        heartImg.alt = "いいね済み";
      } else {
        heartImg.src = "./images/icon_heart_outline.png";
        heartImg.alt = "いいね";
      }
    });
  }

  // 4. 友達プロフィール観覧画面のカードめくり演出（A ↔ B）
  const friendCards = document.querySelectorAll(".friend-card-content");
  const prevBtn = document.getElementById("prev-friend");
  const nextBtn = document.getElementById("next-friend");
  const friendNameHeader = document.getElementById("friend-name-header");

  if (friendCards.length > 0) {
    let currentIndex = 0;

    const switchCard = (newIndex) => {
      const currentCard = friendCards[currentIndex];
      const nextCard = friendCards[newIndex];

      currentCard.classList.add("fade-out");
      setTimeout(() => {
        currentCard.style.display = "none";
        currentCard.classList.remove("fade-out");

        nextCard.style.display = "block";
        nextCard.classList.add("fade-in");
        
        if (friendNameHeader) {
          friendNameHeader.textContent = nextCard.dataset.name || `友達 ${newIndex + 1}`;
        }
        
        currentIndex = newIndex;
        setTimeout(() => {
          nextCard.classList.remove("fade-in");
        }, 350);
      }, 200);
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        const nextIdx = (currentIndex - 1 + friendCards.length) % friendCards.length;
        switchCard(nextIdx);
      });

      nextBtn.addEventListener("click", () => {
        const nextIdx = (currentIndex + 1) % friendCards.length;
        switchCard(nextIdx);
      });
    }

    // 初期化表示
    friendCards.forEach((card, idx) => {
      if (idx === 0) {
        card.style.display = "block";
        if (friendNameHeader) friendNameHeader.textContent = card.dataset.name;
      } else {
        card.style.display = "none";
      }
    });
  }
});
