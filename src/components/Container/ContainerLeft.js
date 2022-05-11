import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CLOSE_CHAT, TOKEN, UNIQUE_CHAT, UNIQUE_ROOM_CHAT, USER_LOGOUT, CLEAR_SESSION_MESSAGES } from '../../actions/types'
import setAuthToken from '../../utils/setAuthToken'
import './ContainerLeft.css'
const ContainerLeft = () => {
  const user = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: CLEAR_SESSION_MESSAGES })
    localStorage.removeItem(TOKEN);
    localStorage.setItem(UNIQUE_CHAT, JSON.stringify([]));
    localStorage.setItem(UNIQUE_ROOM_CHAT, JSON.stringify([]))
    setAuthToken(null);
    history.push('/Home')
  }
  const onLogin = () => {
    history.push('/Signin')
  }
  const onRegister = () => {
    history.push('/Signup')
  }
  return (
    <div className="container-left">
      {(user.isAuthentication) ?
        (
          <div className="user-information">
            <img className="user-avatar" alt="user-avatar" src={user.user.image} />
            <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '100%' }}>
              <label className="firstname-label" onClick={() => history.push(`/Profile/${user.user._id}`)}>
                {user.user.lastName + " " + user.user.firstName}
                <ion-icon name="create-outline" style={{ fontSize: '40px', color: '#888e86' }}></ion-icon>
              </label>
              {user.user.role === "USER" ? (
                <label className="pet-label">Thú cưng: {user.pets.length}</label>
              ) : (
                <label className="pet-label">{user.user.role}</label>
              )}
            </div>
            <button className="btn-process" name="list-pet" onClick={() => history.push('/list-pet')}>
              <label className="btn-label">
                Hồ sơ thú cưng
              </label>
              <ion-icon name="paw-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
            </button>
            <button className="btn-process" name="appointment" onClick={() => history.push('/Appointment')}>
              <label className="btn-label">
                Lịch hẹn
              </label>
              <ion-icon name="calendar-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
            </button>
            {user.user.role === "ADMIN" || user.user.role === "DOCTOR" ? (
              <button className="btn-process" name="schedule" onClick={() => history.push('/Schedule')}>
                <label className="btn-label">
                  Lịch làm việc
                </label>
                <ion-icon name="calendar-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
              </button>
            ) : null}
            {/* {user.user.role === "ADMIN" ? (
              <button className="btn-process" name="schedule" onClick={() => history.push('/Schedule')}>
                <label className="btn-label">
                  Thống kế
                </label>
                <ion-icon name="calendar-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
              </button>
            ) : null} */}
            {user.user.role === "USER" || user.user.role === "ADMIN" ? (
              <button className="btn-process" onClick={() => history.push('/list-doctor')}>
                <label className="btn-label">
                  Bác sĩ
                </label>
                <ion-icon name="person-circle" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
              </button>
            ) : null}
            {user.user.role === "DOCTOR" || user.user.role === "ADMIN" ? (
              <button className="btn-process" name="list-pet-owner" onClick={() => history.push('/list-pet-owner')}>
                <label className="btn-label">
                  Chủ vật nuôi
                </label>
                <ion-icon name="person-circle" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
              </button>
            ) : null}

            <button className="btn-process" name='facility' onClick={() => history.push('/List-facility')}>
              <label className="btn-label">
                Phòng khám
              </label>
              <ion-icon name="home-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
            </button>
            <button className="btn-process" name="document" onClick={() => history.push('/Documents')}>
              <label className="btn-label">
                Tài liệu
              </label>
              <ion-icon name="document-text-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
            </button>
            <button
              className="btn-process"
              onClick={() => history.push("/Liquidation")}
            >
              <label className="btn-label">Thanh lý</label>
              <ion-icon
                name="repeat-outline"
                style={{ fontSize: "40px", color: "#1E3A28" }}
              ></ion-icon>
            </button>
            {user.user.role === "DOCTOR" || user.user.role === "ADMIN" ? (
              <button
                className="btn-process"
                onClick={() => history.push("/Statistical")}
              >
                <label className="btn-label">Thống kê</label>
                <ion-icon
                  name="analytics-outline"
                  style={{ fontSize: "40px", color: "#1E3A28" }}
                ></ion-icon>
              </button>
            ) : null}
            {user.user.role === "ADMIN" ? (
              <button
                className="btn-process"
                onClick={() => history.push("/Manage-account")}
              >
                <label className="btn-label">Quản lý tài khoản</label>
                <ion-icon
                  name="people-circle-outline"
                  style={{ fontSize: "40px", color: "#1E3A28" }}
                ></ion-icon>
              </button>
            ) : null}
            <button className="btn-process" name="support" onClick={() => history.push('/Support')}>
              <label className="btn-label">
                Hỗ trợ
              </label>
              <ion-icon name="help-circle-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
            </button>
            <button className="btn-process" name="setting">
              <label className="btn-label">
                Cài đặt
              </label>
              <ion-icon name="settings-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
            </button>
            <button className="btn-process" name="logout" onClick={() => onLogout()}>
              <label className="btn-label">
                Đăng xuất
              </label>
              <ion-icon name="log-out-outline" style={{ fontSize: '40px', color: '#1E3A28' }}></ion-icon>
            </button>
          </div>
        ) : (
          <div className="user-information">
            <ion-icon name="person-circle-outline" style={{ fontSize: '250px' }}></ion-icon>
            <button className="btn-authentication" name="login" onClick={() => onLogin()}>
              <label className="btn-label" >
                Đăng nhập
              </label>
            </button>
            <button className="btn-authentication" name="register" onClick={() => onRegister()}>
              <label className="btn-label">
                Đăng ký
              </label>
            </button>
          </div>
        )
      }
    </div>
  )
}

export default ContainerLeft
