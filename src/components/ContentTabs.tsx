import React, {useState} from 'react';
import {
    Box,
    Tabs,
    Tab,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    AppBar,
    Toolbar,
    CardMedia
} from '@mui/material';
import type {TabPanelProps, ContentTabsProps, ContentItem} from '../types/ContentTypes';

const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const TabPanel: React.FC<TabPanelProps> = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: {xs: 2, sm: 3}}}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const ContentTabs: React.FC<ContentTabsProps> = ({data}) => {
    const [value, setValue] = useState<number>(0);
    const categories = Object.keys(data);

    const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
        setValue(newValue);
    };

    const formatUrl = (url: string): string => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'https://' + url;
        }
        return url;
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <AppBar position="static" sx={{ bgcolor: '#d7d7d7', boxShadow: 1 }}>
                <Toolbar>
                    <Box
                        component="img"
                        src="/tuitionresources/LogoTransparency02.png"
                        alt="Achievers Studio Logo"
                        sx={{ height: 44, mr: 2, objectFit: 'contain' }}
                    />
                    <Typography variant="h6" component="div"
                                sx={{flexGrow: 1, fontFamily: 'Inter, system-ui, sans-serif', color: '#333'}}>
                        Achievers Studio
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="category tabs"
                    sx={{
                        '& .MuiTab-root': {
                            minWidth: {xs: 'auto', sm: 120},
                            fontSize: {xs: '0.875rem', sm: '1rem'},
                            textTransform: 'capitalize',
                            fontFamily: 'Inter, system-ui, sans-serif',
                        }
                    }}
                >
                    {categories.map((category, index) => (
                        <Tab
                            key={category}
                            label={category}
                            id={`tab-${index}`}
                            aria-controls={`tabpanel-${index}`}
                        />
                    ))}
                </Tabs>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    py: {xs: 2, sm: 4},
                    px: {xs: 2, sm: 3, md: 4},
                    minWidth: '100%'
                }}
            >
                {categories.map((category, index) => (
                    <TabPanel key={category} value={value} index={index}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column', /* This stacks items vertically */
                                gap: 2,
                                p: 2
                            }}
                        >
                            {data[category].map((item: ContentItem, itemIndex: number) => (
                                <Card
                                    key={itemIndex}
                                    elevation={2}
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4,
                                        }
                                    }}
                                >
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography
                                            variant="h6"
                                            component="h2"
                                            gutterBottom
                                            sx={{
                                                fontSize: {xs: '1.1rem', sm: '1.25rem'},
                                                fontWeight: 600,
                                                fontFamily: 'Inter, system-ui, sans-serif'
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mb: 2,
                                                fontFamily: 'Inter, system-ui, sans-serif'
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                        {getYouTubeId(item["embedded link"]) ? (
                                            /* Wrapper Box to center the video */
                                            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', pt: 2}}>
                                                <CardMedia
                                                    component="iframe"
                                                    src={`https://www.youtube.com/embed/${getYouTubeId(item["embedded link"])}`}
                                                    sx={{
                                                        /* Standard YouTube default dimensions */
                                                        maxWidth: 1020,
                                                        height: 630,

                                                        /* Make it responsive: fill width on small screens, maintain aspect ratio */
                                                        width: '100%',
                                                        border: 'none',
                                                        aspectRatio: '16/9' /* Optional: Ensures 16:9 ratio if width shrinks below 560px */
                                                    }}
                                                    title={item.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </Box>
                                        ) : (
                                            <Box p={2}>
                                                <Typography>{item["embedded link"]}</Typography>
                                            </Box>
                                        )}
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            href={formatUrl(item["embedded link"])}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visit Link
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </TabPanel>
                ))}
            </Box>
        </Box>
    );
};

export default ContentTabs;