import React, { useEffect, useState } from "react";
import { Grid, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import { Search } from "@material-ui/icons";
import img from './img/R.png'
import { MDBPaginationItem, MDBPagination, MDBPaginationLink } from "mdb-react-ui-kit";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Get = () => {
    const [data, setData] = useState([], 0)
    const [data1, setData1] = useState([])
    const [request, setRequest] = useState(0)
    const [value, setValue] = useState("")
    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/characters?page=0&limit=15&q=&order_by=favorites&sort=desc`, {
            method: "GET",
        }).then((result) => {
            result.json().then((resp) => {
                // console.log(resp)
                let tempArray = [];
                tempArray.push(resp.pagination.items);
                let tempArray1 = [];
                tempArray1.push(resp.pagination.items.total);
                let resp1 = resp.data
                // let resp2 = resp.pagination
                setData(resp1)
                setData1(tempArray)
                setRequest(tempArray1)
            })
        })
    }, [])
    console.log("data", data)
    console.log("data1", data1)
    console.log("request", request)

    const handleChange = (e) => {
        setRequest(e.target.value)
    }


    const handleSearch = async (e) => {
        e.preventDefault()

        fetch(`https://api.jikan.moe/v4/characters?page=0&limit=15&q=${value}&order_by=favorites&sort=desc`).then((result) => {
            result.json().then((resp) => {
                // console.log(resp)
                let resp1 = resp.data
                setData(resp1)
                setValue("")
            })
        })
    }

    return (
        <Grid container spacing={3} >
            <Grid item xs={12} md={12}>
                <h2>Search Anime characters</h2>
                <TableContainer component={Paper} >
                    <form style={{ margin: 'auto', padding: '15px', maxwidth: '400px', alignContent: 'center' }}
                        className="d-flex input-group w-auto"
                        onSubmit={handleSearch}
                        onChange={(e) => handleChange(e)}
                    >
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
                    {/* {
                        data1.map((item) => {
                            return (
                                <Typography>Total <bold>{(item.total)}</bold> matching anime characters found</Typography>
                            )
                        })
                    } */}
                    <Typography>Total <bold>{(request)}</bold> matching anime characters found</Typography>
                    <Table sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TableBody>
                            {data.length !== 0 ?
                                data.map((item) => {
                                    return (
                                        <>
                                            <TableRow >
                                                <TableCell component="th" scope="row"><img src={item.images.jpg.image_url} height={50} weight={50} /></TableCell>
                                                <TableCell component="th" scope="row">{item.mal_id}</TableCell>
                                                <TableCell component="th" scope="row">{item.name}<br></br>{item.nicknames}</TableCell>
                                                <TableCell component="th" scope="row" align="center"><FavoriteTwoToneIcon />{item.favorites}</TableCell>
                                                <TableCell component="th" scope="row"><ArrowForwardIcon onClick={() => window.open(item.url)} /></TableCell>
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
                    <Pagination count={10} color="primary" sx={{ marginLeft: "40rem" }} />
                </Stack><br></br>
            </Grid>
        </Grid>

    )

}

export default Get;