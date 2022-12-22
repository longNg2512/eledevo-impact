import React, { Component } from 'react'
import moment from 'moment'
import UpdateDialog from './dialog/Update'
import DeleteDialog from './dialog/Delete'
import LockDialog from './dialog/Lock'
import * as style from './style'
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
    Pagination,
    Stack,
    Box,
    TextField,
    Button,
    Alert,
    CircularProgress,
} from '@mui/material'
import {
    Circle,
    CircleOutlined,
    Lock,
    LockOpen,
    PersonSearch,
    DeleteForeverRounded,
    VisibilityRounded,
    EditRounded,
    Add,
} from '@mui/icons-material'

export default class User extends Component {
    state = {
        openCreate: false,
        openUpdate: false,
        openDelete: false,
        openRead: false,
        openLock: false,
        textSearch: '',
        id: '',
        username: '',
        password: '',
        userStatus: '',
        dateOfBirth: moment().format('YYYY-MM-DD'),
        dialogName: '',
    }

    handleClickOpenCreate = () => {
        this.setState({ openCreate: true })
    }

    handleClickOpenUpdate = () => {
        this.setState({ openUpdate: true })
    }

    handleCloseUpdate = () => {
        this.setState({
            openUpdate: false,
            openRead: false,
            openCreate: false,
            id: '',
            username: '',
            password: '',
            userStatus: '',
            dateOfBirth: moment().format('YYYY-MM-DD'),
            dialogName: '',
            showPassword: false,
        })
    }

    handleClickOpenDelete = () => {
        this.setState({ openDelete: true })
    }

    handleCloseDelete = () => {
        this.setState({ openDelete: false })
    }

    handleClickOpenRead = () => {
        this.setState({ openRead: true })
    }

    handleClickOpenLock = () => {
        this.setState({ openLock: true })
    }

    handleCloseLock = () => {
        this.setState({ openLock: false })
    }

    onChangeInput = e =>
        this.setState({
            [e.target.name]: e.target.value,
        })

    render() {
        let userItem = []
        if (this.props.listUser) {
            userItem = this.props.listUser.map((user, index) => {
                return (
                    <style.StyledTableRow key={user._id}>
                        <style.StyledTableCell align="center">
                            {index + 1 + this.props.skip}
                        </style.StyledTableCell>
                        <style.StyledTableCell align="center">
                            {user.username}
                        </style.StyledTableCell>
                        <style.StyledTableCell align="center">
                            {moment(user.createdAt).format(
                                'DD/MM/YYYY HH:mm:ss',
                            )}
                        </style.StyledTableCell>
                        <style.StyledTableCell align="center">
                            <Button
                                color={
                                    user.userStatus === 'Hoạt động'
                                        ? 'success'
                                        : 'error'
                                }
                            >
                                {user.userStatus === 'Hoạt động' ? (
                                    <Circle sx={{ mr: 1, my: 0.5 }} />
                                ) : (
                                    <CircleOutlined sx={{ mr: 1, my: 0.5 }} />
                                )}
                                {user.userStatus}
                            </Button>
                        </style.StyledTableCell>
                        <style.StyledTableCell align="center">
                            <VisibilityRounded
                                sx={{ mr: 2, my: 0.5 }}
                                onClick={() => {
                                    this.setState({
                                        id: user._id,
                                        username: user.username,
                                        password: user.password,
                                        dateOfBirth: user.dateOfBirth,
                                        userStatus: user.userStatus,
                                        dialogName: 'Xem tài khoản',
                                    })
                                    this.handleClickOpenRead()
                                }}
                            />
                            <EditRounded
                                sx={{ mr: 2, my: 0.5 }}
                                color="primary"
                                onClick={() => {
                                    this.setState({
                                        id: user._id,
                                        username: user.username,
                                        password: user.password,
                                        dateOfBirth: user.dateOfBirth,
                                        userStatus: user.userStatus,
                                        dialogName: 'Sửa tài khoản',
                                    })
                                    this.handleClickOpenUpdate()
                                }}
                            />
                            {user.userStatus === 'Hoạt động' ? (
                                <LockOpen
                                    sx={{ mr: 2, my: 0.5 }}
                                    color="secondary"
                                    onClick={() => {
                                        this.setState({
                                            id: user._id,
                                            username: user.username,
                                            password: user.password,
                                            dateOfBirth: user.dateOfBirth,
                                            userStatus: user.userStatus,
                                            dialogName: 'Khoá tài khoản',
                                        })
                                        this.handleClickOpenLock()
                                    }}
                                />
                            ) : (
                                <Lock
                                    sx={{ mr: 2, my: 0.5 }}
                                    color="secondary"
                                    onClick={() => {
                                        this.setState({
                                            id: user._id,
                                            username: user.username,
                                            password: user.password,
                                            dateOfBirth: user.dateOfBirth,
                                            userStatus: user.userStatus,
                                            dialogName: 'Khoá tài khoản',
                                        })
                                        this.handleClickOpenLock()
                                    }}
                                />
                            )}
                            <DeleteForeverRounded
                                sx={{ color: 'red', mr: 0, my: 0.5 }}
                                onClick={() => {
                                    this.setState({
                                        id: user._id,
                                        username: user.username,
                                        dialogName: 'Xoá tài khoản',
                                    })
                                    this.handleClickOpenDelete()
                                }}
                            />
                        </style.StyledTableCell>
                    </style.StyledTableRow>
                )
            })
        }

        if (this.props.isLoading) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress size={100} />
                </Box>
            )
        } else {
            return (
                <div>
                    <div>
                        <UpdateDialog
                            openUpdate={this.state.openUpdate}
                            openCreate={this.state.openCreate}
                            openRead={this.state.openRead}
                            id={this.state.id}
                            username={this.state.username}
                            password={this.state.password}
                            dateOfBirth={this.state.dateOfBirth}
                            userStatus={this.state.userStatus}
                            dialogName={this.state.dialogName}
                            handleCloseUpdate={this.handleCloseUpdate}
                            updateUser={this.props.updateUser}
                            registerUser={this.props.registerUser}
                        />

                        <DeleteDialog
                            username={this.state.username}
                            id={this.state.id}
                            handleClickOpenDelete={this.handleClickOpenDelete}
                            handleCloseDelete={this.handleCloseDelete}
                            openDelete={this.state.openDelete}
                            deleteUser={this.props.deleteUser}
                            dialogName={this.state.dialogName}
                        />

                        <LockDialog
                            id={this.state.id}
                            username={this.state.username}
                            password={this.state.password}
                            dateOfBirth={this.state.dateOfBirth}
                            userStatus={this.state.userStatus}
                            updateUser={this.props.updateUser}
                            openLock={this.state.openLock}
                            handleClickOpenLock={this.handleClickOpenLock}
                            handleCloseLock={this.handleCloseLock}
                        />
                    </div>
                    <div>
                        <div>
                            <Box
                                sx={{ display: 'flex', alignItems: 'flex-end' }}
                            >
                                <TextField
                                    id="input-with-sx"
                                    label="tìm kiếm"
                                    variant="standard"
                                    name="textSearch"
                                    value={this.state.textSearch}
                                    onChange={this.onChangeInput}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            this.props.searchPaginationUser({
                                                textSearch:
                                                    this.state.textSearch,
                                                activePage: 1,
                                            })
                                        }
                                    }}
                                />
                                <PersonSearch
                                    color={
                                        this.state.textSearch
                                            ? 'primary'
                                            : 'action'
                                    }
                                    sx={{ mr: 1, my: 0.5 }}
                                    onClick={() => {
                                        this.props.searchPaginationUser({
                                            textSearch: this.state.textSearch,
                                            activePage: 1,
                                        })
                                    }}
                                />
                                <Button
                                    style={{ left: '28em' }}
                                    variant="contained"
                                    endIcon={<Add />}
                                    onClick={() => {
                                        this.handleClickOpenCreate()
                                        // this.handleClickOpenUpdate()
                                        this.setState({
                                            dialogName: 'Thêm tài khoản',
                                        })
                                    }}
                                >
                                    Thêm tài khoản
                                </Button>
                            </Box>
                        </div>
                        <div>
                            <TableContainer
                                component={Paper}
                                className="table-main"
                                style={{ marginTop: '5vh' }}
                            >
                                <Table
                                    sx={{ minWidth: 800, border: 1 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <style.StyledTableRow>
                                            <style.StyledTableCell align="center">
                                                STT
                                            </style.StyledTableCell>
                                            <style.StyledTableCell align="center">
                                                Tên đăng nhập
                                            </style.StyledTableCell>
                                            <style.StyledTableCell align="center">
                                                Ngày tạo
                                            </style.StyledTableCell>
                                            <style.StyledTableCell align="center">
                                                Trạng thái
                                            </style.StyledTableCell>
                                            <style.StyledTableCell align="center">
                                                Thao tác
                                            </style.StyledTableCell>
                                        </style.StyledTableRow>
                                    </TableHead>
                                    <TableBody>{userItem}</TableBody>
                                </Table>
                            </TableContainer>

                            <div>
                                <Alert
                                    severity="info"
                                    variant="outlined"
                                    style={{
                                        display:
                                            this.props.listUser.length === 0
                                                ? 'flex'
                                                : 'none',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    Không có dữ liệu!
                                    <Button
                                        onClick={() => {
                                            this.handleClickOpenCreate()
                                            this.setState({
                                                dialogName: 'Thêm tài khoản',
                                            })
                                        }}
                                    >
                                        Thêm tài khoản
                                    </Button>
                                    để bắt đầu!
                                </Alert>
                                <Stack spacing={2} style={{ marginTop: '3em' }}>
                                    <Pagination
                                        style={{
                                            display:
                                                this.props.listUser.length === 0
                                                    ? 'none'
                                                    : 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        color="primary"
                                        count={this.props.totalPage}
                                        page={this.props.activePage}
                                        onChange={(event, page) => {
                                            if (
                                                page !== this.props.activePage
                                            ) {
                                                if (this.props.textSearch) {
                                                    this.props.searchPaginationUser(
                                                        {
                                                            textSearch:
                                                                this.props
                                                                    .textSearch,
                                                            activePage: page,
                                                        },
                                                    )
                                                } else {
                                                    this.props.paginationUser(
                                                        page,
                                                    )
                                                }
                                            }
                                        }}
                                    />
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
