import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
import './main-style.css';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import http from '../../http-common';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '../alert/alert';

export default function Main() {

    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState("success");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function goToUser() {
        history.push('/user')
    }

    async function search() {
        try {
            setLoading(true);
            let response = await http.get('/user');

            setRows(response.data);
            console.log(response);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setOpen(true);
            setSeverity("error");

            if (e.message.includes("Network Error")) {
                setMessage("Não foi possível conectar-se com a API 😥");
            } 
            else
                setMessage("Ocorreu um erro ao realizar a solicitação");
        }
    }

    function getGender(gender) {
        switch (gender) {
            case 0:
                return "Não sabe";
            case 1:
                return "Masculino";
            case 2:
                return "Feminino";
            case 9:
                return "Não especificado";
            default:
                return "Não informado";
        }
    }

    function getDateFormated(date) {
        return moment(date).format("DD/MM/YYYY");
    }

    function edit(index) {
        let item = rows[index];
        history.push({
            pathname: '/user',
            state: item
        });
    }

    function remove(index) {
        let item = rows[index];
        let result = window.confirm(`Você tem certeza que deseja excluir o usuário ${item.id} - ${item.nome}`);

        if (result) {
            http.delete(`/user/${item.id}`);
            setRows(rows.filter(data => data.id !== item.id));
        }
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <div>
                <Tooltip title="Buscar todos">
                    <IconButton
                        aria-label="buscar"
                        onClick={search}>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Adicionar novo usuário">
                    <IconButton
                        aria-label="adicionar"
                        onClick={goToUser}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>

            </div>
            <Paper>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Id</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell>Data de Nascimento</TableCell>
                                <TableCell style={{ width: 10 }}></TableCell>
                                <TableCell style={{ width: 10 }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <span className={loading ? "loading" : "loadingHidden"}>Buscando registros</span>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.nome}</TableCell>
                                        <TableCell>{row.cpf}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.telefone}</TableCell>
                                        <TableCell>{getGender(row.sexo)}</TableCell>
                                        <TableCell align="center" >{getDateFormated(row.dataNascimento)}</TableCell>
                                        <TableCell>
                                            <div className="actionButtons">
                                                <IconButton
                                                    aria-label="editar"
                                                    onClick={() => edit(index)}>
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    aria-label="excluir"
                                                    onClick={() => remove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                        <TableCell>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            <Alert open={open} onClose={handleClose} message={message} severity={severity} />
        </div>
    );
}

