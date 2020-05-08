let express = require('express');
let app = express()

app.get('/sum', (req, res)=>{
    const a = Number(req.query.a)
    const b = Number(req.query.b)
    const c = a + b
    res.send(`${c}`)
})

app.get('/lotto', (req, res) => {
	const chosenNumbers = req.query.arr;
	const winningNumbers = []
	const matchingNumbers = []
	let response = ""

	for (let i = 0; i < 6; i++){
		winningNumbers.push(Math.floor(Math.random()*21))
	}
	for(let i = 0; i < winningNumbers.length; i++){
		for(let j = 0; j < chosenNumbers.length; j++){
			if (winningNumbers[i] == chosenNumbers[j]){
				matchingNumbers.push(chosenNumbers[j])
				break
			}
		}
	}

	if (matchingNumbers.length < 4){
		response = "Sorry, you lose"
	} else if (matchingNumbers.length === 4){
		response = "You win a free ticket!"
	} else if (matchingNumbers.length === 5){
		response = "You win $100"
	} else {
		response = "Congrats! You could have won the mega millions!"
	}
	res.send(`${response} you matched ${matchingNumbers.length} numbers`)
})


app.get('/cipher', (req, res) => {
	const text = req.query.text.toUpperCase().split('')
	const shift = Number(req.query.shift)
	const newStringArr = []

	text.map(letter => {
		if (letter.charCodeAt(0) + shift > 65 + 25){
		const newLetter = letter.charCodeAt(0) + shift - 26;
		newStringArr.push(String.fromCharCode(newLetter))
		} else {
		const newLetter = letter.charCodeAt(0) + shift;
		newStringArr.push(String.fromCharCode(newLetter))
	}
	})


	res.send(`${newStringArr.join('')}`)
})
app.listen(8000, ()=>{
    console.log('listening!')
})