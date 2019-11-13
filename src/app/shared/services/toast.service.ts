import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    public toasts: any[] = [];

    public show(body: string, options: any = {}) {
        this.toasts.push({ body, ...options });
    }

    public remove(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }
}
