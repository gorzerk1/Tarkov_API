import React, { useState} from 'react';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  console.log(imageKey)
  return (
      <MyContext.Provider
      value={{
        setImageKey,
        imageKey,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, ThemeProvider };
