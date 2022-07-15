import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        /*set show to true */
        this.state=({
            show:true
        });
    };
    close = () => {
        /*set show to false */
        this.setState({
            show:false
        });
    };
  render () {
      const {show} = this.state
      return(
        <div>
          {show ?
            <div className="modal">
                <div className="modalContent">
                    <span className ="close" onClick={this.close}>&times;</span>
                    <h1>Instructions</h1>
                    <ol>
                        <li>Hover over the various areas of the resume, and click the pencil
                        icon to edit the content.</li>
                        <li>To add an additional experience, project, education, or skill, click
                        "Add". You can then edit the content.</li>
                        <li>To add a bullet point, click on the corresponding title, then
                        click "Add Bullet".</li>
                        <li>Complete the form fields to your liking, and click "Submit". </li>
                        <li>To delete content, click on the trashcan icon.</li>
                        <li>To print or download, click on the print button at the top of the
                        contact information section. Alternatively, you can print
                        using CMND + P (mac) or CTRL + P (windows)</li>
                        <li>Happy CV generating! :)</li>
                     </ol>
                </div>
            </div>
      :
      null
        }
        </div>
      )
    };
};
export default Modal;