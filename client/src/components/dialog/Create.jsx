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
    Alert,
} from '@mui/material'
import { Add, Visibility, VisibilityOff } from '@mui/icons-material'
import moment from 'moment'
import { LoadingButton } from '@mui/lab'

export default class Create extends Component {
    state = {
        openCreate: false,
        openAlert: 'none',
        showPassword: false,
        openLoading: false,
        username: '',
        password: '',
        dateOfBirth: moment().format('YYYY-MM-DD'),
        alertMessage: '',
    }

    handleClickOpenAlert = () => {
        this.setState({ openAlert: '' })
    }

    handleCloseAlert = () => {
        this.setState({ openAlert: 'none' })
    }

    handleClearState = () =>
        this.setState({
            openAlert: 'none',
            showPassword: false,
            openLoading: false,
            username: '',
            password: '',
            dateOfBirth: moment().format('YYYY-MM-DD'),
            alertMessage: '',
        })

    componentDidUpdate() {
        if (
            this.props.openCreate !== this.state.openCreate ||
            this.props.showPassword !== this.state.showPassword
        ) {
            this.setState({
                openCreate: this.props.openCreate,
                showPassword: this.props.showPassword,
            })
        }
    }

    onChangeInput = e =>
        this.setState({
            [e.target.name]: e.target.value,
        })

    handleShowAlert = (type, message) => {
        setTimeout(() => {
            document.getElementById('alert-1').style.display = 'none'
        }, 5000)
        return (
            <Alert id="alert-1" severity={type} style={{ display: 'flex' }}>
                {message}
            </Alert>
        )
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.openCreate}
                    onClose={() => {
                        this.props.handleCloseCreate()
                        this.handleClearState()
                    }}
                >
                    <DialogTitle>{this.props.dialogName}</DialogTitle>
                    <DialogContent>
                        <FormControl
                            sx={{ m: 1, width: '65ch' }}
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
                                required
                            />
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: '65ch' }}
                            variant="standard"
                        >
                            <InputLabel>Mật khẩu *</InputLabel>
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
                                name="dateOfBirth"
                                value={this.state.dateOfBirth}
                                onChange={this.onChangeInput}
                            />
                        </FormControl>
                        <Alert
                            severity="error"
                            style={{ display: this.state.openAlert }}
                        >
                            {this.state.alertMessage}
                        </Alert>

                        {this.props.createSuccess
                            ? this.handleShowAlert(
                                  'success',
                                  `${this.props.dialogName} thành công !`,
                              )
                            : null}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                this.props.handleCloseCreate()
                                this.handleClearState()
                            }}
                        >
                            Đóng
                        </Button>
                        <LoadingButton
                            endIcon={<Add />}
                            loading={this.props.createLoading ? true : false}
                            loadingPosition="end"
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
                                    this.state.password
                                ) {
                                    this.props.registerUser({
                                        username: this.state.username,
                                        password: this.state.password,
                                        dateOfBirth: this.state.dateOfBirth,
                                        userStatus: 'Hoạt động',
                                    })
                                    this.handleClearState()
                                }
                            }}
                        >
                            {this.props.dialogName}
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
