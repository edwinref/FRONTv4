import { Component, OnInit } from '@angular/core';
import {UserService} from "./Users.service";
import {Users} from "./Users";
import {HttpErrorResponse} from "@angular/common/http";
import {Bts} from "../home/bts";

@Component({
  selector: 'app-tables',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public data: Object[] = [];
  public code: Users[] = [];
  focus: any;
  focus1: any;
  firstName: string;
  email: string;
  password: string;
  deleting?: boolean;
  selectedUser: Users;
  constructor(private userService: UserService) {}


  saveUser() {
    const newUser: Users = {
      id: undefined,
      prenom: this.firstName,
      email: this.email,
      password: this.password,
      role: 'user'
    };

    this.userService.saveuserY(newUser).subscribe(
      (savedUser) => {
        console.log('saaaaaaaave' + newUser.email);

        console.log('User saved successfully:', savedUser);
        this.firstName = '';
        this.email = '';
        this.password = '';
      },
      (error) => {
        console.error('Error saving user:', error);
      }
    );
  }
  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: Users[]) =>{
        this.data = response;
        this.code = response;
        console.log(this.code);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteUser(id: number): void {
    const confirmation = confirm('Voulez-vous vraiment supprimer cet enregistrement?');

    if (confirmation) {
      const index = this.code.findIndex((user) => user.id === id);
      if (index !== -1) {
        this.code[index].deleting = true; // Set the deleting flag to true to display a loading state
        this.userService.deleteUser(id).subscribe(
          () => {
            console.log('Bts deleted successfully');
            this.code.splice(index, 1); // Remove the deleted row from the array
            alert('L\'enregistrement a été supprimé avec succès'); // Display the success message
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting Bts:', error);
            alert(error.message);
          },
          () => {
            this.code[index].deleting = false; // Reset the deleting flag after deletion is complete
          }
        );
      }
    }
  }
  onAddButtonClick(users: Users): void {
    this.selectedUser = { ...users };
    this.firstName = this.selectedUser.prenom;
    this.email = this.selectedUser.email;
    this.password = this.selectedUser.password;

  }
  onInsertButtonClick(): void {
    if (this.selectedUser) {
      // Update the selectedBts object with the form field values
      this.selectedUser.prenom = this.firstName;
      this.selectedUser.email = this.email;
      this.selectedUser.password = this.password;


      // Call the updateBts method to update the selectedBts object on the server
      this.userService.updateUser(this.selectedUser).subscribe(
        (updatedUsers: Users) => {
          // Success: Update the corresponding Bts object in the bts array
          const index = this.code.findIndex(entry => entry.id === updatedUsers.id);
          if (index !== -1) {
            this.code[index] = updatedUsers;
          }
          // Reset the form fields
          this.firstName = '';
          this.email = '';
          this.password = '';


          // Clear the selectedBts property
          this.selectedUser = null;
        },
        (error: any) => {
          // Handle the error
          console.error(error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
}
