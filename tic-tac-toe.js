
        let mode = "two";
        let board = document.getElementById("board");
        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];
        
        function setMode(selectedMode) {
            mode = selectedMode;
            resetGame();
        }
        
        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const combo of winningCombinations) {
                const [a, b, c] = combo;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    highlightWinnerCells(combo);
                    endGame(`${gameBoard[a]} wins!`);
                    return gameBoard[a];
                }
            }
            return null;
        }
        
        function checkDraw() {
            if (gameBoard.every(cell => cell !== "") && !checkWinner()) {
                document.querySelectorAll(".cell").forEach(cell => cell.classList.add("draw"));
                endGame("It's a draw!");
                return true;
            }
            return false;
        }
        
        function highlightWinnerCells(combo) {
            combo.forEach(index => {
                document.querySelectorAll(".cell")[index].classList.add("win");
            });
        }
        
        function endGame(message) {
            document.getElementById("winnerDisplay").textContent = message;
        }
        
        function handleClick(index) {
            if (gameBoard[index] !== "" || document.getElementById("winnerDisplay").textContent !== "") return;
            
            gameBoard[index] = currentPlayer;
            renderBoard();
            let winner = checkWinner();
            if (winner) return;
            if (checkDraw()) return;
            
            if (mode === "single" && currentPlayer === "X") {
                currentPlayer = "O";
                setTimeout(aiMove, 500);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
        
        function aiMove() {
            let available = gameBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
            if (available.length === 0) return;
            const randomIndex = available[Math.floor(Math.random() * available.length)];
            gameBoard[randomIndex] = "O";
            renderBoard();
            if (checkWinner() || checkDraw()) return;
            currentPlayer = "X";
        }
        
        function renderBoard() {
            board.innerHTML = "";
            gameBoard.forEach((value, index) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                if (value !== "") cell.classList.add("taken");
                cell.textContent = value;
                cell.onclick = () => handleClick(index);
                board.appendChild(cell);
            });
        }
        
        function resetGame() {
            gameBoard.fill("");
            currentPlayer = "X";
            document.getElementById("winnerDisplay").textContent = "";
            renderBoard();
        }
        renderBoard();
