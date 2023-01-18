import { Component, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class MessageService {

    constructor(private snack: MatSnackBar) {

    }

    public generateMessage(msg: String): void {
        this.snack.open(`${msg}`, 'OK', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'message'
        })
    }


}