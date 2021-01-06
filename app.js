class PuzzlePiece {
  constructor(url, id) {
    this.url = url;
    this.id = id;
  }
}

class PuzzlePiecePanel {
  puzzleImageList = [
    // Row 1
    new PuzzlePiece('gorilla_img/gorilla_row1_col1.jpg', 1),
    new PuzzlePiece('gorilla_img/gorilla_row1_col2.jpg', 2),
    new PuzzlePiece('gorilla_img/gorilla_row1_col3.jpg', 3),
    new PuzzlePiece('gorilla_img/gorilla_row1_col4.jpg', 4),
    // Row 2
    new PuzzlePiece('gorilla_img/gorilla_row2_col1.jpg', 5),
    new PuzzlePiece('gorilla_img/gorilla_row2_col2.jpg', 6),
    new PuzzlePiece('gorilla_img/gorilla_row2_col3.jpg', 7),
    new PuzzlePiece('gorilla_img/gorilla_row2_col4.jpg', 8),
    // Row 3
    new PuzzlePiece('gorilla_img/gorilla_row3_col1.jpg', 9),
    new PuzzlePiece('gorilla_img/gorilla_row3_col2.jpg', 10),
    new PuzzlePiece('gorilla_img/gorilla_row3_col3.jpg', 11),
    new PuzzlePiece('gorilla_img/gorilla_row3_col4.jpg', 12),
    // Row 4
    new PuzzlePiece('gorilla_img/gorilla_row4_col1.jpg', 13),
    new PuzzlePiece('gorilla_img/gorilla_row4_col2.jpg', 14),
    new PuzzlePiece('gorilla_img/gorilla_row4_col3.jpg', 15),
    new PuzzlePiece('gorilla_img/gorilla_row4_col4.jpg', 16)
  ]

  constructor() {}

  randomArraySort() {
    const sortedPuzzleArray = this.puzzleImageList.sort( () => {
    return 0.5 - Math.random();
    });  
    return sortedPuzzleArray;
  }

  render() {
    const puzzlePiecePanel = document.querySelector('section.selection-panel');

    this.randomArraySort().forEach(puzzlePiece => {
      const puzzlePieceItem = document.createElement('div');
      puzzlePieceItem.style.backgroundImage = `url('${puzzlePiece.url}')`;
      puzzlePieceItem.draggable = true;
      puzzlePieceItem.classList.add('puzzle-piece');
      puzzlePieceItem.setAttribute('id', `${puzzlePiece.id}`);
      puzzlePieceItem.addEventListener('dragstart', App.dragStart.bind(this));
      puzzlePieceItem.addEventListener('dragenter', App.dragEnter.bind(this));
      puzzlePieceItem.addEventListener('dragover', App.dragOver.bind(this));
      puzzlePieceItem.addEventListener('dragleave', App.dragLeave.bind(this));
      puzzlePieceItem.addEventListener('drop', App.drop.bind(this));
      puzzlePiecePanel.append(puzzlePieceItem);
    });

    return puzzlePiecePanel;
  }
}

class PuzzleMain {
  constructor() {}

  render() {
    const mainPuzzleSection = document.querySelector('section.puzzle-panel');

    for (let i = 0; i < new PuzzlePiecePanel().puzzleImageList.length; i++) {
      const puzzlePieceLocation = document.createElement('div');
      puzzlePieceLocation.classList.add('puzzle-piece-location');
      puzzlePieceLocation.draggable = true;
      puzzlePieceLocation.setAttribute('id', `${i + 1}`);
      puzzlePieceLocation.addEventListener('dragstart', App.dragStart.bind(this));
      puzzlePieceLocation.addEventListener('dragenter', App.dragEnter.bind(this));
      puzzlePieceLocation.addEventListener('dragover', App.dragOver.bind(this));
      puzzlePieceLocation.addEventListener('dragleave', App.dragLeave.bind(this));
      puzzlePieceLocation.addEventListener('drop', App.drop.bind(this));
      mainPuzzleSection.append(puzzlePieceLocation);
    }
    return mainPuzzleSection;
  }
}

class App {
  static init() {
    new PuzzlePiecePanel().render();
    new PuzzleMain().render();
  }

  static dragStart(e) {
    e.dataTransfer.setData('text/plain', [e.target.style.backgroundImage, e.target.id]);
    // console.log(e.target.style.backgroundImage);
  }

  static dragEnter(e) {
    e.preventDefault();
    // e.target.style.backgroundColor = 'yellow';
  }

  static dragOver(e) {
    e.preventDefault();
    // e.target.style.backgroundColor = `red`;
  }

  static dragLeave(e) {
    // e.target.style.backgroundColor = `blue`;
  }

  static drop(e) {
  
    const draggedData = e.dataTransfer.getData('text/plain')
    const [draggedDataURL, draggedDataId] = draggedData.split(',');

    const previousPuzzlePiece = document.getElementById(`${draggedDataId}`);
    previousPuzzlePiece.innerHTML = `YOOOOOOOO`;
    
    e.target.style.backgroundImage = `${draggedDataURL}`;
    console.log(`e.target: ${e.target.id}`);
    console.log(`e: ${draggedDataId}`);
    if (e.target.id === draggedDataId) {
      console.log('yes!')
      
    } else {
      console.log('nope!')
    } 
  }
}

App.init();