import React, { Fragment } from 'react'
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <Fragment>
      <div className='contactContainer'>
    <h1> Contact Us</h1>
    <p>
    If you have any questions or queries a member of <br></br>staff will always be happy to  help. Feel free to <br></br> contact us by telephone or email and we will be<br></br> sure to get back to you as soon as possible.
    </p>
    
      </div>
      <div className='MailForenquiry'>
      <a className="mailBtn" href="mailto:bhutanipraveen741@gmail.com">
       <Button> bhutanipraveen741@gmail.com</Button>
        </a>
      </div>

    </Fragment>

  )
}

export default Contact