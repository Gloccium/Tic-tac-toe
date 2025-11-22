// Игровое поле
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Состояние игры
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Создаем игровое поле
function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Обработка клика по ячейке
function handleCellClick(e) {
    const index = parseInt(e.target.getAttribute('data-index'));

    // Если ячейка занята или игра окончена — выходим
    if (gameBoard[index] !== '' || !gameActive) return;

    // Записываем символ
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Проверяем победу
    if (checkWin()) {
        status.textContent = `Игрок ${currentPlayer} победил!`;
        gameActive = false;
        highlightWinningCells();
        return;
    }

    // Проверяем ничью
    if (gameBoard.every(cell => cell !== '')) {
        status.textContent = 'Ничья!';
        gameActive = false;
        return;
    }

    // Переключаем игрока
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Ход игрока ${currentPlayer}`;
}

// Проверка победы
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // строки
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // столбцы
        [0, 4, 8], [2, 4, 6]             // диагонали
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

// Подсветка победной линии
function highlightWinningCells() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            gameBoard[a] !== '' &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[b] === gameBoard[c]
        ) {
            document.querySelectorAll('.cell')[a].classList.add('win-line');
            document.querySelectorAll('.cell')[b].classList.add('win-line');
            document.querySelectorAll('.cell')[c].classList.add('win-line');
            break;
        }
    }
}

// Сброс игры
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Ход игрока ${currentPlayer}`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win-line');
    });
}

// Слушатели событий
resetButton.addEventListener('click', resetGame);

// Инициализация
createBoard();