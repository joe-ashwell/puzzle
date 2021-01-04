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

  render() {
    const puzzlePiecePanel = document.querySelector('section.selection-panel');
    for (const puzzlePiece in this.puzzleImageList) {
      const puzzlePieceItem = document.createElement('div');
      puzzlePieceItem.style.backgroundImage = `url('${this.puzzleImageList[puzzlePiece].url}')`;
      puzzlePieceItem.draggable = true;
      puzzlePieceItem.classList.add('puzzle-piece');
      puzzlePiecePanel.append(puzzlePieceItem);
      console.log(`url('${this.puzzleImageList[puzzlePiece].url}')`);
    }
    return puzzlePiecePanel;
  }
}

class App {

  static init() {
    const panel = new PuzzlePiecePanel();
    panel.render();
  }

}

App.init();