let selectedChapter = null;
    let selectedStories = [];
    const correctAnswers = {
      1: [1, 2, 3],
      2: [4, 5, 6],
      3: [7, 8, 9]
    };

    function selectChapter(chapter) {
        if (chapter === 3) {
            const chap1Complete = getCookie("chapter1_completed") === "true";
            const chap2Complete = getCookie("chapter2_completed") === "true";

            if (!chap1Complete || !chap2Complete) {
            document.getElementById("chapterLockPopup").style.display = "flex";
            return;
            }
        }

        document.querySelectorAll('.chapter').forEach(c => c.classList.remove('selected'));
        selectedChapter = chapter;
        document.querySelector(`.chapters div:nth-child(${chapter})`).classList.add('selected');
        selectedStories = [];
        updateStorySelection();
    }
    document.getElementById("closeLockPopup").addEventListener("click", () => {
        document.getElementById("chapterLockPopup").style.display = "none";
    });
    document.getElementById("closeSolvedPopup").addEventListener("click", () => {
      const audio = document.getElementById("chapterSolvedAudio");
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      document.getElementById("chapterSolvedPopup").style.display = "none";
    });
    

    document.getElementById("closeBothSolvedPopup").addEventListener("click", () => {
      const audio = document.getElementById("bothChaptersAudio");
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      document.getElementById("bothChaptersSolvedPopup").style.display = "none";
    });

    document.getElementById("closeChapter3Popup").addEventListener("click", () => {
      const audio = document.getElementById("chapter3Audio");
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      document.getElementById("chapter3SolvedPopup").style.display = "none";
    });
    
    
    function selectStory(story) {
      if (selectedStories.includes(story)) {
        selectedStories = selectedStories.filter(s => s !== story);
      } else if (selectedStories.length < 3) {
        selectedStories.push(story);
      }
      updateStorySelection();
      document.getElementById('submitBtn').classList.remove('hidden');
    }

    function updateStorySelection() {
      const cards = document.querySelectorAll('.grid div');
      cards.forEach((card, index) => {
        card.classList.remove('selected');
        if (selectedStories.includes(index + 1)) {
          card.classList.add('selected');
        }
      });
    }

    function verifySelection() {
        if (selectedChapter && JSON.stringify(selectedStories) === JSON.stringify(correctAnswers[selectedChapter])) {
            document.getElementById("errorMessage").classList.add("hidden");

            // Track order of completion
            let currentOrder = getCookie("chapter_order");
            if (!currentOrder) {
              setCookie("chapter_order", selectedChapter.toString(), 7);
            } else if (!currentOrder.includes(selectedChapter.toString())) {
              currentOrder += `,${selectedChapter}`;
              setCookie("chapter_order", currentOrder, 7);
            }
            setCookie(`chapter${selectedChapter}_completed`, true, 7);
            document.getElementById(`tick-${selectedChapter}`).style.display = "inline-block";

            const chap1Done = getCookie("chapter1_completed") === "true";
            const chap2Done = getCookie("chapter2_completed") === "true";

            if (chap1Done && chap2Done && selectedChapter !== 3) {
              const lock = document.getElementById("lock-3");
              if (lock) lock.style.display = "none";
              document.querySelectorAll('.chapter')[2].classList.remove("locked");
            
              
              const bothAudio = document.getElementById("bothChaptersAudio");
              const bothSource = document.getElementById("bothChaptersSource");
              if (bothAudio && bothSource) {
                bothSource.src = `audio/act${selectedChapter}.mp3`;
                bothAudio.load();
                bothAudio.play();
              }
            
              document.getElementById("bothChaptersSolvedPopup").style.display = "flex";
              setCookie("both_chapters_popup_shown", true, 7);
            }
            
              
              
            if (selectedChapter === 3) {
              const popup = document.getElementById("chapter3SolvedPopup");
              const audio = document.getElementById("chapter3Audio");
              const cluesSection = document.querySelector(".clues");
              const solveBtn = document.getElementById("solveFinalBtn");
            
              if (popup && audio) {
                popup.style.display = "flex";
                audio.currentTime = 0;
                audio.play();
              }
            
              if (cluesSection) {
                cluesSection.style.display = "none";
                console.log("Hiding clues section");
              }
            
              if (solveBtn) {
                solveBtn.classList.remove("hidden");
                solveBtn.style.setProperty("display", "block", "important");
              }
            }
            
             else if (!(chap1Done && chap2Done)) {
                const title = document.getElementById("chapterCompleteTitle");
                if (title) {
                  title.textContent = `ACT ${selectedChapter} - Complete`;
                }
              
                const audio = document.getElementById("chapterSolvedAudio");
                const source = document.getElementById("chapterSolvedSource");
                if (audio && source) {
                  source.src = `audio/act${selectedChapter}.mp3`;
                  audio.load();
                  audio.play();
                }
              
                document.getElementById("chapterSolvedPopup").style.display = "flex";
              }
              
              
        } else {
            document.getElementById("errorMessage").classList.remove("hidden");
        }
    }



    const instructionsBtn = document.querySelector('a[href="#instructions"]');
  const popup = document.getElementById("instructionsPopup");
  const closeBtn = document.getElementById("closeInstructions");

  if (instructionsBtn) {
    instructionsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      popup.style.display = "flex";
    });
  }

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
  function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
  let ca = document.cookie.split(';');
  for(let c of ca) {
    let [k, v] = c.trim().split('=');
    if (k === name) return v;
  }
  return "";
}
function unlockChapter3IfReady() {
  const chap1Done = getCookie("chapter1_completed") === "true";
  const chap2Done = getCookie("chapter2_completed") === "true";

  if (chap1Done && chap2Done) {
    document.querySelectorAll('.chapter')[2].classList.remove("locked");
    const lock = document.getElementById("lock-3");
    if (lock) lock.style.display = "none";
  }
}
function showChapterSolvedPopup(chapterNumber) {
  if (chapterNumber === 3) {
    const popup = document.getElementById("chapter3SolvedPopup");
    const audio = document.getElementById("chapter3Audio");
    if (popup && audio) {
      popup.style.display = "flex";
      audio.currentTime = 0;
      audio.play();
    }
    return; // ✅ Prevent any further execution
  }
  const chap1Done = getCookie("chapter1_completed") === "true";
  const chap2Done = getCookie("chapter2_completed") === "true";

  const order = getCookie("chapter_order")?.split(",") || [];
  const orderIndex = order.indexOf(String(chapterNumber));
  const isSecond = (chap1Done && chap2Done && orderIndex === 1);

  if (isSecond) {

    const bothAudio = document.getElementById("bothChaptersAudio");
    const bothSource = document.getElementById("bothChaptersSource");
    if (bothAudio && bothSource) {
      bothSource.src = `audio/act${chapterNumber}.mp3`;
      bothAudio.load();
      bothAudio.play();
    }

    document.getElementById("bothChaptersSolvedPopup").style.display = "flex";
  } else {

    const title = document.getElementById("chapterCompleteTitle");
    if (title) {
      title.textContent = `ACT ${chapterNumber} - Complete`;
    }

    const audio = document.getElementById("chapterSolvedAudio");
    const source = document.getElementById("chapterSolvedSource");
    if (audio && source) {
      source.src = `audio/act${chapterNumber}.mp3`;
      audio.load();
      audio.play();
    }

    document.getElementById("chapterSolvedPopup").style.display = "flex";
  }
}



window.onload = () => {
  let chap1 = false;
  let chap2 = false;

  for (let i = 1; i <= 3; i++) {
    if (getCookie(`chapter${i}_completed`) === "true") {
      const tick = document.getElementById(`tick-${i}`);
      if (tick) tick.style.display = "inline-block";
    }

    if (i === 1) chap1 = getCookie("chapter1_completed") === "true";
    if (i === 2) chap2 = getCookie("chapter2_completed") === "true";
  }


  if (chap1 && chap2) {
    document.querySelectorAll('.chapter')[2].classList.remove("locked");
    const lock = document.getElementById("lock-3");
    if (lock) lock.style.display = "none";
  }
  if (chap1 && chap2) {
    unlockChapter3IfReady();
  } else {

    const lock = document.getElementById("lock-3");
    if (lock) lock.style.display = "inline-block";
  }
};
