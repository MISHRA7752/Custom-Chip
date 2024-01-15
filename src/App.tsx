import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import ChipCompont from "./Components/InputChip";
import styled from "styled-components";
import DropDownChipCompont from "./Components/DropDownChip";
import items from "./data";
interface IUserData {
  name: string;
  email: string;
  img: string;
}

interface IChipData extends IUserData {
  id?: number;
}
const MainCon = styled.div<{ isFocued: boolean, id:string }>`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 4px;
  border-bottom: ${({ isFocued }) =>
    (isFocued && "2px solid blue") || "2px solid gray"};
  margin: 4px;
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState<IChipData[]>([]);
  const [filteredItems, setFilteredItems] = useState<IChipData[]>([]);
  const [isFocued, setisFocued] = useState(false);
  const [top, setTop] = useState<number|undefined>(66);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filteredIt = items.filter(
      (item) =>
        !chips.find((chip) => chip.name === item.name) &&
        item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredItems(filteredIt);
  }, [inputValue]);
  useEffect(() => {
    if (isFocued) {
      const filtItms = items.filter(
        (ele) => !chips.find((itm) => itm.email === ele.email)
      );
      setFilteredItems(filtItms);
    }
  }, [isFocued]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
      // Remove the last chip when backspace is pressed and input is empty
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip?.id);
    }
  };

  const handleChipClick = (item: IUserData) => {
    // Convert an item to a chip
    const newChip = {
      id: Date.now(),
      ...item,
    };

    setChips([...chips, newChip]);
    setInputValue("");
    inputRef?.current?.focus();
  };

  const handleChipRemove = (chipId?: number) => {
    const updatedChips = chips.filter((chip) => chip.id !== chipId);
    setChips(updatedChips);
  };

  function haldleFocus() {
    setTimeout(() => {
      setisFocued(true);
    }, 300);
  }
  function handleBlur() {
    setTimeout(() => {
      setisFocued(false);
    }, 200);
  }
  useEffect(()=>{
    setTop(document.getElementById('maincon')?.offsetHeight)
  },[chips.length])
  return (
    <MainCon isFocued={isFocued} id="maincon">
        {chips.map((chip) => (
          <div key={chip.id} className="chip">
            <ChipCompont
              text={chip.name}
              onClick={() => handleChipRemove(chip.id)}
              imageUrl={chip.img}
            />
          </div>
        ))}
        <input
          onFocus={haldleFocus}
          onBlur={handleBlur}
          style={{ border: "none", outline: "none" }}
          ref={inputRef}
          type="text"
          placeholder="Type here for sugestions..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="input"
        />
      {isFocued && (
        <div className="dropdown" style={{top:`${(top||0)+8}px`}}>
          {filteredItems.map((item) => (
            <DropDownChipCompont
              key={item.id}
              className="dropdown-item"
              onClick={() => handleChipClick(item)}
              leftText={item.name}
              rightText={item.email}
              imageUrl={item.img}
            />
          ))}
        </div>
      )}
    </MainCon>
  );
}

export default App;
