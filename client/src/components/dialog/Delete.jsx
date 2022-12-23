import React, { Component } from 'react'
import {
    Dialog,
    DialogActions,
    DialogTitle,
    Button,
    DialogContentText,
} from '@mui/material'
export default class Delete extends Component {
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.openDelete || this.props.openLock}
                    onClose={this.props.handleCloseDelete}
                    fullWidth={true}
                >
                    <DialogTitle
                        color={
                            this.props.openLock &&
                            this.props.userStatus === 'Không hoạt động'
                                ? 'success'
                                : 'error'
                        }
                    >
                        Xác nhận{' '}
                        {this.props.openDelete
                            ? 'xoá'
                            : this.props.openLock &&
                              this.props.userStatus === 'Không hoạt động'
                            ? 'kích hoạt'
                            : 'khoá'}{' '}
                        tài khoản {this.props.username}
                    </DialogTitle>
                    <DialogContentText align="center">
                        <b>
                            Bạn có muốn chắc chắn{' '}
                            {this.props.openDelete
                                ? 'xoá'
                                : this.props.openLock &&
                                  this.props.userStatus === 'Không hoạt động'
                                ? 'kích hoạt'
                                : 'khoá'}{' '}
                            tài khoản này, hành động này sẽ khiến người dùng{' '}
                            {this.props.openLock &&
                            this.props.userStatus === 'Không hoạt động'
                                ? 'có'
                                : 'không'}{' '}
                            thể truy cập vào hệ thống!
                        </b>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={this.props.handleCloseDelete}>
                            Huỷ
                        </Button>
                        <Button
                            variant="contained"
                            color={
                                this.props.openLock &&
                                this.props.userStatus === 'Không hoạt động'
                                    ? 'success'
                                    : 'error'
                            }
                            onClick={() => {
                                if (this.props.openDelete) {
                                    this.props.deleteUser({
                                        id: this.props.id,
                                    })
                                } else if (
                                    this.props.openLock &&
                                    this.props.userStatus === 'Không hoạt động'
                                ) {
                                    this.props.updateUser({
                                        id: this.props.id,
                                        username: this.props.username,
                                        password: this.props.password,
                                        dateOfBirth: this.props.dateOfBirth,
                                        userStatus: 'Hoạt động',
                                    })
                                } else if (
                                    this.props.openLock &&
                                    this.props.userStatus === 'Hoạt động'
                                ) {
                                    this.props.updateUser({
                                        id: this.props.id,
                                        username: this.props.username,
                                        password: this.props.password,
                                        dateOfBirth: this.props.dateOfBirth,
                                        userStatus: 'Không hoạt động',
                                    })
                                }
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
