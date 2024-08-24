async function rewriteText() {
    const inputText = document.getElementById('inputText').value;

    // Step 1: Fetch synonyms for words using the Datamuse API
    const words = inputText.split(' ');
    const rewrittenWords = await Promise.all(words.map(async word => {
        const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
        const synonyms = await response.json();
        return synonyms.length > 0 ? synonyms[0].word : word;
    }));
    
    const synonymRewrittenText = rewrittenWords.join(' ');

    // Step 2: Rewriting text to keep professional meaning using a GPT-like API (Example API call)
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
            model: "gpt-4",
            prompt: `Rewrite the following text to be more professional and clear:\n\n${synonymRewrittenText}`,
            max_tokens: 1000
        })
    });

    const data = await response.json();
    const rewrittenText = data.choices[0].text.trim();

    // Display the rewritten text
    document.getElementById('outputText').value = rewrittenText;
}
