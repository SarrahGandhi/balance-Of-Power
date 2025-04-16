    let selectedOrder = [];

document.querySelectorAll('.chapter').forEach((chapter) => {
  chapter.addEventListener('click', () => {
    const id = chapter.dataset.id;

    // If already selected and is the last selected, unselect it
    if (selectedOrder.includes(id)) {
      if (selectedOrder[selectedOrder.length - 1] === id) {
        selectedOrder.pop(); // remove last
        chapter.classList.remove('selected');

        const label = chapter.querySelector('.order-label');
        if (label) chapter.removeChild(label);
        return;
      } else {
        // Prevent unselecting if not the last one clicked
        alert("You can only unselect the last selected chapter.");
        return;
      }
    }

    // Otherwise, select it
    selectedOrder.push(id);
    chapter.classList.add('selected');

    const orderLabel = document.createElement('span');
    orderLabel.className = 'order-label';
    orderLabel.textContent = selectedOrder.length;
    chapter.appendChild(orderLabel);
  });
});

document.getElementById("submitOrder").addEventListener("click", () => {
  const correctOrder = ["1", "3", "2"];

  if (selectedOrder.length !== correctOrder.length) {
    alert("Please select all chapters in order before submitting.");
    return;
  }

  // Compare each item one by one for full control
  let isCorrect = true;
  for (let i = 0; i < correctOrder.length; i++) {
    if (selectedOrder[i] !== correctOrder[i]) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect) {
    //document.getElementById("successPopup").style.display = "flex";
    window.location.href = "congratulations.html";
  } else {
    document.getElementById("wrongOrderPopup").style.display = "flex";
  }
});

document.getElementById("closeWrongOrderPopup").addEventListener("click", () => {
  document.getElementById("wrongOrderPopup").style.display = "none";

  // Reset selection
  selectedOrder = [];
  document.querySelectorAll('.chapter').forEach((chapter) => {
    chapter.classList.remove('selected');
    const label = chapter.querySelector('.order-label');
    if (label) chapter.removeChild(label);
  });
});



document.getElementById("closesuccessOrderPopup").addEventListener("click", () => {
  document.getElementById("successPopup").style.display = "none";

  // Reset selection
  selectedOrder = [];
  document.querySelectorAll('.chapter').forEach((chapter) => {
    chapter.classList.remove('selected');
    const label = chapter.querySelector('.order-label');
    if (label) chapter.removeChild(label);
  });
});
