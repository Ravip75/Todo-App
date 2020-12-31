import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.delete('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));
            this.props.history.push("/");
    }
    render(){
        return(
            <p>Task deleted</p>
        )
    }
}