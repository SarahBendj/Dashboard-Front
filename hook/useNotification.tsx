import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

type NotificationType = {
	background?: string
    message : string
    type: string
	duration ?: number
};

const useNotification = () => {
	const notyf = new Notyf();
    
	const displayNotification = ( { background,message, type, duration } : NotificationType ) => {
		notyf.open({
			type,
			message,
			background,
			position: {
				x: 'right',
				y: 'top',
			},
			dismissible: true,
		    duration
			
		});
	};
        
	return {
		showSucess: (message : string ) => displayNotification({
			message,
			type: 'success', 
			background : 'rgb(15 ,110 ,105)',
			duration : 2500
			

		}),
		showError: (message : string ) => displayNotification({
			message,
			type: 'error',
			background: 'rgb(124, 45,18)',
			duration: 2500,
			
		
		}),
		showWarning: (message : string ) => displayNotification({
			message,
			type: 'warning', 
			background: 'rgb(136, 65,18)',
			duration :10000
		}),
	};
};

export default useNotification;