import React from 'react';
import Analyze from '../containers/Analyze';
import DashboardBot from '../containers/DashboardBot';
import HomePage from '../containers/HomePage';
import LobbyPage from '../containers/LobbyPage';
import Rules from '../containers/Rules';
export const API_ENDPOINT = 'http://localhost:3000';

export const STATUS_RESPONSE = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NOT_FOUND: 404,
};

export const DASHBOARD_ROUTES = [
    {
        path: '/admin',
        name: 'Home page',
        exact: true,
        component: ({ match }) => <HomePage match={match}/>,
        icon: 'home_icon',
    },
    {
        path: '/admin/dashboard',
        name: 'Chat bot dashboard',
        exact: false,
        component: ({ match }) => <DashboardBot match={match}/>,
        icon: 'dashboard_icon',
    },
    {
        path: '/admin/rules',
        name: 'Set up Rules',
        exact: false,
        component: ({ match }) => <Rules match={match}/>,
        icon: 'build_icon',
    },
    {
        path: '/admin/analyze',
        name: 'Statistics and analysis',
        exact: false,
        component: ({ match }) => <Analyze match={match}/>,
        icon: 'assessment_icon',
    },
    /**
     * Kịch bản
     */
];

export const LOBBY_ROUTES = [
    {
        path: '/',
        name: 'All chatbot',
        exact: false,
        component: LobbyPage,
        icon: '',
    },
];
export const ALPHABER_COLOR = [
    {
        key: 'a',
        color: '#1abc9c',
    },
    {
        key: 'b',
        color: '#16a085',
    },
    {
        key: 'c',
        color: '#f1c40f',
    },
    {
        key: 'd',
        color: '#f39c12',
    },
    {
        key: 'e',
        color: '#2ecc71',
    },
    {
        key: 'f',
        color: '#27ae60',
    },
    {
        key: 'g',
        color: '#e67e22',
    },
    {
        key: 'h',
        color: '#d35400',
    },
    {
        key: 'i',
        color: '#3498db',
    },
    {
        key: 'j',
        color: '#2980b9',
    },
    {
        key: 'k',
        color: '#e74c3c',
    },
    {
        key: 'l',
        color: '#c0392b',
    },
    {
        key: 'm',
        color: '#9b59b6',
    },
    {
        key: 'n',
        color: '#8e44ad',
    },
    {
        key: 'o',
        color: '#C4E538',
    },
    {
        key: 'p',
        color: '#A3CB38',
    },
    {
        key: 'q',
        color: '#006266',
    },
    {
        key: 'r',
        color: '#ED4C67',
    },
    {
        key: 's',
        color: '#FDA7DF',
    },
    {
        key: 't',
        color: '#6F1E51',
    },
    {
        key: 'u',
        color: '#e056fd',
    },
    {
        key: 'v',
        color: '#30336b',
    },
    {
        key: 'w',
        color: '#b71540',
    },
    {
        key: 'x',
        color: '#e55039',
    },
    {
        key: 'y',
        color: '#079992',
    },
    {
        key: 'z',
        color: '#ffb8b8',
    },
];
export const DEFAULT_COLOR = '#7158e2';

export const MONTHS_STRING = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const THREE_DOTS = '...';
export const SPACE_CHARACTER = ' ';
export const EM_DASH_CHARACTER = '-';
export const MAX_LENGTH_BLOCK_NAME = 20;
export const MAX_LENGTH_BOT_NAME = 20;
