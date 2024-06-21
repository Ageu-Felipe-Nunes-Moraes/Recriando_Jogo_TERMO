
class TermoWords{

    // Constructor method
    constructor(){
        this.wordList = ["TERMO"];
        this.letterChoice = "";
        this.letterPosition = "";
        this.linelenght = 5;
        this.wordLetterList = [];
        this.chosenWord = "";
        this.columnCount = 1;
    }

    // Creats the "boxs" buttons
    quantityButtons(quantityLines){
        const divButton = document.querySelector(".divButtonCaixa");
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
        let specificBoxButton = "";
        // Access a specific button by ID and modify its content
        for(let i = 1; i < this.linelenght+1; i++){
            specificBoxButton = document.getElementById('button' + this.columnCount + i);
            this.wordLetterList.push(specificBoxButton);
        }
        // Allows you to put letter by letter into the boxes
        for(let i = 0; i < this.linelenght; i++){
            if (this.wordLetterList[i].textContent == ""){
                this.wordLetterList[i].textContent = this.letterChoice;  
                break;     
            }
        }
    }

    // Empties box to box
    emptyBox(){
        for(let i = this.linelenght-1; i >= 0; i--){
            if (this.wordLetterList[i].textContent != ""){
                this.wordLetterList[i].textContent = "";
                break;
            }
        }
    }

    // Checks if it is the right word
    checksRightWord(){
        // Joins all the letters and form a word
        for(let i = 0; i < this.linelenght; i++){
            this.chosenWord += this.wordLetterList[i].textContent;
        }
        console.log(this.chosenWord);
        // Conditional to know if it is the right word
        if (this.chosenWord == this.wordList[0]){
            alert("ACERTOOU");
        } else{
            alert("ERROOU");
            this.columnCount += 1;
            this.wordLetterList = []
        }
        
        // Clears word
        this.chosenWord = "";
    }

} 

// Creating instance
const termoWords = new TermoWords();

// Functions of the class TermoWords
termoWords.quantityButtons(6);
termoWords.keyBoardButtons();
