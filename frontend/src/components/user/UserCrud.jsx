import React, {Component} from "react";
import axios from 'axios'

import Main from "../template/main/Main";

const headerProps = {
    icon: 'users',
    title:"Usuários",
    subtitle: 'Cadastro de usuários: c, r, u, d'
}

const initialState = {
    user: {name:'', email:''}, 
    list: []
}

const baseUrl = 'http://localhost:3001/users'

export default class UserCrud extends Component {

    state = {...initialState}

    componentDidMount(){
        axios.get(baseUrl)
            .then(res=>{
                this.setState({list: res.data})
            })
    }

    clear(){
        this.setState({user: initialState.user})
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(res=>{
                const list = this.getUpdatedList(res.data)
                this.setState({user: initialState.user, list: list})
            })
    }

    //função meio inutil pq so ta colocando o usuário no topo da lista
    getUpdatedList(user){
        const list = this.state.list.filter(u=> u.id !== user.id)
        //coloca o usuário na primeira posição da lista
        list.unshift(user)
        return list
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome: </label>
                            <input type="text" className="form-control"
                                name="name" value={this.state.user.name}
                                onChange={e=>this.updateField(e)} placeholder="Digite um nome"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text" className="form-control"
                                name="email" value={this.state.user.email}
                                onChange={e=>this.updateField(e)} placeholder="Digite um email"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e=>this.save(e)}> {/*Passamos o evento como parametro por causa do this.lexico da arrow, caso contrário, deveríamos fazer o esquema do bind no constructor */}
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e=>this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({user})
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`)
            .then(res=>{
                const list = this.state.list.filter(u=> u !== user)
                this.setState({list})
            })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>
                            Nome:
                        </th>
                        <th>
                            Email:
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(u=>{
            return(
                <tr key={u.id}>
                    <td>
                        {u.name}
                    </td>
                    <td>
                        {u.email}
                    </td>
                    <td>
                        <button className="btn btn-warning" onClick={()=>this.load(u)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={()=>this.remove(u)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value 
        this.setState({user:user})
    }

    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}