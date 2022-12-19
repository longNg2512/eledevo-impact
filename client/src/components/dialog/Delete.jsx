import React, { Component } from 'react'

import {
    Dialog,
    DialogActions,
    DialogTitle,
    Button,
    DialogContentText,
} from '@mui/material'

export default class Delete extends Component {
    state = {
        openDelete: false,
        id: '',
    }

    componentDidUpdate() {
        if (
            this.props.openDelete !== this.state.openDelete ||
            this.props.id !== this.state.id
        ) {
            this.setState({
                openDelete: this.props.openDelete,
                id: this.props.id,
            })
        }
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.openDelete}
                    onClose={this.props.handleCloseDelete}
                >
                    <DialogTitle color={"error"}>
                        Xác nhận xoá tài khoản {this.props.username}
                    </DialogTitle>
                    <DialogContentText align="center">
                        <b>
                            Bạn có muốn chắc chắn xoá tài khoản này, hành động
                            này sẽ khiến người dùng không thể truy cập vào hệ
                            thống!
                        </b>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={this.props.handleCloseDelete}>
                            Huỷ
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                this.props.deleteUser({
                                    id: this.state.id,
                                })
                                this.props.handleCloseDelete()
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
