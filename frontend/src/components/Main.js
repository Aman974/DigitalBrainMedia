import React, { useState, } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios"
import "../App.css"
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '25ch',
            '&:focus': {
                width: '27ch',
            },
        },
    },
}));

const Main = () => {

    const [response, setResponse] = useState([])
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            await axios.get(`http://localhost:8000/search?query=${query}`)
                .then((res) => {
                    setResponse(res.data)
                    setLoading(false)
                })
        } catch (err) {
            console.log('err:', err)
            setLoading(false)
        }
    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    };

    return (
        <>
            {loading && (<div className="load"> <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
                <CircularProgress color="success" />
                <CircularProgress color="inherit" />
            </Stack> </div>)}

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </Search>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            style={{ paddingLeft: "20%" }}
                            sx={{ flexGrow: .6, display: { xs: 'none', sm: 'block' } }}
                        >
                            Social Media Search
                        </Typography>

                    </Toolbar>
                </AppBar>
            </Box>

            <div className="grid-container">
                {response.map((item, index) => {
                    return (
                        <>
                            <div className="grid-item" key={index}>
                                <div>
                                    <div>
                                        <h3> {item.title} </h3>
                                        <p> {item.snippet} </p>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer"> {item.link} </a>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Main
