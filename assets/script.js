function translateText() {
  const inputText = document.getElementById('inputText').value;
  const outputTextElement = document.getElementById('outputText');

  // Make a request to the translation API
  fetch(`https://api.funtranslations.com/translate/emoji.json?text=${encodeURIComponent(inputText)}`, {
    headers: {
      'X-FunTranslations-Api-Secret': 'PqqgjOlWJmCIWtAqPcn_QgeF',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('API Response:', data);

      // Assuming the translated emojis are provided as plain text
      if (data.contents && data.contents.translated) {
        outputTextElement.innerHTML = data.contents.translated; // Use innerHTML to render emojis
      } else {
        outputTextElement.textContent = 'Translation failed. Please try again.';
      }
    })
    .catch(error => {
      console.error('Error fetching translation:', error);
      outputTextElement.textContent = 'Translation failed. Please try again.';
    });
}

// Attach the translateText function to the button click event
document.getElementById('translateButton').addEventListener('click', translateText);