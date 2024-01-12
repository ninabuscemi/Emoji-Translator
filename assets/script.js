function translateText() {
  const inputText = document.getElementById('inputText').value;
  const outputTextElement = document.getElementById('outputText');

  // Check if the input text is empty
  if (inputText.trim() === '') {
    // Make a request to the quote API
    fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then(quoteData => {
        console.log('Quote API Response:', quoteData);

        // Check if there are quotes in the response
        if (quoteData.length > 0) {
          // Select a random quote from the array
          const randomIndex = Math.floor(Math.random() * quoteData.length);
          const randomQuote = quoteData[randomIndex];

          // Assuming the quote text is provided in randomQuote.text
          if (randomQuote.text) {
            outputTextElement.innerHTML = randomQuote.text; // Use innerHTML to render emojis
          } else {
            outputTextElement.textContent = 'Quote retrieval failed. Please try again.';
          }
        } else {
          outputTextElement.textContent = 'No quotes available. Please try again later.';
        }
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        outputTextElement.textContent = 'Quote retrieval failed. Please try again.';
      });
  } else {
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
          outputTextElement.innerHTML = data.contents.translated; // Use innerHTML to render emojis
        } else {
          outputTextElement.textContent = 'Emoji translation failed. Please try again.';
        }
      })
      .catch(error => {
        console.error('Error fetching emoji translation:', error);
        outputTextElement.textContent = 'Emoji translation failed. Please try again.';
      });
  }
}

// Attach the translateText function to the button click event
document.getElementById('translateButton').addEventListener('click', translateText);
