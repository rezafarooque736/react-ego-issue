import { useEffect, useState } from "react";
import "./App.css";

type Item = {
  text: string;
  selected: boolean;
};

const Ego = "Ego";

function App() {
  const [items, setItems] = useState<Item[]>([
    {
      text: "Happiness",
      selected: false,
    },
    {
      text: "Optimism",
      selected: false,
    },
    {
      text: "Kindness",
      selected: false,
    },
    {
      text: "Giving",
      selected: false,
    },
    {
      text: "Respect",
      selected: false,
    },
    {
      text: Ego,
      selected: false,
    },
  ]);
  const [egoSelected, setEgoSelected] = useState(false);
  const [shakeElements, setShakeElements] = useState(false);

  const toggleItem = (item: Item) => {
    if (egoSelected && item.text !== "Ego") {
      setShakeElements(true);

      // Variable to store the timeout ID
      let shakeTimeout: number | undefined;

      const clearShakeTimeout = () => {
        if (shakeTimeout) clearTimeout(shakeTimeout);
      };

      shakeTimeout = setTimeout(() => {
        setShakeElements(false);
        // Optionally call clearShakeTimeout here to prevent memory leaks
        clearShakeTimeout();
      }, 300);

      // if ego is selected, no others can be selected.
      return;
    }

    setItems((items) => {
      return items.map((itemEl) => {
        if (item.text === "Ego") {
          setEgoSelected(!item.selected);
        }
        if (itemEl.text !== item.text) {
          return itemEl;
        }
        return { ...itemEl, selected: !itemEl.selected };
      });
    });
  };

  useEffect(() => {
    if (egoSelected) {
      setItems((items) => {
        return items.map((itemEl) => {
          if (itemEl.text !== "Ego") {
            return {
              ...itemEl,
              selected: false,
            };
          }
          return itemEl;
        });
      });
    }
  }, [egoSelected]);

  return (
    <div className="container">
      <h2 className="main-heading">
        Select all you want to hold on to in your life
      </h2>
      <ul className="grid">
        {items.map((item) => (
          <li
            className={`grid-item ${shakeElements ? "shake-lr" : ""}`}
            key={item.text}
            onClick={() => toggleItem(item)}
          >
            {item.selected ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-6 h-6 check-${
                  item.text === "Ego" ? "red" : "green"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <div className="circle"></div>
            )}
            <div className="text">{item.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
