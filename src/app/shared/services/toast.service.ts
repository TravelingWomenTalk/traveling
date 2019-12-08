import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    public toasts: any[] = [];

    public show(body: string, options: any = {}): void {
        this.toasts.push({ body, ...options });
    }

    public remove(toast: any): void {
        this.toasts = this.toasts.filter(t => t !== toast);
    }
}
