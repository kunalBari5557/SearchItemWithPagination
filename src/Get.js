import React, { useEffect, useState } from "react";
import { Grid, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import { Search } from "@material-ui/icons";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import img from './img/school4.jpg'

const Get = () => {
    const [data, setData] = useState([], 0)
    const [data1, setData1] = useState([])
    const [request, setRequest] = useState(0)
    const [value, setValue] = useState("")
    const [page, setPage] = useState(1)
    // const [post, setPost] =useState([])
    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/characters?page=${page}&limit=15&q=&order_by=favorites&sort=desc`, {
            method: "GET",
        }).then((result) => {
            result.json().then((resp) => {
                let tempArray = [];
                tempArray.push(resp.pagination.items);
                let tempArray1 = [];
                tempArray1.push(resp.pagination.items.total);
                let resp1 = resp.data
                setData(resp1)
                setData1(tempArray)
                setRequest(tempArray1)
                // setPost(resp1)
            })
        })
    }, [page])
    console.log("data", data)
    console.log("data1", data1)
    console.log("request", request)

    const handleChange = (e) => {
        setRequest(e.target.value)
    }


    const handleSearch = async (e) => {
        e.preventDefault()

        fetch(`https://api.jikan.moe/v4/characters?page=${page}&limit=15&q=${value}&order_by=favorites&sort=desc`).then((result) => {
            result.json().then((resp) => {
                // console.log(resp)
                let resp1 = resp.data
                setData(resp1)
                setValue("")
            })
        })
    }

    return (
        <div
            class="bg_image"
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                height: "240vh",
                color: "#f5f5f5"
            }}
        >
            <Grid container spacing={3} >
                <Grid item xs={12} md={12}>
                    <h2>Search Anime characters</h2>
                    <TableContainer>
                        <form style={{ margin: 'auto', padding: '15px', maxwidth: '400px', alignContent: 'center' }}
                            className="d-flex input-group w-auto"
                            onSubmit={handleSearch}
                            onChange={(e) => handleChange(e)}
                        ><br></br>
                            <TextField
                                id="string-search"
                                name="customReference"
                                type="search"
                                variant="outlined"
                                placeholder="search Name..."
                                size="small"
                                value={value}
                                className="search_textfield"
                                onChange={(e) => setValue(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            /><br></br>
                            <div>
                                <br></br><Button
                                    type="submit"
                                    variant="contained"
                                    size="medium"
                                    sx={{ marginLeft: "22rem", marginTop: "-7rem" }}>
                                    search
                                </Button>
                            </div>
                        </form>
                        <Typography>Total <bold>{(request)}</bold> matching anime characters found</Typography>
                        <Table sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TableBody>
                                {data.length !== 0 ?
                                    data.map((item) => {
                                        return (
                                            <>
                                                <TableRow >
                                                    <TableCell component="th" scope="row"><img src={item.images.jpg.image_url} height={50} weight={50} /></TableCell>
                                                    <TableCell component="th" scope="row" sx={{ color: "white" }}>{item.mal_id}</TableCell>
                                                    <TableCell component="th" scope="row" sx={{ color: "white" }}>{item.name}<br></br>{item.nicknames}</TableCell>
                                                    <TableCell component="th" scope="row" align="center" sx={{ color: "white" }}><FavoriteTwoToneIcon sx={{ color: "pink" }} />{item.favorites}</TableCell>
                                                    <TableCell component="th" scope="row" sx={{ color: "white" }}><ArrowForwardIcon sx={{ color: "blue" }} onClick={() => window.open(item.url)} /></TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    }) : (
                                        <center>
                                            <h4>No Record Found</h4>
                                        </center>)
                                }
                            </TableBody>
                        </Table>
                    </TableContainer><br></br>
                    <Stack spacing={2}>
                        <Pagination count={data}
                            color="primary" sx={{ marginLeft: "40rem" }}
                            showFirstButton={true}
                            showLastButton={true}
                            Page={page}
                            onChange={(event, value) => setPage(value)} />
                    </Stack><br></br>
                </Grid>
            </Grid>
        </div>
    )

}

export default Get;