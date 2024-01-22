import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //クリック時にitems配列に新しいitemを作る
  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };
    //items配列にpush
    const newItems = [...items, newItem];
    //useStateのitemsに反映
    setItems(newItems);
    //入力値を空に
    setInputValue("");
  };

  //done切り替え
  const toggleComplete = (index) => {
    //itemsを展開した配列newItemsを作る
    const newItems = [...items];
    //引数にindexから該当するitemのisSelectedを切り替える
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon
            icon={faPlus}
            onChange={() => handleAddButtonClick()}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{item.quantity}</span>
                <button>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: </div>
      </div>
    </div>
  );
};

export default App;
