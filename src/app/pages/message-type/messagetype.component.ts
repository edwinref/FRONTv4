import { Component, OnInit } from '@angular/core';
import {MessagetypeService} from "./messagetype.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Bts} from "../home/bts";
import {MessageType} from "../home/processing-code";
import {Users} from "../users/Users";

@Component({
  selector: 'app-tables',
  templateUrl: './messagetype.component.html',
  styleUrls: ['./messagetype.component.scss']
})
export class MessagetypeComponent implements OnInit {
  public data: Object[] = [];
  public code: MessageType[] = [];
  focus: any;
  focus1: any;
  codeP: string;
  descriptionP: string;
  password: string;
  deleting?: boolean;
  selectedMessageType: MessageType;
  constructor(private messagetypeService:MessagetypeService ) {}

  public getMessageType(): void {
    this.messagetypeService.getMessageTypes().subscribe(
      (response: MessageType[]) => {

        this.data = response;
        this.code = response;
        console.log(this.code);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onDeleteMessageType(id: string): void {
    const confirmation = confirm('Voulez-vous vraiment supprimer cet enregistrement?');

    if (confirmation) {
      const index = this.code.findIndex((messagetype) => messagetype.code === id);
      if (index !== -1) {
        this.code[index].deleting = true; // Set the deleting flag to true to display a loading state
        this.messagetypeService.deleteUser(id).subscribe(
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
  onAddButtonClick(messageType: MessageType): void {
    this.selectedMessageType = { ...messageType };
    this.codeP = this.selectedMessageType.code;
    this.descriptionP = this.selectedMessageType.description;

  }
  onInsertButtonClick(): void {
    if (this.selectedMessageType) {
      // Update the selectedBts object with the form field values
      this.selectedMessageType.code = this.codeP;
      this.selectedMessageType.description = this.descriptionP;


      // Call the updateBts method to update the selectedBts object on the server
      this.messagetypeService.updateUser(this.selectedMessageType).subscribe(
        (updatedMessageType: MessageType) => {
          // Success: Update the corresponding Bts object in the bts array
          const index = this.code.findIndex(entry => entry.code === updatedMessageType.code);
          if (index !== -1) {
            this.code[index] = updatedMessageType;
          }
          // Reset the form fields
          this.codeP = '';
          this.descriptionP = '';
          // Clear the selectedBts property
          this.selectedMessageType = null;
        },
        (error: any) => {
          // Handle the error
          console.error(error);
        }
      );
    }
  }
  saveMessageType() {
    const newMessageType: MessageType = {
      code: this.codeP,
      description: this.descriptionP,

    };
    this.messagetypeService.saveMessageTypeY(newMessageType).subscribe(
      (savedUser) => {
        console.log('saaaaaaaave' + newMessageType.code);

        console.log('User saved successfully:', savedUser);
        this.codeP = '';
        this.descriptionP = '';
      },
      (error) => {
        console.error('Error saving user:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getMessageType();

  }
}
