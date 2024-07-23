
class TermoWords{

    // Constructor method
    constructor(){
        this.wordList = ["TERMO"];
        this.letterChoice = "";
        this.letterPosition = "";
        this.linelenght = 5;
        this.wordLetterList = [];
        this.chosenWord = "";
        this.lineCount = 1;
        this.won = false;
        this.incompleteWord = false;
        this.equalLetterCounter = 0;
        this.rightLettersList = [];
        this.map = new Map();
        this.currentColumn = 0;
        this.deleteLetter = false;
        this.arrowRight = false;
        this.arrowLeft = false;
    }

    // Creats the "boxs" buttons
    quantityButtons(quantityLines){
        const divButton = document.querySelector(".divButtonBox");
        let linesList = {};
        // Runs the entire line
        for (let i = 0; i < quantityLines; i++){
            // Declare each "dictionary" item
            linesList["line" + (i + 1)] = [];
            // Loops through all columns creating all buttons text box 
            for (let j = 0; j < this.linelenght; j++) {
                let button = document.createElement("button");
                button.textContent = ""
                button.id = "button" + (i + 1) + (j + 1);
                button.className = "button";
                button.onclick = () => {
                    alert("Você clicou no botão " + (i + 1) + (j + 1));
                    this.mouseSelectsBox(i, j);
                };
                divButton.appendChild(button);
                // Creating list by list using "dictionary" items
                linesList["line" + (i + 1)].push("button" + (i + 1) + (j + 1));
            }
        } 
        console.log(linesList);
    }

    // KEY BOARD
    // Creats key board
    keyBoardButtons(){
        // Select the div's
        const keyQtoP = document.querySelector("#key-q-to-p");
        const keyAtoL = document.querySelector("#key-a-to-l");
        const keyZtoM = document.querySelector("#key-z-to-m");

        // Creates alphabets lists
        const listQp = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
        const listAl = ["A", "S", "D", "F", "G", "H", "J", "K", 'L'];
        const listZm = ["Z" , "X" ,"C" ,"V" ,"B" ,"N" ,"M"];

        // Connects the lists of the alphabet to div father
        this.putLetterOnScreen(listQp, keyQtoP);
        this.putLetterOnScreen(listAl, keyAtoL);
        this.putLetterOnScreen(listZm, keyZtoM);
    }

    // Puts the letters of key board on screen
    putLetterOnScreen(list, fatherDiv){
        for(let i = 0; i < list.length; i++){
            let buttonLetter = document.createElement("button");
            buttonLetter.textContent = list[i];
            buttonLetter.id = list[i] + "button";
            buttonLetter.className = "letter";
            buttonLetter.onclick = () => {
                console.log(`Você clicou no botão: ${list[i]}`);
                this.letterChoice = list[i];
                this.buttonLetterClick();
            };
            fatherDiv.appendChild(buttonLetter);
        }
    }
    
    // Get clicked letter
    buttonLetterClick(){
        console.log(this.letterChoice);
        this.currentLine();
        // Allows you to put letter by letter into the boxes
        for(let i = this.currentColumn; i < this.linelenght+1; i++){
            // Checks if it is an empty box to write
            if (this.wordLetterList[i].textContent == ""){
                this.wordLetterList[i].textContent = this.letterChoice;
                this.currentBox();
                break;     
            }
        }
        // To advance boxes
        if (this.currentColumn < 4){
            this.currentColumn++;
        }
    }

    // Function that allows the user to know which box he is in
    currentBox(){
        console.log(this.deleteLetter);
        // To check if there are empty spaces in the boxes for the user to go back and fill in
        if (this.wordLetterList[this.linelenght-1].textContent != "" && this.deleteLetter == false){
            let counterEmptySpace = 0;
            for (let i = 0; i < this.linelenght; i++){
                if (this.wordLetterList[i].textContent === ""){
                    counterEmptySpace++;
                }
            }
            console.log(counterEmptySpace);

            if (counterEmptySpace === 0){
                this.currentColumn = 4;
            } else if (counterEmptySpace !== 0 && this.currentColumn === 4){
                this.currentColumn = -1;
            }
        }
        // To position the box the user wants to use
        if (this.currentColumn >= 0 && this.deleteLetter == false){
            for(let i = this.currentColumn; i < this.linelenght; i++){
                if (this.arrowLeft === true || this.arrowRight === true){
                    if (this.arrowRight === true){
                        this.wordLetterList[i].style.borderBottomWidth = '1.3vh';
                        this.wordLetterList[i-1].style.borderBottomWidth = '0.6vh';
                        break;     
                    } else{
                        this.wordLetterList[i].style.borderBottomWidth = '1.3vh';
                        this.wordLetterList[i+1].style.borderBottomWidth = '0.6vh';
                        break;     
                    }
                } else{
                    for(let i = this.currentColumn; i < this.linelenght; i++){
                        if (this.wordLetterList[i].textContent == ""){
                            this.wordLetterList[i].style.borderBottomWidth = '1.3vh';
                            this.wordLetterList[i+1].style.borderBottomWidth = '0.6vh';
                            break;     
                        }
                    }
                }
            }
            this.arrowRight = false;
            this.arrowLeft = false;
        } else {
            for(let i = 0; i < this.linelenght; i++){
                // Checks if it is an empty box to write
                if (this.wordLetterList[i].textContent == ""){
                    this.wordLetterList[i].style.borderBottomWidth = '1.3vh';
                    this.wordLetterList[i+1].style.borderBottomWidth = '0.6vh';
                    break;     
                }
            }
        }
        this.deleteLetter = false;
    }

    // Function that captures the current column
    mouseSelectsBox(line, column){
        if (this.lineCount-1 == line){
            for(let i = 0; i < this.linelenght; i++){
                console.log(this.wordLetterList[i].id);
                this.wordLetterList[i].style.borderBottomWidth = '0.6vh';
            }
            this.wordLetterList[column].style.borderBottomWidth = '1.3vh';
            this.currentColumn = column;
        }
    }

    // Function that manipulates a specific line
    currentLine(){
        if (this.won == false){
            let specificBoxButton = "";
            // Creates a list with all the clicked letters
            for(let i = 1; i < this.linelenght+1; i++){
                specificBoxButton = document.getElementById('button' + this.lineCount + i);
                this.wordLetterList.push(specificBoxButton);
                // Applies borders to current line
                this.wordLetterList[i-1].style.border = '0.6vh solid #4C4347';
                this.wordLetterList[i-1].style.backgroundColor = '#6e5c62';
            }
        }
    }

    // Empty box function
    emptyBox(){
        if (this.won == false){
            this.deleteLetter = true;
            if (this.currentColumn >= 0){
                for(let i = this.currentColumn; i >= 0; i--){
                    if (this.wordLetterList[i].textContent != ""){
                        this.wordLetterList[i].textContent = "";
                        this.currentBox();
                        break;
                    }
                }
                console.log(this.currentColumn);
                // To return to previous boxes
                if (this.currentColumn > 0){
                    this.currentColumn--;
                }
                console.log(this.currentColumn);
            } else {
                for(let i = this.linelenght-1; i >= 0; i--){
                    if (this.wordLetterList[i].textContent != ""){
                        this.wordLetterList[i].textContent = "";
                        this.currentBox();
                        break;
                    }
                }
            }
        }
    }

    // Checks if it is the right word
    checksRightWord(){
        // Error handling for incomplete words
        for(let i = 0; i < this.linelenght; i++){
           if (this.wordLetterList[i].textContent == ""){
                alert("Complete a palavra!!");
                this.incompleteWord = true;
                break;
           }
           // If there are no empty spaces, what is below will happen and the code will continue
           else{
                this.incompleteWord = false;
           }
        }
        // It happens if the word is complete
        if(this.incompleteWord === false){
            this.currentColumn = 0;
            for(let i = 0; i < this.linelenght; i++){
                // Joins all the letters and form a word
                this.chosenWord += this.wordLetterList[i].textContent;
                // Puts a darker color on the wrong letters
                this.wordLetterList[i].style.backgroundColor = '#312a2c';
                this.wordLetterList[i].style.border = 'none';
            }
            this.checksRightPositionsLetters();
            console.log(this.chosenWord);
            // Conditional to know if it is the right word
            if (this.chosenWord === this.wordList[0]){
                // When the answer is correct it turns green
                for(let i = 0; i < this.linelenght; i++){
                    this.wordLetterList[i].style.backgroundColor = '#3aa394';
                    this.wordLetterList[i].style.border = 'none';
                }
                alert("Fim de jogo");
                this.won = true;
            } else{
                // Conditional that counts to know the end of the game
                if (this.lineCount < 6){
                    this.lineCount += 1;
                    this.wordLetterList = [];
                    this.currentLine();
                    this.currentBox();
                } else{
                    alert("Fim de jogo");
                    this.won = true;
                } 
            }
            // Clears word
            this.chosenWord = "";
            
        }
        console.log(this.wordLetterList);
    }

    // To add things to the map
    //mapAdd(key, content){
    //    this.map.set(key, content);
    //}

    // To get things from the map
    //getItemMap(key){
    //    return this.map.get(key);
    //}

    // Deletes specific item of the map
    //deleteSpecificItem(key){
    //    this.map.delete(key);
    //}

    // To clear the map
    //clearMap(){
    //    this.map.clear();
    //}

    // Colors specific letters according to position and accuracy 
    checksRightPositionsLetters(){
        // Word of the list
        let word = this.wordList[0];
        // Iteration to compare positions
        for(let i = 0; i < this.linelenght; i++){
            this.equalLetterCounter = 0;
            // Counter to count the number of correct letters within the word
            let correctLettersCounter = 0;
            // Iterator to loop through all letters chosen by the user
            for(let k = 0; k < this.linelenght; k++){
                // If the letter chosen by the user is within the word, what follows will happen
                if (this.chosenWord[i] === word[k]){
                    correctLettersCounter++;
                }
            }

            // What follows below will happen if the letter is not in the word
            if (correctLettersCounter === 0){
                let specificKey = document.getElementById(this.chosenWord[i] + "button");
                specificKey.style.opacity = '0.5';
            }

            // Counts the quantity of the same letter
            for (let k = 0; k < this.linelenght; k++) {
                if (word[i] === word[k]) {
                    this.equalLetterCounter++;
                }
            }
            
            // If the letter is in the correct position, the following will happen
            if (word[i] === this.chosenWord[i]){
                // Changes the colors of the keyboard letters to green according to the chosen word
                let specificKeyGreen = document.getElementById(this.wordLetterList[i].textContent + "button");
                specificKeyGreen.style.background = '#3aa394';
                // Changes the colors of the boxes to green according to the chosen word
                this.wordLetterList[i].style.backgroundColor = '#3aa394';
                this.wordLetterList[i].style.border = 'none';
                this.rightLettersList.push(word[i]);
                this.equalLetterCounter--;
            }
            for(let k = 0; k < this.linelenght; k++){
                // If the letter is in the word, but in the wrong position, the following will happen
                if (word[i] === this.chosenWord[k]){
                    if (i !== k){
                        // Changes the colors of the keyboard letters to yellow according to the chosen word
                        let specificKeyYellow = document.getElementById(this.wordLetterList[k].textContent + "button");
                        // If the letter was never in the correct position in the word, what is below will happen
                        if (!this.rightLettersList.includes(word[i])){
                            specificKeyYellow.style.background = '#d3ad69';
                        }
                        if (this.equalLetterCounter > 0){
                            console.log(this.equalLetterCounter);
                            // Changes the colors of the boxes to yellow according to the chosen word
                            this.wordLetterList[k].style.backgroundColor = '#d3ad69';
                            this.wordLetterList[k].style.border = 'none';
                            this.equalLetterCounter--;
                        }
                    }
                }    
            }
        }
    }
    // Captures and returns a keyboard key
    keyPressed(){
        // Event listener that checks for keyboard action
        document.addEventListener('keydown', (event) => {
            let codeKey = event.code;
            let key = event.key.toUpperCase();
            let isKey = "";

            console.log(this.currentColumn);
            // To move through the boxes using the keyboard and place the letter anywhere
            if (key === "ARROWRIGHT" && this.currentColumn < 4){
                this.currentColumn++;
                this.arrowRight = true;
            }
            if (key === "ARROWLEFT" && this.currentColumn > 0){
                this.currentColumn--;
                this.arrowLeft = true;
            }
            this.currentBox();

            // Erases letters using the keyboard
            if (key == "BACKSPACE"){
                this.emptyBox();
            }

            // Checks if it is the right word
            if (key == "ENTER"){
                this.checksRightWord();
            }

            // Concatenates the first three letters of the code for the pressed key
            for(let i = 0; i < 3; i++){
                isKey += codeKey[i];
            }

            // Checks if key is a letter
            if (isKey == "Key"){
                this.currentLine();
                // Allows you to put letter by letter into the boxes
                for(let i = this.currentColumn; i < this.linelenght+1; i++){
                    // Checks if it is an empty box to write
                    if (this.wordLetterList[i].textContent == ""){
                        this.wordLetterList[i].textContent = key;
                        this.currentBox();
                        console.log(this.wordLetterList[i+1].style.borderBottomWidth);
                        break;     
                    }
                }
                // To advance boxes
                if (this.currentColumn < 4){
                    this.currentColumn++;
                }
                console.log(this.currentColumn);
            }
        });
    }
}

// Creating instance
const termoWords = new TermoWords();

// Functions of the class TermoWords
termoWords.quantityButtons(6);
termoWords.keyBoardButtons();
termoWords.currentLine();
termoWords.currentBox();
termoWords.keyPressed();
