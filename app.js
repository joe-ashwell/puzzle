class PuzzlePiece {
  constructor(url) {
    this.url = url;
  }
}

class PuzzlePiecePanel {
  puzzleImageList = [
    // Row 1
    new PuzzlePiece('gorilla_img/gorilla_row1_col1.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row1_col2.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row1_col3.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row1_col4.jpg'),
    // Row 2
    new PuzzlePiece('gorilla_img/gorilla_row2_col1.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row2_col2.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row2_col3.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row2_col4.jpg'),
    // Row 3
    new PuzzlePiece('gorilla_img/gorilla_row3_col1.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row3_col2.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row3_col3.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row3_col4.jpg'),
    // Row 4
    new PuzzlePiece('gorilla_img/gorilla_row4_col1.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row4_col2.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row4_col3.jpg'),
    new PuzzlePiece('gorilla_img/gorilla_row4_col4.jpg')
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
      puzzlePieceItem.addEventListener('dragstart', App.dragStart.bind(this));
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
    e.dataTransfer.setData('text/plain', e.target.style.backgroundImage);
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
    const URL = e.dataTransfer.getData('text/plain');
    e.target.style.backgroundImage = `${URL}`;
  }
}

App.init();