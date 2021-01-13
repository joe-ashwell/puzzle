class PuzzlePiece {
  constructor(url, id) {
    this.url = url;
    this.id = id;
  }
}

class PuzzlePiecePanel {
  puzzleImageList = [
    // Row 1
    new PuzzlePiece("gorilla_img/gorilla_row1_col1.jpg", "a"),
    new PuzzlePiece("gorilla_img/gorilla_row1_col2.jpg", "b"),
    new PuzzlePiece("gorilla_img/gorilla_row1_col3.jpg", "c"),
    new PuzzlePiece("gorilla_img/gorilla_row1_col4.jpg", "d"),
    // Row 2
    new PuzzlePiece("gorilla_img/gorilla_row2_col1.jpg", "e"),
    new PuzzlePiece("gorilla_img/gorilla_row2_col2.jpg", "f"),
    new PuzzlePiece("gorilla_img/gorilla_row2_col3.jpg", "g"),
    new PuzzlePiece("gorilla_img/gorilla_row2_col4.jpg", "h"),
    // Row 3
    new PuzzlePiece("gorilla_img/gorilla_row3_col1.jpg", "i"),
    new PuzzlePiece("gorilla_img/gorilla_row3_col2.jpg", "j"),
    new PuzzlePiece("gorilla_img/gorilla_row3_col3.jpg", "k"),
    new PuzzlePiece("gorilla_img/gorilla_row3_col4.jpg", "l"),
    // Row 4
    new PuzzlePiece("gorilla_img/gorilla_row4_col1.jpg", "m"),
    new PuzzlePiece("gorilla_img/gorilla_row4_col2.jpg", "n"),
    new PuzzlePiece("gorilla_img/gorilla_row4_col3.jpg", "o"),
    new PuzzlePiece("gorilla_img/gorilla_row4_col4.jpg", "p"),
  ];

  constructor() {}

  randomArraySort() {
    const sortedPuzzleArray = this.puzzleImageList.sort(() => {
      return 0.5 - Math.random();
    });
    return sortedPuzzleArray;
  }

  render() {
    const puzzlePiecePanel = document.querySelector("section.selection-panel");

    this.randomArraySort().forEach((puzzlePiece) => {
      const puzzlePieceItem = document.createElement("div");
      puzzlePieceItem.style.backgroundImage = `url('${puzzlePiece.url}')`;
      puzzlePieceItem.draggable = true;
      puzzlePieceItem.classList.add("puzzle-piece");
      puzzlePieceItem.dataset.initialId = `${puzzlePiece.id}`;
      puzzlePieceItem.addEventListener("dragstart", EventHelper.dragStart.bind(this));
      puzzlePiecePanel.append(puzzlePieceItem);
    });
  }
}

class PuzzleMain {
  constructor() {}

  render() {
    const mainPuzzleSection = document.querySelector("section.puzzle-panel");
    const helperArray = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
    ];

    for (let i = 0; i < new PuzzlePiecePanel().puzzleImageList.length; i++) {
      const puzzlePieceLocation = document.createElement("div");
      puzzlePieceLocation.classList.add("puzzle-piece-location");
      puzzlePieceLocation.dataset.initialId = `${helperArray[i]}`;
      puzzlePieceLocation.innerText = `${helperArray[i]}`;
      puzzlePieceLocation.addEventListener(
        "dragenter",
        EventHelper.dragEnter.bind(this)
      );
      puzzlePieceLocation.addEventListener("dragover", EventHelper.dragOver.bind(this));
      puzzlePieceLocation.addEventListener("drop", EventHelper.drop.bind(this));
      puzzlePieceLocation.addEventListener(
        "dblclick",
        EventHelper.doubleClick.bind(this)
      );
      mainPuzzleSection.append(puzzlePieceLocation);
    }
    return mainPuzzleSection;
  }
}

class EventHelper {
  constructor() {}

  render() {
    window.addEventListener("keydown", (event) => {
        const puzzlePiece = document.querySelector(
          `.puzzle-piece[data-initial-id="${event.key}"]`
        );
        const puzzlePieceLocation = document.querySelector(
          `.puzzle-piece-location[data-initial-id="${event.key}"]`
        );
        if (!puzzlePieceLocation.style.backgroundImage) {
          if (puzzlePiece.dataset.initialId === `${event.key}`) {
            puzzlePieceLocation.style.backgroundColor = "#273469";
            puzzlePieceLocation.style.opacity = "0.95";
            puzzlePieceLocation.style.color = "white";
            puzzlePiece.style.opacity = "0.05";
          } else {
            return;
          }
          setTimeout(() => {
            puzzlePieceLocation.style.backgroundColor = "#FAFAFF";
            puzzlePieceLocation.style.opacity = "1";
            puzzlePieceLocation.style.color = "black";
            puzzlePiece.style.opacity = "1";
          }, 1000);
        }
    });
  }

  static doubleClick(e) {
    document
    .querySelector(`[data-initial-id="${e.target.dataset.cameFromId}"]`)
    .style.backgroundImage = `${e.target.style.backgroundImage}`;
    e.target.style.backgroundImage = ``;
    e.target.style.color = 'black';
  }

  static dragStart(e) {
    e.dataTransfer.setData("text/plain", [
      e.target.style.backgroundImage,
      e.target.dataset.initialId,
    ]);
  }

  static dragEnter(e) {
    e.preventDefault();
  }

  static dragOver(e) {
    e.preventDefault();
  }

  static drop(e) {
    const draggedData = e.dataTransfer.getData("text/plain");
    const [draggedDataURL, draggedDataId] = draggedData.split(",");

    const previousPuzzlePiece = document.querySelector(
      `.puzzle-piece[data-initial-id="${draggedDataId}"]`
    );
    previousPuzzlePiece.style.backgroundImage = ``;
    previousPuzzlePiece.style.backgroundColor = `#1E2749`;

    e.target.dataset.cameFromId = draggedDataId;
    e.target.style.backgroundImage = `${draggedDataURL}`;
    e.target.style.color = 'transparent';
  }
}

class App {
  static init() {
    new PuzzlePiecePanel().render();
    new PuzzleMain().render();
    new EventHelper().render();
  }
}

App.init();
