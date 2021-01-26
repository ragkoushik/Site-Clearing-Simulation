import React, { Component } from 'react'
import '../css/Upload.css'
import logo from '../css/logo.svg';
import Dropzone from './Dropzone'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert } from '@material-ui/lab';
import {vSite} from '../utils/validation'
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// local state
interface UploadState {
    files: any;
    accept: string;
    timePassed: boolean;
    redirect: string | null;
    error: string | null;
    open: boolean;
}

class Upload extends Component<any, UploadState> {
    constructor(props: any) {
        super(props);
        this.state = {
            timePassed: false,
            files: [],
            accept: ".txt",
            redirect: null,
            error: null,
            open: false
        };
        this.readFileContents = this.readFileContents.bind(this);
    }

    render(): JSX.Element  {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        else {
            // Logo disappears after 2 seconds
            setTimeout((): void => {
                this.setState({ timePassed: true })
            }, 1000)

            // disappears after 2 seconds - toast notification
            

            let renderTemplate: any;
            if (!this.state.timePassed) {
                renderTemplate = <header className="center">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Site clearing simulator loading
                    </p>
                </header>
            }
            else {
                renderTemplate = <div className="center">
                    <div className="Upload">
                        <div className="Content">
                            <div>
                                <Dropzone
                                    filesAdded={this.readFileContents}
                                    accept={this.state.accept}
                                />
                            </div>
                            <div className="Files">
                                {this.state.files.map((file: any) => {
                                    return (
                                        <div key={file.name} className="Row">
                                            <span className="Filename">{file.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <span className="title">Begin by uploading a file </span>
                        {this.state.error ? 
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                open={this.state.open}
                                autoHideDuration={6000}
                                onClose={this.handleClose}
                            >
                                <Alert className="Alert" severity="error">
                                    <IconButton style={{float: 'right'}} size="small" aria-label="close" color="inherit" onClick={e => this.handleClose()}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                    {this.state.error } 
                                </Alert> 
                               
                            </Snackbar>
                        : null }
                    </div>
                </div>;
            }

            return (
                <div>
                    {renderTemplate}
                </div>
            );
        }
    }
    
    handleClose(): void{
        if(this?.state?.open){
            this.setState({open:false});
        }
    };

    readFileContents(file: File): void {
        const reader = new FileReader();
        reader.onload = async (e): Promise<void> => {
            const fileContents = (e.target as any).result;
            const validate = vSite(fileContents);
            console.log(validate)
            if(validate.valid){
                this.props.onCreateSite(validate.grid);
                this.setState({ redirect: "/site" });
            } else {
                this.setState({ error: validate.error, open: true})
            }
        };

        if (file) {
            reader.readAsText(file);
        }
    }

    
}

const mapStateToProps = (state: any) => {
    return {
        site: state.site
    };
  };
  
  const mapDispachToProps = (dispatch: any) => {
    return {
      onCreateSite: (data: string) => dispatch({ type: "CREATE_SITE", value: data })
    };
  };
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(Upload);