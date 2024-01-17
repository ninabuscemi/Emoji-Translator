function generateRandomQuote() {
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
          // Translate the quote text to emojis using the emoji translation API
          fetch(`https://api.funtranslations.com/translate/emoji.json?text=${encodeURIComponent(randomQuote.text)}`, {
            headers: {
              'X-FunTranslations-Api-Secret': 'PqqgjOlWJmCIWtAqPcn_QgeF',
            },
          })
            .then(response => response.json())
            .then(data => {
              console.log('Emoji Translation API Response:', data);

              // Assuming the translated emojis are provided as plain text
              if (data.contents && data.contents.translated) {
                // Use innerHTML to render emojis in the output text
                document.getElementById('outputText').innerHTML = data.contents.translated;
              } else {
                // Display an error message if emoji translation fails
                document.getElementById('outputText').textContent = 'Emoji translation failed. Please try again.';
              }
            })
            .catch(error => {
              console.error('Error fetching emoji translation:', error);
              document.getElementById('outputText').textContent = 'Emoji translation failed. Please try again.';
            });
        } else {
          // Display an error message if quote retrieval fails
          document.getElementById('outputText').textContent = 'Quote retrieval failed. Please try again.';
        }
      } else {
        // Display a message if no quotes are available
        document.getElementById('outputText').textContent = 'No quotes available. Please try again later.';
      }
    })
    .catch(error => {
      console.error('Error fetching quote:', error);
      document.getElementById('outputText').textContent = 'Quote retrieval failed. Please try again.';
    });
}


    function translateText() {
      const inputText = document.getElementById('inputText').value;
      const outputTextElement = document.getElementById('outputText');

      // Check if the input text is empty
      if (inputText.trim() === '') {
        // Handle the case where the input is empty (similar to your existing translation logic)
        // ...
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
              // Use innerHTML to render emojis
              document.getElementById('outputText').innerHTML = data.contents.translated;
            } else {
              // Display an error message if emoji translation fails
              document.getElementById('outputText').textContent = 'Emoji translation failed. Please try again.';
            }
          })
          .catch(error => {
            console.error('Error fetching emoji translation:', error);
            document.getElementById('outputText').textContent = 'Emoji translation failed. Please try again.';
          });
      }
    }

        document.addEventListener('DOMContentLoaded', function() {
      const emojiContainer = document.getElementById('falling-emojis-container');
      const emojis = ['😊', '😄', '🎉', '❤️', '🌟', '🚀', '🌈', '🌸', '🐾', '🎈', '🍦'];

      function createEmoji() {
        const emoji = document.createElement('span');
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = '${80 + Math.random() * 20}%'; // Adjust positioning to be more on the right side
        emoji.style.top = '${Math.random() * 100}%';
        emoji.style.animationDelay = '${1 + Math.random()}s'; // Adjust delay for more delay

      }

      function rainEmojis() {
        setInterval(createEmoji, 0); // Adjust the interval to control the frequency of emojis
      }

      rainEmojis();
    });

    // Attach the translateText function to the button click event
    document.getElementById('translateButton').addEventListener('click', translateText);

    function copyOutputText() {
      // Select the output text container
      const outputTextElement = document.getElementById('outputText');
    
      // Create a temporary textarea element to copy the text
      const tempTextArea = document.createElement('textarea');
    
      // Set the value of the textarea to the output text
      tempTextArea.value = outputTextElement.innerText;
    
      // Append the textarea to the body
      document.body.appendChild(tempTextArea);
    
      // Select the text in the textarea
      tempTextArea.select();
    
      // Execute the copy command
      document.execCommand('copy');
    
      // Remove the temporary textarea
      document.body.removeChild(tempTextArea);
    
    }