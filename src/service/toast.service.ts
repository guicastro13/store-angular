import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Toast {
    message: string;
    type: 'success' | 'error' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);

    getToast() {
        return this.toasts.asObservable();
    }

    setToast(toast: Toast) {
        const currentToasts = this.toasts.getValue();
        currentToasts.push(toast);
        this.toasts.next(currentToasts);
    }

    removeToast(index: number): void {
        const currentToasts = this.toasts.getValue();
        currentToasts.splice(index, 1)
        this.toasts.next(currentToasts);
    }
}