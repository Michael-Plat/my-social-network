import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        title: "Hey"
    }
    activateEditMode = () => {
        //console.log(this.state.editMode);
        this.setState ( {
        editMode: true
        } )
        //console.log(this.state.editMode);
        // будет два false в консоле, потому-что setState асинхронный запрос, похож на Ajax
    }
    
    deactivateEditMode = () => {
        this.setState ( {
        editMode: false
        } )
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode } >{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={ this.deactivateEditMode} value={this.props.status} type="text" />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;