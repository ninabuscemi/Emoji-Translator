function translateText() {
  const inputText = document.getElementById('inputText').value;
  const outputTextElement = document.getElementById('outputText');



    // Make a request to the emoji translation API
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
        console.log('Emoji Translation API Response:', data);

        // Assuming the translated emojis are provided as plain text
        if (data.contents && data.contents.translated) {
          // Decode HTML entities (if any) before rendering
          const decodedText = new DOMParser().parseFromString(data.contents.translated, 'text/html').body.textContent;
          outputTextElement.innerHTML = decodedText; // Use innerHTML to render emojis
        }
      })
      .catch(error => {
        console.error('Error fetching emoji translation:', error);
        outputTextElement.textContent = 'Emoji translation failed. Please try again.';
      });
  }


// Attach the translateText function to the button click event
document.getElementById('translateButton').addEventListener('click', translateText);
