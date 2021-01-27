import React, { Component } from 'react'
import '../css/Upload.css'
import logo from '../css/logo.svg';
import Dropzone from './Dropzone'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert } from '@material-ui/lab';
import { vSite } from '../utils/validation'
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { actionOnCreateSite } from '../store/actions';
import { UploadPropsInterface, UploadStateInterface } from '../models';
import { acceptedFileTypes } from '../utils/constants';

export class Upload extends Component<UploadPropsInterface, UploadStateInterface> {
    private timer: any;
    constructor(props: any) {
        super(props);
        this.state = {
            timePassed: false,
            files: [],
            accept: acceptedFileTypes,
            redirect: null,
            error: null,
            open: false
        };
        this.readFileContents = this.readFileContents.bind(this);
    }
    componentWillUnmount() {
        this.clearTimer();
    }
    render(): JSX.Element {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        else {
            // Logo disappears after 2 seconds
            this.startTimer();
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
                                    <IconButton style={{ float: 'right' }} size="small" aria-label="close" color="inherit" onClick={e => this.handleClose()}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                    {this.state.error}
                                </Alert>

                            </Snackbar>
                            : null}
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
    startTimer() {
        this.timer = setTimeout(() => {
            this.setState({ timePassed: true })
        }, 1000);

    }

    clearTimer() {
        // Handle an undefined timer rather than null
        if(this.timer) {
            clearTimeout(this.timer)
        } 
    }

    handleClose(): void {
        if (this?.state?.open) {
            this.setState({ open: false });
        }
    };

    readFileContents(file: File): void {
        const reader = new FileReader();
        reader.onload = async (e): Promise<void> => {
            const fileContents = (e.target as any).result;
            const validate = vSite(fileContents);
            if (validate.valid) {
                this.props.onCreateSite(validate.grid);
                this.setState({ redirect: "/site" });
            } else {
                this.setState({ error: validate.error, open: true })
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
        onCreateSite: (data: string) => dispatch(actionOnCreateSite(data))
    };
};
export default connect(
    mapStateToProps,
    mapDispachToProps
)(Upload);