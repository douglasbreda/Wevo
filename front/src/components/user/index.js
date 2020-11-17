import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './styles.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { cpf } from '../../masks/cpf';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import http from '../../http-common';

export default function User() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [dtNascimento, setDtNascimento] = useState('');
    const [cpf, setCPF] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        var data = {
            Nome: name,
            CPF: cpf,
            Email: email,
            // dataNascimento: dtNascimento
        }
        console.log("chegou aqui");
        let response = await http.post("/user", data);

        alert(response);

        
    }

    return (
        <form onSubmit={handleSubmit} className="userContainer" >

                <TextField id="outlined-basic" label="Nome" variant="outlined" />
                <TextField
                    id="outlined-basic"
                    label="CPF"
                    variant="outlined"
                    onChange={e => setCPF(e.target.value)} />
                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Telefone" variant="outlined" />

                <FormControl variant="outlined" >
                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        // onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="DD/MM/YYYY"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={dtNascimento}
                        onChange={e => setDtNascimento(e)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider> */}
                <input type="submit" value="Salvar"></input>
        </form>
    )
}