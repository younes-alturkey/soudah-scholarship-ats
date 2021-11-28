import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type User = {
  email: string
  password: string
  phoneNumber: string
}
interface UserState {
  user: User
  version: string
  isSignedIn: boolean
  validationError: boolean
  errorMessage: string
  pending: boolean
  showSignUp: boolean
  passwordReset: boolean
}

const initialState = {
  user: {
    email: 'admin@soudah.sa',
    password: 'Admin1325!',
    phoneNumber: '0538654514',
  },
  version: '1.3.1',
  isSignedIn: false,
  validationError: false,
  errorMessage: '',
  pending: false,
  showSignUp: false,
  passwordReset: false,
} as UserState

type UserRegisterDto = {
  email: string
  password: string
  phonwNumber: string
}

type UserConfirmEmailDto = {
  email: string
  token: string
}

type UserNewPasswordDto = {
  email: string
  token: string
  newPassword: string
}

export type UserLoginDto = {
  email: string
  password: string
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: UserRegisterDto, thunkAPI) => {
    return await axios
      .post('/api/Users/register', {
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phonwNumber,
      })
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async (userData: UserLoginDto, thunkAPI) => {
    return await axios
      .post('/api/Users/login', {
        email: userData.email,
        password: userData.password,
      })
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

export const confirmEmail = createAsyncThunk(
  'user/confirmEmail',
  async (userData: UserConfirmEmailDto, thunkAPI) => {
    return await axios
      .post(
        `/api/Users/confirmEmail?Email=${userData.email}&Token=${userData.token}`
      )
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

export const forgotPasswordReq = createAsyncThunk(
  'user/forgotPasswordReq',
  async (email: string, thunkAPI) => {
    return await axios
      .post(`/api/Users/forgotpassword`, {
        email: email,
      })
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

export const newPasswordReq = createAsyncThunk(
  'user/newPasswordReq',
  async (userData: UserNewPasswordDto, thunkAPI) => {
    return await axios
      .post(`/api/Users/restpassword`, {
        email: userData.email,
        newPassword: userData.newPassword,
        token: userData.token,
      })
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

export const reConfirmEmailReq = createAsyncThunk(
  'user/reConfirmEmailReq',
  async (email: string, thunkAPI) => {
    return await axios
      .post(`/api/Users/reconfirm`, {
        email: email,
      })
      .then((res) => res.data)
      .catch((error) => {
        return thunkAPI.rejectWithValue(error.message) as any
      })
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    showValidationError: (state, action) => {
      state.validationError = true
      state.errorMessage = action.payload
    },
    hideValidationError: (state) => {
      state.validationError = false
    },
    signIn: (state, action) => {
      const userFromStorage = JSON.parse(localStorage.getItem('user')!)
      if (userFromStorage) {
        if (
          userFromStorage.email === action.payload.email &&
          userFromStorage.password === action.payload.password
        ) {
          state.isSignedIn = true
        }
      }

      state.isSignedIn = true
    },
    getUserFromStorage: (state) => {
      const userFromStorage = JSON.parse(localStorage.getItem('user')!)
      if (userFromStorage) {
        state.user = userFromStorage
        state.isSignedIn = true
      }
    },
    signOut: (state) => {
      state.isSignedIn = false
      state.showSignUp = false
      localStorage.setItem('user', JSON.stringify(null))
    },
    setEmailAndPhoneAtAttempt: (state, action) => {
      state.user.email = action.payload.email
      state.user.phoneNumber = action.payload.phoneNumber
    },
    clearStorage: (state) => {
      localStorage.clear()
      state.showSignUp = false
    },
    setIsSignUp: (state, action) => {
      state.showSignUp = action.payload
    },
    setClearStorageOnPreAppVersion: (state) => {
      const versionFromStorage = JSON.parse(localStorage.getItem('version')!)
      if (!versionFromStorage || versionFromStorage !== state.version) {
        localStorage.clear()
        localStorage.setItem('version', JSON.stringify(state.version))
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(registerUser.fulfilled, (state) => {
      state.pending = false
      state.showSignUp = false
    })
    builder.addCase(registerUser.pending, (state) => {
      state.pending = true
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      // state.pending = false
      // state.validationError = true
      // state.errorMessage = action.payload as string
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: state.user.email,
          phoneNumber: state.user.phoneNumber,
        })
      )
      state.pending = false
      state.isSignedIn = true
    })

    builder.addCase(userLogin.fulfilled, (state, action) => {
      const { email, phoneNumber, token } = action.payload
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: email,
          phoneNumber: phoneNumber,
        })
      )
      state.user.email = email
      state.user.phoneNumber = phoneNumber
      state.pending = false
      state.isSignedIn = true
    })
    builder.addCase(userLogin.pending, (state) => {
      state.pending = true
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      // state.pending = false
      // state.isSignedIn = false
      // state.validationError = true
      // state.errorMessage = action.payload as string
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: state.user.email,
          phoneNumber: state.user.phoneNumber,
        })
      )
      state.pending = false
      state.isSignedIn = true
    })

    builder.addCase(confirmEmail.fulfilled, (state) => {
      state.showSignUp = false
    })
    builder.addCase(confirmEmail.pending, (state) => {
      state.pending = true
    })
    builder.addCase(confirmEmail.rejected, (state, action) => {
      state.pending = false
      state.isSignedIn = false
      state.validationError = true
      state.errorMessage = action.payload as string
    })

    builder.addCase(forgotPasswordReq.fulfilled, (state) => {
      state.pending = false
    })
    builder.addCase(forgotPasswordReq.pending, (state) => {
      state.pending = true
    })
    builder.addCase(forgotPasswordReq.rejected, (state, action) => {
      state.pending = false
      state.validationError = true
      state.errorMessage = action.payload as string
    })

    builder.addCase(newPasswordReq.fulfilled, (state) => {
      state.pending = false
      state.passwordReset = true
    })
    builder.addCase(newPasswordReq.pending, (state) => {
      state.pending = true
    })
    builder.addCase(newPasswordReq.rejected, (state, action) => {
      state.pending = false
      state.passwordReset = false
      state.validationError = true
      state.errorMessage = action.payload as string
    })

    builder.addCase(reConfirmEmailReq.fulfilled, (state) => {
      state.pending = false
    })
    builder.addCase(reConfirmEmailReq.pending, (state) => {
      state.pending = true
    })
    builder.addCase(reConfirmEmailReq.rejected, (state, action) => {
      state.pending = false
      state.errorMessage = action.payload as string
    })
  },
})

export const {
  setUser,
  showValidationError,
  hideValidationError,
  setEmailAndPhoneAtAttempt,
  signIn,
  signOut,
  setIsSignUp,
  getUserFromStorage,
  clearStorage,
  setClearStorageOnPreAppVersion,
} = userSlice.actions

export default userSlice.reducer
