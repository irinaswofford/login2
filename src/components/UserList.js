import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
class UserList extends Component {
    constructor(props) {

        super(props);
        this.state = { data: [] };
        this.fetchUsers = this.fetchUsers.bind(this);
    };

    componentDidMount() {
        this.fetchUsers()
    }

    async fetchUsers() {

        try {
            const response = await fetch('db.json');
            const json = await response.json();
            let users = json["users"];
            this.setState({ data: users });
            if (!response.ok) {
                throw Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <div>
                <TopBar />
                <div className="container">
                    <div className="row">
                        <button onClick={e => this.props.history.goBack()} style={{ marginTop: 40 }}>Back</button>
                    </div>
                    <div className="row">
                        <div className="col-xs-12  col-md-3 containerMenuUI_col">
                            FirstName
                        </div>
                        <div className="col-xs-12  col-md-3 containerMenuUI_col">
                            LastName
                        </div>
                        <div className="col-xs-12 col-md-3 containerMenuUI_col">
                            Email
                        </div>
                        <div className="col-xs-12 col-md-3 containerMenuUI_col">
                            Phone
                        </div>
                    </div>

                    {this.state.data.map((user, index) => {
                        return (
                            <div key={`user_${index}`} className="row">
                                <div className="col-xs-12  col-md-3 containerMenuUI_col">
                                    <Link to={{ pathname: `/users/${user.login.uuid}` }}>{user.name.first}</Link>
                                </div>
                                <div className="col-xs-12  col-md-3 containerMenuUI_col">
                                    <Link to={{ pathname: `/users/${user.login.uuid}` }}>{user.name.last}</Link>
                                </div>
                                <div className="col-xs-12  col-md-3 containerMenuUI_col">
                                    <Link to={{ pathname: `/users/${user.login.uuid}` }}>{user.email}</Link>
                                </div>
                                <div className="col-xs-12  col-md-3 containerMenuUI_col">
                                    <Link to={{ pathname: `/users/${user.login.uuid}` }}>  {user.phone}</Link>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        )
    }
}

export default UserList