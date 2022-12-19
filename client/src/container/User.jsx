import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserComponent from '../components/User'
import * as actions from '../actions/actions'

class User extends Component {
    render() {
        return (
            <div>
                <UserComponent {...this.props} />
            </div>
        )
    }
    componentDidMount() {
        this.props.paginationUser(1)
    }
}

const mapStateToProps = state => ({
    listUser: state.userReducer.listUser,
    totalPage: state.userReducer.totalPage,
    activePage: state.userReducer.activePage,
    skip: state.userReducer.skip,
    message: state.userReducer.message,
    textSearch: state.userReducer.textSearch,
})

const mapDispatchToProps = dispatch => ({
    paginationUser: data => {
        dispatch(actions.paginationUserRequest(data))
    },
    registerUser: data => {
        dispatch(actions.registerUserRequest(data))
    },
    searchPaginationUser: data => {
        dispatch(actions.searchPaginationUserRequest(data))
    },
    updateUser: data => {
        dispatch(actions.updateUserRequest(data))
    },
    deleteUser: data => {
        dispatch(actions.deleteUserRequest(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
