package com.artgallery.ui.auth

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.artgallery.core.TAG
import com.artgallery.userPreferences.UserPreferences
import com.artgallery.auth.AuthRepository
import com.artgallery.ui.MyApplication
import com.artgallery.userPreferences.UserPreferencesRepository
import kotlinx.coroutines.launch

data class LoginUiState(
    val isAuthenticating: Boolean = false,
    val authenticationError: Throwable? = null,
    val authenticationCompleted: Boolean = false,
    val token: String = ""
)

class LoginViewModel(
    private val authRepository: AuthRepository,
    private val userPreferencesRepository: UserPreferencesRepository
) : ViewModel() {
    var uiState: LoginUiState by mutableStateOf(LoginUiState())

    init {
        Log.d(TAG, "init")
    }

    fun login(usernameOrEmail: String, password: String) {
        viewModelScope.launch {
            Log.v(TAG, "login...");
            uiState = uiState.copy(isAuthenticating = true, authenticationError = null)
            val result = authRepository.login(usernameOrEmail, password)
            uiState = if (result.isSuccess) {
                userPreferencesRepository.save(
                    UserPreferences(
                        result.getOrNull()?.user,
                        result.getOrNull()?.token ?: ""
                    )
                )
                uiState.copy(isAuthenticating = false, authenticationCompleted = true)
            } else {
                uiState.copy(
                    isAuthenticating = false,
                    authenticationError = result.exceptionOrNull()
                )
            }
        }
    }

    companion object {
        val Factory: ViewModelProvider.Factory = viewModelFactory {
            initializer {
                val app =
                    (this[ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY] as MyApplication)
                LoginViewModel(
                    app.container.authRepository,
                    app.container.userPreferencesRepository
                )
            }
        }
    }
}