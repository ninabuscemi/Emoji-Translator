function translateText() {
    const inputText = document.getElementById('inputText').value;
    const outputTextElement = document.getElementById('outputText');
  
    // Make a request to the translation API
    fetch(`https://api.funtranslations.com/translate/emoji.json?text=${encodeURIComponent(inputText)}`)
      .then(response => response.json())
      .then(data => {
        if (data.contents && data.contents.translated) {
          outputTextElement.textContent = data.contents.translated;
        } else {
          outputTextElement.textContent = 'Translation failed. Please try again.';
        }
      })
      .catch(error => {
        console.error('Error fetching translation:', error);
        outputTextElement.textContent = 'Translation failed. Please try again.';
      });
  }
  