import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toasts',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastsComponent {
    constructor(public toastService: ToastService) { }
}
