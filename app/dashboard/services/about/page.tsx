import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function page() {
  const styleDiv = ` p-4 hover:shadow-sm hover:shadow-cyan-500 border-b border-cyan-700`
  const textStyle = `italic text-white ` 
  return (
    <div className="h-screen overflow-y-auto">
      <h1 className='text-white text-2xl ml-4 '> What is it about ?  <FontAwesomeIcon icon={faCircleInfo}/></h1>
    <div className='bg-gray-900 shadow-sm shadow-cyan-700 m-4 p-4'>

    <div className={styleDiv}>
      <h2 className=" text-white text-xl">Real-Time Monitoring:</h2>
      <p className={textStyle}>
        Continuous monitoring of machine temperatures and conditions in real-time.
        Immediate detection of warnings and alerts for any anomalies or issues.
      </p>
    </div>
  
    <div className={styleDiv}>
      <h2 className="text-xl text-white">Control Interface:</h2>
      <p className={textStyle}>
        An intuitive and centralized control interface for managing and overseeing all aspects of the operations.
        Dashboard with key performance indicators (KPIs) for quick insights.
      </p>
    </div>
  
  
    <div className={styleDiv}>
      <h2 className="text-xl text-white">Machine Data Integration:</h2>
      <p className={textStyle}>
        Integration with machines to gather and display temperature data.
        Historical data analysis to identify patterns and optimize machine performance.
      </p>
    </div>
  
   
    <div className={styleDiv}>
      <h2 className="text-xl text-white">Reception Management:</h2>
      <p className={textStyle}>
        Comprehensive reception management module to track deliveries from suppliers.
        Notifications and alerts for upcoming or delayed deliveries.
      </p>
    </div>

    <div className={styleDiv}>
      <h2 className="text-xl text-white">Supplier Tracking:</h2>
      <p className={textStyle}>
        Supplier management system to track information about each supplier.
        Historical records of supplier interactions and performance.
      </p>
    </div>
  

    <div className={styleDiv}>
      <h2 className="text-xl text-white">User Roles and Permissions:</h2>
      <p className={textStyle}>
        Role-based access control to ensure that users have appropriate access levels.
        Different views and permissions for managers, technicians, and other stakeholders.
      </p>
    </div>
  

  
 
    <div className={styleDiv}>
      <h2 className="text-xl text-white">Reporting and Analytics:</h2>
      <p className={textStyle}>
        Reporting tools to generate insights and reports on machine performance, reception statuses, and supplier interactions.
        Data visualization for trends and patterns.
      </p>
    </div>
  
    <div className={styleDiv}>
      <h2 className="text-xl text-white">Automation and AI:</h2>
      <p className={textStyle}>
        Implementation of automation for routine tasks and processes.
        Integration of AI for predictive maintenance and early warning detection.
      </p>
    </div>

  </div>
  </div>
  
  )
}
