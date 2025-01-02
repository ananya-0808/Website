document.addEventListener('DOMContentLoaded', () => {
  const datePicker = document.getElementById('datePicker');
  const note = document.getElementById('note');

  // Load the current date
  const today = new Date().toISOString().split('T')[0];
  datePicker.value = today;

  // Load saved note for the selected date from localStorage
  function loadNoteForDate(date) {
      note.value = localStorage.getItem(`noteContent_${date}`) || '';
      // Enable or disable the textarea based on the date
  }

  // Save note to localStorage
  function saveNoteForDate(date, content) {
      localStorage.setItem(`noteContent_${date}`, content);
  }


  loadNoteForDate(today);


  datePicker.addEventListener('change', (event) => {
      const selectedDate = event.target.value;
      loadNoteForDate(selectedDate);
  });


  note.addEventListener('input', () => {
      const selectedDate = datePicker.value;
      if (selectedDate === today) {
          saveNoteForDate(selectedDate, note.value);
      }
  });
});

const textBoxes = [
    document.getElementById('text-box-1'),
    document.getElementById('text-box-2'),
    document.getElementById('text-box-3')
];

const clearButton = document.getElementById('clear-button');


document.addEventListener('DOMContentLoaded', () => {
    textBoxes.forEach((textBox, index) => {
        const savedText = localStorage.getItem(`textBoxContent${index + 1}`);
        if (savedText) {
            textBox.value = savedText;
        }
    });
});

textBoxes.forEach((textBox, index) => {
    textBox.addEventListener('input', () => {
        localStorage.setItem(`textBoxContent${index + 1}`, textBox.value);
    });
});


clearButton.addEventListener('click', () => {
    textBoxes.forEach((textBox, index) => {
        textBox.value = '';
        localStorage.removeItem(`textBoxContent${index + 1}`);
    });
});


  
  
