import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service'; // Correct import for RegisterService
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
})
export class RegisterComponent {
    registerRequest: any = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: ''
    };

    constructor(private registerService: RegisterService, private router: Router) { }

    onRegister() {
        if (this.registerRequest.email && this.registerRequest.password && this.registerRequest.firstName && this.registerRequest.lastName && this.registerRequest.phone) {
            this.registerService.register(this.registerRequest).subscribe(
                response => {
                    console.log('User registered successfully', response);
                    Swal.fire('Success', 'User registered successfully!', 'success');
                    this.router.navigate(['/auth/login']);
                },
                error => {
                    console.error('Error registering user', error);
                    Swal.fire('Error', 'There was an error registering the user. Please try again.', 'error');
                }
            );
        } else {
            Swal.fire('Error', 'Please fill in all fields.', 'error');
        }
    }
}
