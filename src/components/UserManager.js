import React, { Component } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

class UserManager extends Component {
  constructor(props) {
    super(props);

    const users = JSON.parse(localStorage.getItem("GG.UserList.Users")) || [];

    this.state = {
      users,
      editing: false,
      userToEdit: null,
    };

    this.handleUserFormCancel = this.handleUserFormCancel.bind(this);
    this.handleUserFormUpdate = this.handleUserFormUpdate.bind(this);
    this.handleUserFormAdd = this.handleUserFormAdd.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  saveUsers(users){
    localStorage.setItem("GG.UserList.Users", JSON.stringify(users));
  }

  handleAddUser() {
    this.setState({editing: true, userToEdit: null});
  }

  handleUserDelete(id) {
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id === id) {
        if (window.confirm(`Do you really want to delete ${this.state.users[i].name}`)) {
          const users = this.state.users.slice();
          users.splice(i, 1);

          this.saveUsers(users);
          this.setState({users});
        }
        break;
      }
    };
  }

  handleUserEdit(id) {
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].id === id) {
        const userToEdit = {...this.state.users[i]};
        this.setState({editing: true, userToEdit});
        break;
      }
    }
  }

  handleUserFormUpdate(user) {
    const users = this.state.users.slice();

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === user.id) {
        users[i] = user;
        this.saveUsers(users);
        break;
      }
    }

    this.setState({users, editing: false, userToEdit: null});
  }

  handleUserFormAdd(user) {
    let users = this.state.users.slice();

    user.id = Date.now();
    users.unshift(user);

    this.saveUsers(users);
    this.setState({users, editing: false, userToEdit: null});
  }

  handleUserFormCancel() {
    this.setState({editing: false, userToEdit: null});
  }

  render() {        

    let form = null;
    let list = null;

    if (this.state.editing) {
      if (this.state.userToEdit) {
        form = (<UserForm user={this.state.userToEdit} onUpdate={this.handleUserFormUpdate} onCancel={this.handleUserFormCancel} />);
      }
      else {
        form = (<UserForm onAdd={this.handleUserFormAdd} onCancel={this.handleUserFormCancel} />);
      }
    }
    else {
      list = (
        <div>
          <div className="row">
            <button className="btn btn-primary" type="button" onClick={this.handleAddUser}>Add User</button>
          </div>
          <UserList users={this.state.users} onUserEdit={this.handleUserEdit} onUserDelete={this.handleUserDelete}/>
        </div>
      );
    }

    return (
      <div>
        {form}
        {list}
      </div>
    );
  }
}

export default UserManager;