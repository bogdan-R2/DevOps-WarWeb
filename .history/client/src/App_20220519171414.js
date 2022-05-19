import './App.css';

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import Routing from "./Routing";
import { GlobalStyle } from "./styles/globalStyle";
import { darkTheme, lightTheme } from "./styles/theme";
import HomePage from './pages/home/HomePage';
import { Header } from './components/header/Header';
import { FetchProvider } from './contexts/FetchContext';

export const ThemeContext = React.createContext(null);

const App = () => {
    const [theme, setTheme] = useState("light");
    const themeStyle = theme === "light" ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            <ThemeProvider theme={themeStyle}>
                <GlobalStyle />
                <Helmet>
                    <title>Peace is real</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>
                <Routing/>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default App;