import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-read-more',
    templateUrl: 'read-more.component.html'
})
export class ReadMoreComponent implements OnInit, OnChanges {
    @Input() public text: string;
    @Input() public maxLength: number = 100;
    public currentText: string;
    public isHidden: boolean = true;
    public isCollapsed: boolean = true;

    constructor() { }

    public ngOnInit(): void {
        this.determineView();
    }

    public ngOnChanges(): void {
        this.determineView();
    }

    public toggleView(): void {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }

    public determineView(): void {
        if (!this.text || this.text.length <= this.maxLength) {
            this.currentText = this.text;
            this.isCollapsed = false;
            this.isHidden = true;
            return;
        }

        this.isHidden = false;
        if (this.isCollapsed === true) {
            this.currentText = this.text.substring(0, this.maxLength) + '...';
        } else if (this.isCollapsed === false) {
            this.currentText = this.text;
        }
    }
}
