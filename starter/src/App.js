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
  const [totalItemCount, setTotalItemCount] = useState(0);

  //初期化時にLocalStorageのタスクを取り出す
  useEffect(() => {
    const data = localStorage.getItem("storage");
    if (data !== null) {
      //JSON.parseでJSONからオブジェクトに変換
      const parsedTaskList = JSON.parse(data);
      setItems(parsedTaskList);
    }
  }, []);

  useEffect(() => {
    // コンポーネントがマウントされたとき、および items が変更されたときに実行
    calculateTotal();

    //localstorage
    //JSON.stringifyでオブジェクトからJSON(文字列)に変換
    const stringifiedItem = JSON.stringify(items);
    localStorage.setItem("storage", stringifiedItem);
  }, [items]); // items が変更されたときに実行するように指定

  //クリック時にitems配列に新しいitemを作る
  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };
    //items配列にpush
    const newItems = [...items, newItem];
    console.log("New Items:", newItems); // 新しい items を確認

    //カウント
    calculateTotal(newItems);
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

  //itemsが増える際の処理
  const handleQuantityIncrease = (index) => {
    //itemsを展開した配列newItemsを作る
    const newItems = [...items];
    //quantityを増やす
    newItems[index].quantity++;
    calculateTotal();
  };
  //itemsが増える際の処理
  const handleQuantityDecrease = (index) => {
    //itemsを展開した配列newItemsを作る
    const newItems = [...items];
    //quantityを増やす
    newItems[index].quantity--;
    calculateTotal();
  };
  //アイテムの総量計算
  const calculateTotal = () => {
    console.log(items);
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(totalItemCount);
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
            onClick={() => handleAddButtonClick()}
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
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span>{item.quantity}</span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div>
  );
};

export default App;
