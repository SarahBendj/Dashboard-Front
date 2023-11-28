import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

type NotificationType = {
	background?: string
    message : string
    type: string
	className?: string
};

const useNotification = () => {
	const notyf = new Notyf();
    
	const displayNotification = ( { background,message, type, className } : NotificationType ) => {
		notyf.open({
			type,
			message,
			background,
			duration: 2500,
			position: {
				x: 'right',
				y: 'top',
			},
			dismissible: true,
			className,
		});
	};
        
	return {
		showSucess: (message : string ) => displayNotification({
			message,
			type: 'success', 
			background : 'rgb(17 ,24 ,39)',
			

		}),
		showError: (message : string ) => displayNotification({
			message,
			type: 'error',
			background: 'linear-gradient(to right, 	rgb(124 45 18), rgba(0, 255, 255, 0))' 
		
		}),
		showWarning: (message : string ) => displayNotification({
			message,
			type: 'warning', 
		}),
	};
};

export default useNotification;