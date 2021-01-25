import React, { Component } from 'react'
import '../css/Dropzone.css'

interface DropzoneType {
    filesAdded: any;
    accept: string;
}

class Dropzone extends Component<DropzoneType, { hightlight: boolean }> {
    private fileInputRef: React.RefObject<HTMLInputElement> = React.createRef();
    constructor(props: DropzoneType) {
        super(props)
        this.state = { hightlight: false }

        this.openFileDialog = this.openFileDialog.bind(this)
        this.onFilesAdded = this.onFilesAdded.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDragLeave = this.onDragLeave.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }

    openFileDialog(): void {
        const fileInputRef = this.fileInputRef as any;
        fileInputRef.current.click()
    }

    onFilesAdded(evt: React.ChangeEvent<HTMLInputElement>): void {
        const files: FileList | null = evt.target.files
        if (this.props.filesAdded) {
            if(files){
                this.props.filesAdded(files[0])
            } else {
                return;
            }
        }
    }

    onDragOver(evt: React.DragEvent<HTMLDivElement>): void {
        evt.preventDefault();
        this.setState({ hightlight: true })
    }

    onDragLeave(): void {
        this.setState({ hightlight: false })
    }

    onDrop(event: React.DragEvent<HTMLDivElement>): void {
        event.preventDefault()

        const files: { [index: number]: File } = event.dataTransfer.files;
        if (this.props.filesAdded) {
            if(files){
                this.props.filesAdded(files[0]);
            } else {
                return;
            }
        }
        this.setState({ hightlight: false })
    }

    render() {
        return (
            <div
                className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
            >
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    accept={this.props.accept}
                    onChange={this.onFilesAdded}
                />
                <img
                    alt="upload"
                    className="Icon"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cu%0AdzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdC%0Ab3g9IjAgMCAyNCAyNCI+CiAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmls%0AbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0xOS4zNSAxMC4wNEMxOC42NyA2LjU5%0AIDE1LjY0IDQgMTIgNCA5LjExIDQgNi42IDUuNjQgNS4zNSA4LjA0IDIuMzQg%0AOC4zNiAwIDEwLjkxIDAgMTRjMCAzLjMxIDIuNjkgNiA2IDZoMTNjMi43NiAw%0AIDUtMi4yNCA1LTUgMC0yLjY0LTIuMDUtNC43OC00LjY1LTQuOTZ6TTE0IDEz%0AdjRoLTR2LTRIN2w1LTUgNSA1aC0zeiIvPgo8L3N2Zz4K"
                />
                <span>Upload Files</span>
            </div>
        )
    }
}

export default Dropzone