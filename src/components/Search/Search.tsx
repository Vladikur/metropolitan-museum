import { FC, useState, useEffect } from "react";

interface SearchProps {
  searchObjects: (value: string) => void;
}


const Search: FC<SearchProps> = ({ searchObjects }) => {
  
  const [inputValue, setInputValue] = useState<string>('Auguste Renoir')

  useEffect(() => {
    const timer = setTimeout(() => searchObjects(inputValue), 1000)
    return () => clearTimeout(timer);
  }, [inputValue])

  function handleInput(e: any) {
    const value: string = e.target.value
    setInputValue(value)
  }

  return (
  <div className="search">
    <input value={inputValue} onChange={handleInput} className="search__input"></input>
  </div>
  );
}

export default Search;
