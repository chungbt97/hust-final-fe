import HomePage from "../containers/HomePage";
import DashboardBot from "../containers/DashboardBot";
import Rules from "../containers/Rules";
import Analyze from "../containers/Analyze";

export const API_ENDPOINT = 'http://localhost:3000';

export const STATUS_RESPONSE = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NOT_FOUND: 404
}

export const DASHBOARD_ROUTES = [
	{
		path: '/',
		name: 'Home page',
		exact: true,
		component: HomePage,
		icon: 'home_icon'
	},
	{
		path: '/dashboard',
		name: 'Chat bot dashboard',
		exact: false,
		component: DashboardBot,
		icon: 'dashboard_icon'
	},
	{
		path: '/rules',
		name: 'Set up Rules',
		exact: false,
		component: Rules,
		icon: 'build_icon'

	},
	{
		path: '/analyze',
		name: 'Statistics and analysis',
		exact: false,
		component: Analyze,
		icon: 'assessment_icon'
	},
	/**
	 * Kịch bản
	 */
];