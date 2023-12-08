package com.artgallery.ui

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.artgallery.api.Api
import com.artgallery.auth.ui.LoginScreen
import com.artgallery.userPreferences.UserPreferences
import com.artgallery.userPreferences.UserPreferencesViewModel

val picturesRoute = "pictures"
val authRoute = "auth"

@Composable
fun MyAppNavHost() {
    val navController = rememberNavController()
    val onCloseItem = {
        Log.d("MyAppNavHost", "navigate back to list")
        navController.popBackStack()
    }
    val userPreferencesViewModel =
        viewModel<UserPreferencesViewModel>(factory = UserPreferencesViewModel.Factory)
    val userPreferencesUiState by userPreferencesViewModel.uiState.collectAsStateWithLifecycle(
        initialValue = UserPreferences()
    )
    val myAppViewModel = viewModel<MyAppViewModel>(factory = MyAppViewModel.Factory)
    NavHost(
        navController = navController,
        startDestination = authRoute
    ) {
        composable(picturesRoute) {
//            ItemsScreen(
//                onItemClick = { itemId ->
//                    Log.d("MyAppNavHost", "navigate to item $itemId")
//                    navController.navigate("$itemsRoute/$itemId")
//                },
//                onAddItem = {
//                    Log.d("MyAppNavHost", "navigate to new item")
//                    navController.navigate("$itemsRoute-new")
//                },
//                onLogout = {
//                    Log.d("MyAppNavHost", "logout")
//                    myAppViewModel.logout()
//                    Api.tokenInterceptor.token = null
//                    navController.navigate(authRoute) {
//                        popUpTo(0)
//                    }
//                })
        }
        composable(
            route = "$picturesRoute/{id}",
            arguments = listOf(navArgument("id") { type = NavType.StringType })
        )
        {
//            ItemScreen(
//                itemId = it.arguments?.getString("id"),
//                onClose = { onCloseItem() }
//            )
        }
        composable(route = "$picturesRoute-create")
        {
//            ItemScreen(
//                itemId = null,
//                onClose = { onCloseItem() }
//            )
        }
        composable(route = authRoute)
        {
            LoginScreen(
                onClose = {
                    Log.d("MyAppNavHost", "navigate to list")
                    navController.navigate(picturesRoute)
                }
            )
        }
    }
    LaunchedEffect(userPreferencesUiState.token) {
        if (userPreferencesUiState.token != null && userPreferencesUiState.token != "") {
            Log.d("MyAppNavHost", "Launched effect navigate to items")
            Api.tokenInterceptor.token = userPreferencesUiState.token
            myAppViewModel.setToken(userPreferencesUiState.token)
            navController.navigate(picturesRoute) {
                popUpTo(0)
            }
        }
    }
}
