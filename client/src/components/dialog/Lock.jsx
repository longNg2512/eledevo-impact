import React, { Component } from 'react'

import {
    Dialog,
    DialogActions,
    DialogTitle,
    Button,
    DialogContentText,
} from '@mui/material'

export default class Lock extends Component {
    state = {
        openLock: false,
        id: '',
        username: '',
        password: '',
        dateOfBirth: '',
        userStatus: '',
    }

    componentDidUpdate() {
        if (
            this.props.openLock !== this.state.openLock ||
            this.props.id !== this.state.id
        ) {
            this.setState({
                openLock: this.props.openLock,
                id: this.props.id,
                username: this.props.username,
                password: this.props.password,
                dateOfBirth: this.props.dateOfBirth,
                userStatus: this.props.userStatus,
            })
        }
    }

    render() {
        const lockText = 'khoá'
        if (this.state.userStatus === 'Hoạt động') {
            return (
                <div>
                    <Dialog
                        open={this.state.openLock}
                        onClose={this.props.handleCloseLock}
                    >
                        <DialogTitle color={'error'}>
                            Xác nhận khoá tài khoản {this.props.username}
                        </DialogTitle>
                        <DialogContentText align="center">
                            <b>
                                Bạn có muốn chắc chắn {lockText} tài khoản này,
                                hành động này sẽ khiến người dùng không thể truy
                                cập vào hệ thống!
                            </b>
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={this.props.handleCloseLock}>
                                Huỷ
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    this.props.updateUser({
                                        id: this.state.id,
                                        username: this.state.username,
                                        password: this.state.password,
                                        dateOfBirth: this.state.dateOfBirth,
                                        userStatus: 'Không hoạt động',
                                    })
                                    this.props.handleCloseLock()
                                }}
                            >
                                Xác nhận
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        } else {
            return (
                <div>
                    <Dialog
                        open={this.state.openLock}
                        onClose={this.props.handleCloseLock}
                    >
                        <DialogTitle color="success">
                            Xác nhận kích hoạt tài khoản {this.props.username}
                        </DialogTitle>
                        <DialogContentText align="center">
                            <b>
                                Bạn có muốn chắc chắn kích hoạt tài khoản này,
                                hành động này sẽ khiến người dùng có thể truy
                                cập vào hệ thống!
                            </b>
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={this.props.handleCloseLock}>
                                Huỷ
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    this.props.updateUser({
                                        id: this.state.id,
                                        username: this.state.username,
                                        password: this.state.password,
                                        dateOfBirth: this.state.dateOfBirth,
                                        userStatus: 'Hoạt động',
                                    })
                                    this.props.handleCloseLock()
                                }}
                            >
                                Xác nhận
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        }
    }
}
