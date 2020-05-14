import React, { Component } from 'react';
import TopBar from './TopBar';
class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedUser: {
                "gender": "male",
                "name": {
                    "title": "Mr",
                    "first": "Levi",
                    "last": "King"
                },
                "location": {
                    "street": {
                        "number": 1947,
                        "name": "Royal Road"
                    },
                    "city": "Palmerston North",
                    "state": "Otago",
                    "country": "New Zealand",
                    "postcode": 41375,
                    "coordinates": {
                        "latitude": "-22.0905",
                        "longitude": "144.2008"
                    },
                    "timezone": {
                        "offset": "-9:00",
                        "description": "Alaska"
                    }
                },
                "email": "levi.king@example.com",
                "login": {
                    "uuid": "515243df-abbe-4497-b96d-69513c995f63",
                    "username": "blackzebra357",
                    "password": "zzzzz",
                    "salt": "8xoWE52R",
                    "md5": "71b61fdb45a75ec0221f390507ed1724",
                    "sha1": "3dbe27b58a088629f3afa93d60046d4ae2b1af37",
                    "sha256": "c612af410eadfa7c7399bbbbd4e6972ae93c246e21006f0f562362474c12d214"
                },
                "dob": {
                    "date": "1994-09-06T23:13:19.431Z",
                    "age": 25
                },
                "registered": {
                    "date": "2019-05-08T00:58:08.785Z",
                    "age": 0
                },
                "phone": "(554)-989-6980",
                "cell": "(993)-286-4909",
                "id": {
                    "name": "",
                    "value": null
                },
                "picture": {
                    "large": "https://randomuser.me/api/portraits/men/8.jpg",
                    "medium": "https://randomuser.me/api/portraits/med/men/8.jpg",
                    "thumbnail": "https://randomuser.me/api/portraits/thumb/men/8.jpg"
                },
                "nat": "NZ"
            }
        };

        this.fetchUsersDetails = this.fetchUsersDetails.bind(this);
    };

    async componentDidMount() {
        await this.fetchUsersDetails();
        this.state.data.forEach((user, index) => {
            // un-pack
            let user_uuid = (user["login"]["uuid"] || "").trim();
            let selectedUser_uuid = this.props.match.params.userId || "";

            // work
            if (user_uuid === selectedUser_uuid) {
                this.setState({ selectedUser: user });
                return false; // break
            }
        });
    }

    async fetchUsersDetails() {

        try {
            const response = await fetch('http://localhost:3000/db.json');
            const json = await response.json();
            let users = json["users"];
            this.setState({ data: users });
            if (!response.ok) {
                throw Error(response.statusText);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <TopBar/>
                <div className="container">
                    <button onClick={e => this.props.history.goBack()} style={{ marginTop: 40 }}>Back</button>
                    <div className="flexContainer">
                        <div sm="12" md="3" className="flexItem" >
                            <img src={this.state.selectedUser.picture.large} alt="user"></img>
                            <div style={{ paddingLeft: 5 }}>
                                <div> {this.state.selectedUser.name.first} {this.state.selectedUser.name.last}</div>
                                <div> {this.state.selectedUser.email}</div>
                                <div> {this.state.selectedUser.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDetail