import HomePage from "../containers/HomePage";
import DashbroadBot from "../containers/DashbroadBot";
import Rules from "../containers/Rules";
import Analyze from "../containers/Analyze";

export const API_ENDPOINT = 'http://localhost:3000';

export const STATUS_RESPONSE = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NOT_FOUND: 404
}

export const DASHBROAD_ROUTES = [
	{
		path: '/',
		name: 'Home page',
		exact: true,
		component: HomePage
	},
	{
		path: '/dashbroad',
		name: 'Chat bot dashbroad',
		exact: false,
		component: DashbroadBot
	},
	{
		path: '/rules',
		name: 'Set up Rules',
		exact: false,
		component: Rules
	},
	{
		path: '/analyze',
		name: 'Statistics and analysis',
		exact: false,
		component: Analyze
	},
	/**
	 * Kịch bản
	 */
];