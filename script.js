// 1. Select the required HTML elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

// 2. Store notes in an array
let notes = [];

// 3. Display the notes on the page
function render() {
  // Clear the previous list before rebuilding it
  notesList.textContent = "";

  // Create a card for each note
  for (const note of notes) {
    const noteCard = document.createElement("li");
    noteCard.classList.add("note-card", `category-${note.category}`);

    // Add the note text
    const noteText = document.createElement("p");
    noteText.classList.add("note-text");
    noteText.textContent = note.text;

    noteCard.appendChild(noteText);

    // Create a container for the category and date
    const noteMeta = document.createElement("div");
    noteMeta.classList.add("note-meta");

    // Add the category label
    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add(
      "category-label",
      `category-${note.category}`
    );

    categoryLabel.textContent =
      note.category.charAt(0).toUpperCase() + note.category.slice(1);

    noteMeta.appendChild(categoryLabel);

    // Add the creation date and time
    const noteDate = document.createElement("small");
    noteDate.classList.add("note-date");
    noteDate.textContent = `Created: ${note.createdAt}`;

    noteMeta.appendChild(noteDate);
    noteCard.appendChild(noteMeta);

    // Add a Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.noteId = note.id;

    noteCard.appendChild(deleteButton);

    // Add the completed card to the list
    notesList.appendChild(noteCard);
  }

  // Update the note count
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// 4. Handle form submission
noteForm.addEventListener("submit", (event) => {
  // Stop the form from reloading the page
  event.preventDefault();

  // Read the input and selected category
  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Create a new note object
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  // Add the note to the array
  notes.push(newNote);

  // Rebuild the visible list
  render();

  // Clear the input for the next note
  noteInput.value = "";
  noteInput.focus();
});

// Display the initial state
render();