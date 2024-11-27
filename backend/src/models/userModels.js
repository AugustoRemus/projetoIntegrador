import { users } from "../../data.js";

export async function encontrarUsuarioModelo(id){
    return users.find((user) => user.id == id);    
};

export async function listarUsuariosModelo(){
    return users;
};

export async function cadastrarUsuarioModelo(novoUsuario) {
    users.push(novoUsuario);
    return novoUsuario;
};

export async function atualizarUsuarioModelo(id, valorAtualizado, atributo){
    const user = encontrarUsuarioModelo(id);
    user[atributo] = valorAtualizado;
    return user;
};

export async function excluirUsuarioModelo(id) {
    users.splice(id, 1)[0];
};

export function filtrarUsuariosBase(){
    return users.filter(user => user.tipo == "BS");
}