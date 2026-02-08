import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ContentTabs from './components/ContentTabs';
import { contentData } from './data/contentData';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
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
