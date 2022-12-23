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
    Alert,
} from '@mui/material'
import {
    Visibility,
    VisibilityOff,
    Add,
    EditRounded,
} from '@mui/icons-material'
import moment from 'moment'
export default class Update extends Component {
    state = {
        showPassword: false,
        id: '',
        username: '',
        password: '',
        dateOfBirth: moment().format('YYYY-MM-DD'),
        userStatus: '',
        alertMessage: '',
        openAlert: 'none',
    }

    componentDidUpdate() {
        if (this.props.id !== this.state.id) {
            this.setState({
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

    handleClickOpenAlert = () => {
        this.setState({ openAlert: '' })
    }

    handleCloseAlert = () => {
        this.setState({ openAlert: 'none' })
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: this.state.showPassword ? false : true })
    }

    render() {
        return (
            <div>
                <Dialog
                    open={
                        this.props.openUpdate ||
                        this.props.openRead ||
                        this.props.openCreate
                    }
                    onClose={() => {
                        this.props.handleCloseUpdate()
                        this.handleCloseAlert()
                    }}
                >
                    <DialogTitle>{this.props.dialogName}</DialogTitle>
                    <DialogContent>
                        <FormControl
                            sx={{ m: 1, width: '95%' }}
                            variant="standard"
                        >
                            <InputLabel>Tên đăng nhập *</InputLabel>
                            <Input
                                autoFocus
                                id="username"
                                type={'text'}
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeInput}
                                disabled={this.props.openCreate ? false : true}
                            />
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: '95%' }}
                            variant="standard"
                        >
                            <InputLabel>Mật Khẩu *</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangeInput}
                                disabled={this.props.openRead ? true : false}
                                type={
                                    this.state.showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                this.handleClickShowPassword
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
                            sx={{ m: 1, width: '95%' }}
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
                                disabled={this.props.openRead ? true : false}
                            />
                        </FormControl>

                        <FormControl
                            sx={{
                                m: 1,
                                width: '95%',
                                display: this.props.openCreate
                                    ? 'none'
                                    : 'flex',
                            }}
                            variant="standard"
                        >
                            <InputLabel>Trạng thái</InputLabel>
                            <Select
                                name="userStatus"
                                value={this.state.userStatus}
                                onChange={this.onChangeInput}
                                label="Age"
                                disabled={this.props.openRead ? true : false}
                            >
                                <MenuItem value={'Hoạt động'}>
                                    Hoạt động
                                </MenuItem>
                                <MenuItem value={'Không hoạt động'}>
                                    Không hoạt động
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Alert
                            severity="error"
                            style={{ display: this.state.openAlert }}
                        >
                            {this.state.alertMessage}
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCloseUpdate}>
                            Đóng
                        </Button>
                        <Button
                            style={{
                                display: this.props.openRead ? 'none' : 'flex',
                            }}
                            endIcon={
                                this.props.openCreate ? (
                                    <Add />
                                ) : (
                                    <EditRounded />
                                )
                            }
                            variant="contained"
                            color="success"
                            type="submit"
                            onClick={() => {
                                if (!this.state.username) {
                                    this.setState({
                                        alertMessage:
                                            'Vui lòng nhập tên đăng nhập !',
                                    })
                                    this.handleClickOpenAlert()
                                } else if (!this.state.password) {
                                    this.setState({
                                        alertMessage:
                                            'Vui lòng nhập mật khẩu !',
                                    })
                                    this.handleClickOpenAlert()
                                } else if (
                                    this.state.username &&
                                    this.state.password &&
                                    !this.state.id
                                ) {
                                    this.props.registerUser({
                                        username: this.state.username,
                                        password: this.state.password,
                                        dateOfBirth: this.state.dateOfBirth,
                                        userStatus: 'Hoạt động',
                                    })
                                    this.props.handleCloseUpdate()
                                } else if (
                                    this.state.username &&
                                    this.state.password &&
                                    this.state.id
                                ) {
                                    this.props.updateUser({
                                        id: this.state.id,
                                        username: this.state.username,
                                        password: this.state.password,
                                        dateOfBirth: this.state.dateOfBirth,
                                        userStatus: this.state.userStatus,
                                    })
                                    this.props.handleCloseUpdate()
                                }
                            }}
                        >
                            {this.props.dialogName}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
