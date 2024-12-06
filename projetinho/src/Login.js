import React from "react";
import axios from "axios";
import {
    Alert,
    Box,
    Button,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";

export default function Login(props) {
    const [username, setUsername] = React.useState("");
    const [passwd, setPasswd] = React.useState("");
    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");



    async function enviaLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post("/login", {
                username: username,
                password: passwd,
            });
            if (response.status >= 200 && response.status < 300) { //
                // Salva o token JWT na sessão
				localStorage.setItem("token", response.data.token);
				// seta o estado do login caso tudo deu certo
				props.handleLogin(true);
				console.log(props.user);
			} else {
				// falha
                console.error("Falha na autenticação");
            }
        } catch (error) {
            console.error(error);
            setOpenMessage(true);
            setMessageText("Falha ao logar usuário!");
            setMessageSeverity("error");
        }
    }

    function cancelaLogin() {
        setUsername("");
        setPasswd("");
        setOpenMessage(true);
        setMessageText("Login cancelado!");
        setMessageSeverity("warning");
    }

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }

    const isFormValid = username.trim() !== "" && passwd.trim() !== "";  //olha ignorando os espaços em branco

    return (
        <Box
            sx={{
                width: '90vw',
                height: '90vh',
                margin: 'auto',
                position: 'fixed',
                top: '10vh',
                left: '10vw',
                border: '4px solid black',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
            }}
        >
            <h1>Tela de Login</h1>
            <Stack spacing={2} sx={{ width: '60%' }}>
                <TextField
                    required
                    id="username-input"
                    label="Usuário"
                    size="medium"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    required
                    id="passwd-input"
                    label="Senha"
                    type="password"
                    size="medium"
                    value={passwd}
                    onChange={(event) => setPasswd(event.target.value)}
                />
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={enviaLogin}
                        disabled={!isFormValid}   //olha se tao vazio
                        sx={{ width: '100px', fontSize: '1rem' }}
                    >
                        Enviar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={cancelaLogin}
                        sx={{ width: '100px', fontSize: '1rem' }}
                    >
                        Cancelar
                    </Button>
                </Stack>

                <Button
                        variant="outlined"
                        color="error"
                        onClick={cancelaLogin}
                        sx={{ width: '100px', fontSize: '1rem' }}
                    >
                        Debug:logar
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={cancelaLogin}
                        sx={{ width: '100px', fontSize: '1rem' }}
                    >
                        Debug:Deslogar
                    </Button>


                    <Button
                        variant="outlined"
                        color="error"
                        onClick={cancelaLogin}
                        sx={{ width: '100px', fontSize: '1rem' }}
                    >
                        Debug:virarAdm
                    </Button>


                    <Button
                        variant="outlined"
                        color="error"
                        onClick={cancelaLogin}
                        sx={{ width: '100px', fontSize: '1rem' }}
                    >
                        Debug:desviarAdm
                    </Button>
                



            </Stack>
            <Snackbar
                open={openMessage}
                autoHideDuration={6000}
                onClose={handleCloseMessage}
            >
                <Alert severity={messageSeverity} onClose={handleCloseMessage}>
                    {messageText}
                </Alert>
            </Snackbar>
        </Box>
    );
}
