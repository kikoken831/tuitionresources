import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ContentTabs from './components/ContentTabs';
import { contentData } from './data/contentData';

const theme = createTheme({
    palette: {
        primary: {
            main: '#d7d7d7',
        },
        secondary: {
            main: '#fffefd',
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ContentTabs data={contentData} />
        </ThemeProvider>
    );
};

export default App
