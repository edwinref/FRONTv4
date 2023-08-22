import { Component, OnInit } from '@angular/core';
import {ProcessingcodeService} from "./processingcode.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Bts} from "../home/bts";
import {ProcessingCode} from "../home/processing-code";
import {Users} from "../users/Users";
import {TransactionStatue, TransactionType} from "./transaction";

@Component({
  selector: 'app-tables',
  templateUrl: './processingcode.component.html',
  styleUrls: ['./processingcode.component.scss']
})
export class ProcessingcodeComponent implements OnInit {
  public data: Object[] = [];
  public code: ProcessingCode[] = [];
  public codeTransactionType: TransactionType[] = [];
  public codeTransactionStatue: TransactionStatue[] = [];

  focus: any;
  focus1: any;
  codeP: string;
  codeTransactionTypeP: string;
  codeTransactionStatueP: string;

  descriptionP: string;
  password: string;
  deleting?: boolean;
  selectedProcessingCode: ProcessingCode;

  public selectedcodeTransactionType = '';
  public selectedcodeTransactionStatut = '';
  constructor(private processingcodeService:ProcessingcodeService ) {}

  public getProcessingCode(): void {
    this.processingcodeService.getProcessingCodes().subscribe(
      (response: ProcessingCode[]) => {

        this.data = response;
        this.code = response;
        //console.log(this.code);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getTransactionType(): void {
    this.processingcodeService.getTransactionType().subscribe(
      (response: TransactionType[]) => {

        this.data = response;
        this.codeTransactionType = response;
        //console.log(this.codeTransactionType);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getTransactionStatut(): void {
    this.processingcodeService.getTransactionStatut().subscribe(
      (response: TransactionStatue[]) => {

        this.data = response;
        this.codeTransactionStatue = response;
        //console.log(this.codeTransactionStatue);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteProcessingCode(id: string): void {
    const confirmation = confirm('Voulez-vous vraiment supprimer cet enregistrement?');

    if (confirmation) {
      const index = this.code.findIndex((processingcode) => processingcode.code === id);
      if (index !== -1) {
        this.code[index].deleting = true; // Set the deleting flag to true to display a loading state
        this.processingcodeService.deleteUser(id).subscribe(
          () => {
            alert('data  deleted successfully');
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
  onAddButtonClick(processingCode: ProcessingCode): void {
    this.selectedProcessingCode = { ...processingCode };
    this.codeP = this.selectedProcessingCode.code;
    this.descriptionP = this.selectedProcessingCode.description;

  }
  onInsertButtonClick(): void {
    if (this.selectedProcessingCode) {
      // Update the selectedBts object with the form field values
      this.selectedProcessingCode.code = this.codeP;
      this.selectedProcessingCode.description = this.descriptionP;


      // Call the updateBts method to update the selectedBts object on the server
      this.processingcodeService.updateUser(this.selectedProcessingCode).subscribe(
        (updatedProcessingCode: ProcessingCode) => {
          // Success: Update the corresponding Bts object in the bts array
          const index = this.code.findIndex(entry => entry.code === updatedProcessingCode.code);
          if (index !== -1) {
            this.code[index] = updatedProcessingCode;
          }
          // Reset the form fields
          this.codeP = '';
          this.descriptionP = '';
          // Clear the selectedBts property
          this.selectedProcessingCode = null;
        },
        (error: any) => {
          // Handle the error
          console.error(error);
        }
      );
    }
  }
  saveProcessingCode() {
    const newProcessingCode: ProcessingCode = {
      code: this.codeP.concat(this.codeTransactionTypeP,this.codeTransactionStatueP),
      description: this.descriptionP,

    };
    this.processingcodeService.saveProcessingCodeY(newProcessingCode).subscribe(
      (savedUser) => {
       // console.log('saaaaaaaave' + newProcessingCode.code);
        alert('Processing Code saved successfully');
        console.log(savedUser);
        this.codeP = '';
        this.descriptionP = '';
      },
      (error) => {
        console.error('Error saving user:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getProcessingCode();
    this.getTransactionStatut();
    this.getTransactionType();

  }
}
