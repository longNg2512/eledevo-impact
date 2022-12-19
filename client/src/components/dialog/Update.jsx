import React, { Component } from 'react'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    FormControl,
    InputLabel,
    InputAdornment,
    Input,
    Button,
    Select,
    MenuItem,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default class Update extends Component {
    state = {
        openUpdate: false,
        showPassword: false,
        id: '',
        username: '',
        password: '',
        dateOfBirth: '',
        userStatus: '',
    }

    componentDidUpdate() {
        if (
            this.props.openUpdate !== this.state.openUpdate ||
            this.props.showPassword !== this.state.showPassword ||
            this.props.id !== this.state.id
        ) {
            this.setState({
                openUpdate: this.props.openUpdate,
                showPassword: this.props.showPassword,
                id: this.props.id,
                username: this.props.username,
                password: this.props.password,
                dateOfBirth: this.props.dateOfBirth,
                userStatus: this.props.userStatus,
            })
        }
    }

    onChangeInput = e =>
        this.setState({
            [e.target.name]: e.target.value,
        })

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.openUpdate}
                    onClose={this.props.handleCloseUpdate}
                >
                    <DialogTitle>Sửa tài khoản</DialogTitle>
                    <DialogContent>
                        <FormControl
                            sx={{ m: 1, width: '65ch' }}
                            variant="standard"
                        >
                            <InputLabel>Tên đăng nhập *</InputLabel>
                            <Input
                                id="username"
                                type={'text'}
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeInput}
                                disabled
                            />
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: '65ch' }}
                            variant="standard"
                        >
                            <InputLabel>Mật Khẩu *</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangeInput}
                                type={
                                    this.state.showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                                this.props
                                                    .handleClickShowPassword
                                            }
                                            onMouseDown={
                                                this.props
                                                    .handleMouseDownPassword
                                            }
                                        >
                                            {this.state.showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: '65ch' }}
                            variant="standard"
                        >
                            <InputLabel shrink>Ngày sinh</InputLabel>
                            <Input
                                id="date-of-birth"
                                type={'date'}
                                style={{ textDecoration: 'none' }}
                                name="dateOfBirth"
                                value={this.state.dateOfBirth}
                                onChange={this.onChangeInput}
                            />
                        </FormControl>

                        <FormControl
                            sx={{ m: 1, width: '65ch' }}
                            variant="standard"
                        >
                            <InputLabel id="demo-simple-select-standard-label">
                                Trạng thái
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name="userStatus"
                                value={this.state.userStatus}
                                onChange={this.onChangeInput}
                                label="Age"
                            >
                                <MenuItem value={'Hoạt động'}>
                                    Hoạt động
                                </MenuItem>
                                <MenuItem value={'Không hoạt động'}>
                                    Không hoạt động
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCloseUpdate}>
                            Đóng
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
                                    userStatus: this.state.userStatus,
                                })
                                this.props.handleCloseUpdate()
                            }}
                        >
                            Cập nhật
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
