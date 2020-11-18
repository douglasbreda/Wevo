import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './user-style.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { cpfMask } from '../../masks/cpf';
import { phoneMask } from '../../masks/phone';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import http from '../../http-common';
import validateEmail from '../../validations/email';
import { useHistory } from 'react-router-dom';
import Alert from '../alert/alert';


export default function User({ location }) {

    const history = useHistory();
    const item = location == null ? null : location.state;
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [dtNascimento, setDtNascimento] = useState(null);
    const [cpf, setCPF] = useState('');
    const [cpfError, setCpfError] = useState(false);
    const [cpfMessageError, setCpfMessage] = useState('Sem erros');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setServerity] = useState("success");

    useEffect(() => {
        console.log("The location is>", location)
        if (item != null) {
            setName(item.nome);
            setCPF(item.cpf);
            setEmail(item.email);
            setDtNascimento(item.dataNascimento);
            setPhone(item.telefone);
            setGender(item.sexo);
        }
    }, [location, item])

    function clearFields() {
        setName('');
        setCPF('');
        setEmail('');
        setDtNascimento('');
        setPhone('');
        setGender(null);
        setDtNascimento(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        var data = {
            Id: 0,
            Nome: name,
            CPF: cpf,
            Email: email,
            Telefone: phone,
            DataNascimento: dtNascimento,
            Sexo: gender
        }
        if (validate(data)) {

            try {
                let response = null;

                if (item !== null && item !== undefined) {
                    data.Id = item.id
                    response = await http.put(`/user/${item.id}`, data);
                }
                else
                    response = await http.post('/user', data);

                console.log(response);
                if (response.status === 200) {
                    clearFields();
                    setOpen(true);
                    setMessage("Usuário salvo com sucesso");
                }
                else {
                    setOpen(true);
                    setMessage(response.message);
                }
            } catch (e) {
                console.log(e);
                if(e.hasOwnProperty("response")){
                    if(e.response.hasOwnProperty("data")){
                        if(e.response.data.hasOwnProperty("message")){
                            setOpen(true);
                            setMessage(e.response.data.message);
                            setServerity("error");
                        }
                    }
                }
            }
        }
    }

    function setCpfValidation(hasError, message) {
        setCpfError(hasError);
        setCpfMessage(message);
    }

    function validate_cpf() {
        let cpf_para_validar = cpf;
        cpf_para_validar = cpf_para_validar.replace(/\D/g, '');
        console.log(cpf_para_validar);

        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf_para_validar.length < 11) {
            setCpfValidation(true, "CPF Inválido")
            return false;
        }
        for (i = 0; i < cpf_para_validar.length - 1; i++) {
            if (cpf_para_validar.charAt(i) !== cpf_para_validar.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        }
        if (!digitos_iguais) {
            numeros = cpf_para_validar.substring(0, 9);
            digitos = cpf_para_validar.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)) {
                console.log(2);
                setCpfValidation(true, "CPF Inválido")
                return false;
            }
            numeros = cpf_para_validar.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)) {
                console.log(3);
                setCpfValidation(true, "CPF Inválido")
                return false;
            }
            setCpfValidation(false, "");
            return true;
        }
        else {
            setCpfValidation(true, "CPF Inválido")
            return false;
        }
    }

    function validate(data) {
        let validated = true;

        if (data.Nome === '') {
            setNameError(true);
            validated = false;
        }

        if (data.CPF === '') {
            setCpfError(true);
            setCpfMessage("CPF é obrigatório")
        } else {
            validated = validate_cpf();
        }

        if (data.Email !== '') {
            if (!validateEmail(data.Email)) {
                setEmailError(true);
                validated = false;
            }
        }

        return validated;
    }

    function backToHome() {
        history.push('/');
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <form onSubmit={handleSubmit} className="userContainer" >
            <Alert open={open} onClose={handleClose} message={message} severity={severity}/>
            <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                value={name}
                error={nameError}
                classes={{ root: 'fields' }}
                onChange={e => setName(e.target.value)} />
            <label className={nameError ? "showLabelError" : "labelError"}>Nome é obrigatório</label>


            <TextField
                id="outlined-basic"
                label="CPF"
                variant="outlined"
                value={cpf}
                className="fields"
                error={cpfError}
                onChange={e => setCPF(cpfMask(e.target.value))} />
            <label className={cpfError ? "showLabelError" : "labelError"}>{cpfMessageError}</label>

            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                className="fields"
                error={emailError}
                onChange={e => setEmail(e.target.value)} />
            <label className={emailError ? "showLabelError" : "labelError"}>E-mail inválido</label>

            <TextField
                id="outlined-basic"
                label="Telefone"
                variant="outlined"
                value={phone}
                className="fields"
                onChange={e => setPhone(phoneMask(e.target.value))} />
            <label className="labelError">Telefone inválido</label>

            <FormControl variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">Sexo</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    onChange={e => setGender(e.target.value)}
                    value={gender}
                    label="Sexo"
                >
                    <MenuItem value={9}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Não sabe</MenuItem>
                    <MenuItem value={1}>Masculino</MenuItem>
                    <MenuItem value={2}>Feminino</MenuItem>
                    <MenuItem value={9}>Não especificado</MenuItem>
                </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DD/MM/YYYY"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data de Nascimento"
                    value={dtNascimento}
                    onChange={e => setDtNascimento(e)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            <div>
                <input type="submit" value="Salvar" className="saveButton"></input>
                <button
                    type="button"
                    className="backButton"
                    onClick={backToHome}>Voltar</button>
            </div>


        </form>
    )
}