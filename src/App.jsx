import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Layout } from 'antd'
import ApplicationHeader from 'containers/ApplicationHeader'
import ApplicationNavigation from 'containers/ApplicationNavigation'
import LoginPage from 'pages/LoginPage'
import HomePage from 'pages/HomePage'
import RegisterPage from 'pages/RegisterPage'
import NewApplicationPage from "pages/NewApplicationPage";
import AdminPanelPage from 'pages/AdminPanelPage'
import ApplicationsListPage from 'pages/ApplicationsListPage'
import ReviewApplicationsPage from 'pages/ReviewApplicationsPage'
import MyApplicationsPage from 'pages/MyApplicationsPage'
import { Provider } from 'react-redux'
import store from 'store'

const App = () => (
  <Provider store={store}>
    <Layout>
      <Router>
        <ApplicationHeader />
        <Layout>
          <ApplicationNavigation />
          <Layout.Content className="root-layout-content">
            <Switch>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/admin-panel">
                <AdminPanelPage />
              </Route>
              <Route path="/new-application">
                <NewApplicationPage />
              </Route>
              <Route path="/application-list">
                <ApplicationsListPage />
              </Route>
              <Route path="/review-applications">
                <ReviewApplicationsPage />
              </Route>
              <Route path="/my-applications">
                <MyApplicationsPage />
              </Route>
              <Redirect to="/home" />
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </Layout>
  </Provider>
)

export default App
