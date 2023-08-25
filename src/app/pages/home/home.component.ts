import { Component, OnInit, ViewChild } from '@angular/core';
import { AggregateService, GroupService, GridComponent } from '@syncfusion/ej2-angular-grids';
import {Bts} from './bts';
import {MessageType, ProcessingCode} from './processing-code';
import {BtsService} from './bts.service';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { saveAs } from 'file-saver';
import {LicenseManager} from 'ag-grid-enterprise';
import {environment} from "../environments/environment";
import {any} from "codelyzer/util/function";

LicenseManager.setLicenseKey('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx3THxbf1xzZFNMZVxbR3JPMyBoS35RdUVkW39ednFVRWVcU0F0');
LicenseManager.getLicenseDetails('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx3THxbf1xzZFNMZVxbR3JPMyBoS35RdUVkW39ednFVRWVcU0F0');

interface BtsSubset {
  msg_seq: string;
  wording: string ;
  onl_de_057: string ;
}


interface Config {
  token: string;
  uid: string;
  wording: string;
  substring: string; // Add the substring property
}

function extractSubstring(input: string, pattern: RegExp, length: number): string | null {
  const match = input.match(pattern);
  if (match) {
    return match[0].substr(0, length);
  } else {
    return null;
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AggregateService, GroupService]

})

export class HomeComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private btsService: BtsService, private http: HttpClient) {
    LicenseManager.setLicenseKey('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCeUx0Qnxbf1xzZFJMYVhbRXRPMyBoS35RdUVkW39ed3VRR2JfVExw');
  }
  model = {
    left: true,
    middle: false,
    right: false
  };
  selectedBts: Bts | null;
  btsSubsetArray: BtsSubset[];
  configArray:Config[];
  focus;
  focus1;
  public bts1;
  public bts: Bts[] = [];
  public processingCodes: ProcessingCode[] = [];
  public message_type: MessageType[] = [];

  public onl_de_003 = '';
  public onl_de_011 = '';
  public onl_de_035 = '';
  public onl_de_037 = '';
  public onl_de_038 = '';
  public onl_de_041 = '';
  public onl_de_042 = '';
  public onl_de_060 = '';
  public onl_de_125 = '';
  public onl_de_124 = '';
  public wording = '';
  public successMessage = '';
  public onl_de_012 = '';
  public onl_de_013  = '';
  public onl_de_007 = '';
  public financial_constitution_id = '';
  public logical_network = '';
  public errorMessage = '';
  public onl_de_004: any;
  selectedCode: { code: string, description: string } | undefined;
  public selectedDescription = '';
  public selectedDescription1 = '';

  public isAddClicked = false;
  public isAddClicked1 = false;
  public isAddClicked2 = false;

  isAddOptionClicked = false;
  isTableVisible = false;
  isAddVisible = false;
  public activity_flag = '';
  public send_count = 0;
  public delay_time = 0;
  public chunk_delay = 0;
  public response_flag = '';
  public reversal_flag = '';
  public autho_code = '';
  public onl_de_018 = '';
  public onl_de_024 = '';
  public onl_de_027 = '';
  public onl_de_032 = '';
  public onl_de_039 = '';
  public onl_de_043 = '';
  public onl_de_048 = '';
  public onl_de_049 = '';
  public onl_de_057 = '';
  public onl_de_061 = '';
  public  onl_de_090 = '';
  public onl_de_100 = '';
  public user_create = '';
  public user_modif = '';
  defaultValues: any = {
    activity_flag: '',
    send_count: '',
    delay_time: '',
    chunk_delay: '',
    response_flag: '',
    reversal_flag: '',
    autho_code: '',
    onl_de_018: '',
    onl_de_024: '',
    onl_de_027: '',
    onl_de_032: '',
    onl_de_039: '',
    onl_de_043: '',
    onl_de_048: '',
    onl_de_049: '',
    onl_de_057: '',
    onl_de_061: '',
    onl_de_090: '',
    onl_de_100: '',
    user_create: '',
    user_modif: ''
  };
  formattedDate = '';
  formattedDateTime = '';
  public onl_de_124_table='onl_de_124';
  public onl_de_124_part=this.getOnlDe124Table();
  public onl_de_124_part1= this.onl_de_124_part[0];

  getOnlDe124Table() {
    // Assuming onl_de_124_table has a string value
    if (this.onl_de_124_table && this.onl_de_124_table.length >= 2) {
      return [this.onl_de_124_table.substr(0, 2), this.onl_de_124_table.substr(2)];
    }
    return ['', '']; // Return empty strings if the value is not valid
  }
  public configure :any[]=[];
  public data: Object[] = []; // Initialize data property with an empty array
  public pageOption: Object = { pageCount: 9 };
  public groupSettings: { [x: string]: Object } = { showDropArea: false, columns: ['onl_de_042', 'onl_de_041',this.onl_de_124_table] };
  public refresh = true; // Initialize refresh property with 'false'
  @ViewChild('grid')
  public grid!: GridComponent; // Add '!' to tell TypeScript that it will be initialized later
  showAddForm() {
    this.isAddClicked = true;
  }


  onShow(): void {
    this.isAddClicked = true;

  }
  onShow1(): void {
    this.isAddClicked1 = true;

  }
  onShow2(): void {
    this.isAddClicked2 = true;

  }
  onCloseFlowWindow2() {
    this.isAddClicked2 = false;
  }

  onCloseFlowWindow() {
    this.isAddClicked = false;
  }
  onCloseFlowWindow1() {
    this.isAddClicked1 = false;
  }
  onShowTableClick() {
    this.isTableVisible = !this.isTableVisible;
  }
  onCloseTable() {
    this.isTableVisible = false;
  }
  ngOnInit() {
    this.getBts();
    this.getProcessingCodes();
    this.getDefaultValues();
    this.getMessageType();
//    console.log(this.getOnlDe124Table()+"part 1  "+this.onl_de_124_part1);
    this.extractPatternFromBtsSubsetArray();

  }

  private getDefaultValues(): void {
    //console.log(this.btsService.getProcessingCodes());
    this.btsService.getDefaultValues().subscribe(
      (response: any) => {
        this.defaultValues = response;
        // Assign the default values to the respective variables
        this.activity_flag = this.defaultValues.activity_flag;
        this.send_count = this.defaultValues.send_count;
        this.delay_time = this.defaultValues.delay_time;
        this.chunk_delay = this.defaultValues.chunk_delay;
        this.response_flag = this.defaultValues.response_flag;
        this.reversal_flag = this.defaultValues.reversal_flag;
        this.autho_code = this.defaultValues.autho_code;
        this.onl_de_018 = this.defaultValues.onl_de_018;
        this.onl_de_024 = this.defaultValues.onl_de_024;
        this.onl_de_027 = this.defaultValues.onl_de_027;
        this.onl_de_032 = this.defaultValues.onl_de_032;
        this.onl_de_039 = this.defaultValues.onl_de_039;
        this.onl_de_043 = this.defaultValues.onl_de_043;
        this.onl_de_048 = this.defaultValues.onl_de_048;
        this.onl_de_049 = this.defaultValues.onl_de_049;
        this.onl_de_057 = this.defaultValues.onl_de_057;
        this.onl_de_061 = this.defaultValues.onl_de_061;
        this.onl_de_090 = this.defaultValues.onl_de_090;
        this.onl_de_100 = this.defaultValues.onl_de_100;
        this.user_create = this.defaultValues.user_create;
        this.user_modif = this.defaultValues.user_modif;
      },
      (error: HttpErrorResponse) => {
        console.error('Error retrieving default values:', error);
        // Handle the error or show an error message
      }
    );
  }



  public getProcessingCodes(): void {
    this.btsService.getProcessingCodes().subscribe(
      (response: ProcessingCode[]) => {
        this.processingCodes = response;
        //console.log(this.processingCodes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getMessageType(): void {
    this.btsService.getMessageTypes().subscribe(
      (response: ProcessingCode[]) => {
        this.message_type = response;
        //console.log(this.message_type);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public confirmTruncateTable(): void {
    const confirmed = confirm('Are you sure you want to truncate the table?');

    if (confirmed) {
      this.truncateTable();
    }
  }

  private truncateTable(): void {
    this.btsService.truncateTable().subscribe(
      () => {
        console.log('Table truncated successfully');
        // Perform any additional actions or show a success message
      },
      (error) => {
        console.error('Failed to truncate table:', error);
        // Handle error case, show error message, etc.
      }
    );
  }



  public parseDate(): void {
    if (this.onl_de_013) {
      const selectedDate = new Date(this.onl_de_013);
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      this.formattedDate = `${month}${day}`;
    }

  }

  formatOnlDe125() {
    if (this.onl_de_125 && this.onl_de_125.length > 4) {
      const lastFourChars = this.onl_de_125.slice(-4);
      this.onl_de_125 = '000000' + lastFourChars;
    }
  }

  updateOnlDe125() {
    if (this.onl_de_125 && this.onl_de_125.length >= 4) {
      const lastFourChars = this.onl_de_125.substr(2);
      const formattedValue = '000000' + lastFourChars;
      // Update the value in the database using your API or backend logic
      // Here, I'll just log the formatted value as an example
      console.log('Formatted Value:', formattedValue);
    }
  }







  public formatOnlDe004(): void {
    this.onl_de_004 = this.onl_de_004.toString().padStart(12, '0');
  }

  public getBts(): void {
    this.btsService.getBts().subscribe(
      (response: Bts[]) => {
        let token = "QK";
        let uid = 36;
        this.data = response;
        this.bts = response;
        this.btsSubsetArray = response.map(btsItem => {
          return {
            msg_seq: btsItem.msg_seq,
            wording: btsItem.wording,
            onl_de_057: btsItem.onl_de_057
          };
        });

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public extractPatternFromBtsSubsetArray() {
    let token = "QK";
    let uid = 36;
    for (let i = 0; i < this.btsSubsetArray.length; i++) {
      let inputString = this.btsSubsetArray[i].onl_de_057;

      let tokenIndex = inputString.indexOf(token);
      let uidIndex = tokenIndex + token.length;
      let patternPortion = inputString.substring(uidIndex + uid.toString().length + 1, inputString.indexOf("!", uidIndex));
      let segments = patternPortion.split("-");
      let finalPattern = segments.join("-");
      //console.log(finalPattern)
      return finalPattern;
    }
  }




  public generateRandomNumber(): string {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return randomNum.toString();
  }


  public onInsertButtonClick1(): void {
    if (!this.wording || !this.message_type || !this.selectedDescription) {
      // Check if the required inputs are empty
      console.log('Error: Some required fields are empty');
      alert('Error: Some required fields are empty');
      return;
    }
    if (this.onl_de_007) {
      const date = new Date(this.onl_de_007);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const hour = ('0' + date.getHours()).slice(-2);
      const minute = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);
      const formattedDateTime = `${month}${day}${hour}${minute}${seconds}`;
      this.onl_de_007 = formattedDateTime;
    }

    const selectedDate = new Date(this.onl_de_013);
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = month + day;

    // Appeler votre logique d'insertion en base de données ou votre API pour insérer la date formatée
    this.onl_de_013 = formattedDate;

    const selectedCode = this.processingCodes.find((code) => code.description === this.selectedDescription)?.code;
    const selectedCode1 = this.message_type.find((code) => code.description === this.selectedDescription1)?.code;
    //console.log('selectedCode1 is :'+selectedCode1);
    const insertedValue = this.onl_de_035.trim();

    if (insertedValue.length > 0 && insertedValue.length <= 19) {
      const valueWithConstant = insertedValue + 'D20012010000000216000';

      // Call your database insertion logic or API to insert the value
      this.insertIntoDatabase(valueWithConstant);
    }

    const nextMsgSeq = this.generateNextMsgSeq();

    // Validate the onl_de_004 value to ensure it contains only numbers if it is not empty
    if (this.onl_de_004 && this.onl_de_004.trim() !== '') {
      const onlDe004Number = Number(this.onl_de_004);
      if (isNaN(onlDe004Number)) {
        this.errorMessage = 'Error: Enter a number, please.';
        return;
      }
    }

    if (this.financial_constitution_id && this.logical_network) {
      this.onl_de_060 = this.financial_constitution_id + '+' + this.logical_network;
    } else if (this.financial_constitution_id) {
      this.onl_de_060 = this.financial_constitution_id;
    } else if (this.logical_network) {
      this.onl_de_060 = this.logical_network;
    } else {
      this.onl_de_060 = '';
    }

    if (!this.onl_de_038 || this.onl_de_038.trim() === '') {
      this.onl_de_038 = this.generateRandomNumber();
    }

    if (this.onl_de_041 && this.onl_de_041.trim() !== '') {
      this.onl_de_041 = this.completeWithSpaces(this.onl_de_041);
    }
    //console.log('onl_de_124:', this.onl_de_124);
    const data: Bts = {
      msg_seq: nextMsgSeq,
      sim_env: 'Base24',
      onl_de_004: this.onl_de_004 ? this.onl_de_004.toString().padStart(12, '0') : null,
      onl_de_003: selectedCode,
      onl_de_011: this.onl_de_011 ? this.onl_de_011.toString().padStart(6, '0') : null,
      onl_de_035: this.onl_de_035.trim() !== '' ? this.onl_de_035 + 'D20012010000000216000' : null,
      onl_de_037: this.onl_de_037.trim() !== '' ? this.onl_de_037 : null,
      onl_de_038: this.onl_de_038.trim() !== '' ? this.onl_de_038 : null,
      onl_de_041: this.onl_de_041.trim() !== '' ? this.onl_de_041 : null,
      onl_de_042: this.onl_de_042.trim() !== '' ? this.onl_de_042 : null,
      onl_de_060: this.onl_de_060.trim() !== '' ? this.onl_de_060 : null,
      onl_de_125: this.onl_de_125.trim() !== '' ? this.onl_de_125.padStart(10, '0') : null,
      onl_de_124: this.onl_de_124.trim() !== '' ? this.onl_de_124 : null,
      onl_de_012: this.onl_de_012.trim() !== '' ? this.onl_de_012.replace(/:/g, '') : null,
      onl_de_013: this.onl_de_013.trim() !== '' ? this.onl_de_013 : null,
      onl_de_007: this.onl_de_007.trim() !== '' ? this.onl_de_007 : null,
      message_type: selectedCode1,

      wording: this.wording.trim() !== '' ? this.wording : null,
      logical_network: this.logical_network.trim() !== '' ? this.logical_network : null,
      financial_constitution_id: this.financial_constitution_id.trim() !== '' ? this.financial_constitution_id : null,
      activity_flag: this.activity_flag.trim() !== '' ? this.activity_flag : null,
      send_count: this.send_count !== 0 ? this.send_count : null,
      delay_time: this.delay_time !== 0 ? this.delay_time : null,
      chunk_delay: this.chunk_delay !== 0 ? this.chunk_delay : null,
      response_flag: this.response_flag.trim() !== '' ? this.response_flag : null,
      reversal_flag: this.reversal_flag.trim() !== '' ? this.reversal_flag : null,
      onl_de_018: this.onl_de_018.trim() !== '' ? this.onl_de_018 : null,
      onl_de_024: this.onl_de_024.trim() !== '' ? this.onl_de_024 : null,
      onl_de_027: this.onl_de_027.trim() !== '' ? this.onl_de_027 : null,
      onl_de_032: this.onl_de_032.trim() !== '' ? this.onl_de_032 : null,
      onl_de_039: this.onl_de_039.trim() !== '' ? this.onl_de_039 : null,
      onl_de_043: this.onl_de_043.trim() !== '' ? this.onl_de_043 : null,
      onl_de_048: this.onl_de_048.trim() !== '' ? this.onl_de_048 : null,
      onl_de_049: this.onl_de_049.trim() !== '' ? this.onl_de_049 : null,
      onl_de_057: this.onl_de_057.trim() !== '' ? this.onl_de_057 : null,
      onl_de_061: this.onl_de_061.trim() !== '' ? this.onl_de_061 : null,
      onl_de_100: this.onl_de_100.trim() !== '' ? this.onl_de_100 : null,
      user_create: this.user_create.trim() !== '' ? this.user_create : null,
      user_modif: this.user_modif.trim() !== '' ? this.user_modif : null,
    };
    //console.log(data);
    this.btsService.addBts(data).subscribe(
      (response: Bts) => {
       // console.log('Data inserted successfully 124:', response.onl_de_124);
        alert('Data inserted successfully');
       // console.log('Data inserted successfully:', response);
        this.successMessage = 'l enregistremet a été ajouté avec succès';
        this.clearFields();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.bts.push(response);
      },
      (error: HttpErrorResponse) => {
        console.error('Error inserting data:', error);
        // Handle the error or show an error message
      }
    );
  }
  private async insertIntoDatabase(value: string): Promise<void> {
    try {
      // Make an HTTP POST request to the backend /bts/add endpoint
      await this.http.post('/bts/add', { onl_de_035: value }).toPromise();

      // Optionally, you can return a response or perform additional actions
      // For example, returning the inserted record or updating the UI
    } catch (error) {
      throw new Error('Failed to insert value into the database');
    }
  }

  public completeWithSpaces(onl_de_041: string): string {
    const maxLength = 16;

    if (onl_de_041.length >= maxLength) {
      return onl_de_041; // Si la longueur est déjà de 16 caractères ou plus, renvoyer la valeur inchangée.
    }

    const spacesToAdd = maxLength - onl_de_041.length;
    const spaces = ' '.repeat(spacesToAdd);
    const completedValue = onl_de_041 + spaces;

    return completedValue;
  }


  private generateNextMsgSeq(): string {
    if (this.bts && this.bts.length > 0) {
      // Get the maximum existing msg_seq value
      const maxMsgSeq = this.bts.map((bts) => parseInt(bts.msg_seq)).reduce((max, current) => Math.max(max, current), 0);

      // Increment the maximum msg_seq value by 1
      const nextMsgSeq = (maxMsgSeq + 1).toString();

      return nextMsgSeq;
    } else {
      // If no existing BTS, start with '1' as msg_seq
      return '1';
    }
  }
  onAddButtonClickSQL(msg_seq: string): void {
    this.btsService.getBtsByMsgSeq(msg_seq).subscribe(
      (response: Bts) => { // Change the parameter type to 'Bts'
        let blob;
        if (response) { // Check if a response is received
          const data: Bts = response;
          const insertSQL = `INSERT INTO pwr_cert_messages (msg_seq, sim_env, onl_de_004, onl_de_003, onl_de_011, onl_de_035,onl_de_037, onl_de_038, onl_de_041, onl_de_042, onl_de_060,onl_de_125, onl_de_012, onl_de_013, onl_de_007, message_type, wording,logical_network, financial_constitution_id, activity_flag, send_count,delay_time, chunk_delay, response_flag, reversal_flag, onl_de_018,onl_de_024, onl_de_027, onl_de_032, onl_de_039, onl_de_043,onl_de_048, onl_de_049, onl_de_057, onl_de_061, onl_de_100, user_create, user_modif)
                                           VALUES ('${data.msg_seq}', '${data.sim_env}', '${data.onl_de_004}', '${data.onl_de_003}',
                                                   '${data.onl_de_011}', '${data.onl_de_035}', '${data.onl_de_037}', '${data.onl_de_038}',
                                                   '${data.onl_de_041}', '${data.onl_de_042}', '${data.onl_de_060}', '${data.onl_de_125}',
                                                   '${data.onl_de_012}', '${data.onl_de_013}', '${data.onl_de_007}', '${data.message_type}',
                                                   '${data.wording}', '${data.logical_network}', '${data.financial_constitution_id}',
                                                   '${data.activity_flag}', ${data.send_count}, ${data.delay_time}, ${data.chunk_delay},
                                                   '${data.response_flag}', '${data.reversal_flag}', '${data.onl_de_018}', '${data.onl_de_024}',
                                                   '${data.onl_de_027}', '${data.onl_de_032}', '${data.onl_de_039}', '${data.onl_de_043}',
                                                   '${data.onl_de_048}', '${data.onl_de_049}', '${data.onl_de_057}', '${data.onl_de_061}',
                                                   '${data.onl_de_100}', '${data.user_create}', '${data.user_modif}');`;
          //console.log('SQL Insert Statement:');
          //console.log(insertSQL);
          blob = new Blob([insertSQL], {
            type: 'text/plain;charset=utf-8',
          });
          saveAs(blob, response.msg_seq + '.sql');
        } else {
          alert('No data found for the given msg_seq.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error retrieving data:', error);
        // Handle the error or show an error message
      }
    );
  }


  public onDeleteBts(msg_seq: string): void {
    const confirmation = confirm('Voulez-vous vraiment supprimer cet enregistrement?');

    if (confirmation) {
      const index = this.bts.findIndex((bts) => bts.msg_seq === msg_seq);
      if (index !== -1) {
        this.bts[index].deleting = true; // Set the deleting flag to true to display a loading state
        this.btsService.deleteBts(msg_seq).subscribe(
          () => {
            alert('data deleted successfully');
            this.bts.splice(index, 1); // Remove the deleted row from the array
            alert('L\'enregistrement a été supprimé avec succès'); // Display the success message
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting Bts:', error);
            alert(error.message);
          },
          () => {
            this.bts[index].deleting = false; // Reset the deleting flag after deletion is complete
          }
        );
      }
    }
  }

  private clearFields(): void {
    this.onl_de_004 = '';
    this.onl_de_003 = '';
    this.onl_de_007 = '';
    this.onl_de_012 = '';
    this.onl_de_013 = '';
    this.onl_de_011 = '';
    this.onl_de_035 = '';
    this.onl_de_037 = '';
    this.onl_de_038 = '';
    this.onl_de_041 = '';
    this.onl_de_042 = '';
    this.onl_de_060 = '';
    this.onl_de_125 = '';
    this.onl_de_124 = '';
    this.wording = '';
    this.financial_constitution_id = '';
    this.logical_network = '';
    this.activity_flag = this.defaultValues.activity_flag;
    this.send_count = this.defaultValues.send_count;
    this.delay_time =  this.defaultValues.delay_time;
    this.chunk_delay =  this.defaultValues.chunk_delay;
    this.response_flag =          this.defaultValues.response_flag;
    this.reversal_flag =       this.defaultValues.reversal_flag;
    this.autho_code =         this.defaultValues.autho_code;
    this.onl_de_018 = this.defaultValues.onl_de_018;
    this.onl_de_024 = this.defaultValues.onl_de_024;
    this.onl_de_027 = this.defaultValues.onl_de_027;
    this.onl_de_032 = this.defaultValues.onl_de_032;
    this.onl_de_039 = this.defaultValues.onl_de_039;
    this.onl_de_043 = this.defaultValues.onl_de_043;
    this.onl_de_048 = this.defaultValues.onl_de_048;
    this.onl_de_049 = this.defaultValues.onl_de_049;
    this.onl_de_057 = this.defaultValues.onl_de_057;
    this.onl_de_061 = this.defaultValues.onl_de_061;
    this.onl_de_100 = this.defaultValues.onl_de_100;
    this.user_create = this.defaultValues.user_create;
    this.user_modif = this.defaultValues.user_modif;
    this.formattedDate = '';
    this.selectedDescription = '';
    this.selectedDescription1 = '';

  }

  public isValidOnlDe004(): boolean {
    const onlDe004Number = Number(this.onl_de_004);
    return !isNaN(onlDe004Number);
  }
  public isValidOnlDe041(): boolean {
    const onlDe004Number = Number(this.onl_de_004);
    return !isNaN(onlDe004Number);
  }

  onClick() {
    this.btsService.getBts().subscribe(
      (response: Bts[]) => {
        //console.log(response.length);
        const insertSQL = `INSERT INTO pwr_cert_messages (msg_seq, sim_env, onl_de_004, onl_de_003, onl_de_011, onl_de_035,
                                                                                            onl_de_037, onl_de_038, onl_de_041, onl_de_042, onl_de_060,
                                                                                            onl_de_125, onl_de_012, onl_de_013, onl_de_007, message_type, wording,
                                                                                            logical_network, financial_constitution_id, activity_flag, send_count,
                                                                                            delay_time, chunk_delay, response_flag, reversal_flag, onl_de_018,
                                                                                            onl_de_024, onl_de_027, onl_de_032, onl_de_039, onl_de_043,
                                                                                            onl_de_048, onl_de_049, onl_de_057, onl_de_061, onl_de_100,
                                                                                            user_create, user_modif) VALUES `;
        let blob;
        if (response.length > 0) {
          const values = response
            .map((data: Bts) => {
              return `INSERT INTO pwr_cert_messages (msg_seq, sim_env, onl_de_004, onl_de_003, onl_de_011, onl_de_035,
                                                                                            onl_de_037, onl_de_038, onl_de_041, onl_de_042, onl_de_060,
                                                                                            onl_de_125, onl_de_012, onl_de_013, onl_de_007, message_type, wording,
                                                                                            logical_network, financial_constitution_id, activity_flag, send_count,
                                                                                            delay_time, chunk_delay, response_flag, reversal_flag, onl_de_018,
                                                                                            onl_de_024, onl_de_027, onl_de_032, onl_de_039, onl_de_043,
                                                                                            onl_de_048, onl_de_049, onl_de_057, onl_de_061, onl_de_100,
                                                                                            user_create, user_modif) VALUES `+`('${data.msg_seq}', '${data.sim_env}', '${data.onl_de_004}', '${data.onl_de_003}',
                                    '${data.onl_de_011}', '${data.onl_de_035}', '${data.onl_de_037}', '${data.onl_de_038}',
                                    '${data.onl_de_041}', '${data.onl_de_042}', '${data.onl_de_060}', '${data.onl_de_125}',
                                    '${data.onl_de_012}', '${data.onl_de_013}', '${data.onl_de_007}', '${data.message_type}',
                                    '${data.wording}', '${data.logical_network}', '${data.financial_constitution_id}',
                                    '${data.activity_flag}', ${data.send_count}, ${data.delay_time}, ${data.chunk_delay},
                                    '${data.response_flag}', '${data.reversal_flag}', '${data.onl_de_018}', '${data.onl_de_024}',
                                    '${data.onl_de_027}', '${data.onl_de_032}', '${data.onl_de_039}', '${data.onl_de_043}',
                                    '${data.onl_de_048}', '${data.onl_de_049}', '${data.onl_de_057}', '${data.onl_de_061}',
                                    '${data.onl_de_100}', '${data.user_create}', '${data.user_modif}')`;
            })
            .join('; ');

          const insertSQLWithValues =  values;
          //console.log('SQL Insert Statement:');
          //console.log(insertSQLWithValues);
          blob = new Blob([insertSQLWithValues], {
            type: 'text/plain;charset=utf-8',
          });
          saveAs(blob, 'result.sql');
        } else {
          alert('No data found for the given msg_seq.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error retrieving data:', error);
        // Handle the error or show an error message
      }
    );
  }
  onAddButtonClick(bts: Bts): void {
    this.selectedBts = { ...bts };
    // Populate the form fields with the selectedBts values
    this.wording = this.selectedBts.wording;
    this.selectedDescription1 = this.selectedBts.message_type;
    this.selectedDescription = this.selectedBts.onl_de_003;
    this.onl_de_004 = this.selectedBts.onl_de_004;
    this.onl_de_007 = this.selectedBts.onl_de_007;
    this.onl_de_011 = this.selectedBts.onl_de_011;
    this.onl_de_012 = this.selectedBts.onl_de_012;
    this.onl_de_013 = this.selectedBts.onl_de_013;
    this.onl_de_035 = this.selectedBts.onl_de_035;
    this.onl_de_037 = this.selectedBts.onl_de_037;
    this.onl_de_038 = this.selectedBts.onl_de_038;
    this.onl_de_041 = this.selectedBts.onl_de_041;
    this.onl_de_042 = this.selectedBts.onl_de_042;
    this.financial_constitution_id = this.selectedBts.financial_constitution_id;
    this.logical_network = this.selectedBts.logical_network;
    this.onl_de_125 = this.selectedBts.onl_de_125;
    this.onl_de_124 = this.selectedBts.onl_de_124;
    this.activity_flag = this.selectedBts.activity_flag;
    this.send_count = this.selectedBts.send_count;
    this.delay_time = this.selectedBts.delay_time;
    this.chunk_delay = this.selectedBts.chunk_delay;
    this.response_flag = this.selectedBts.response_flag;
    this.reversal_flag = this.selectedBts.reversal_flag;
    this.onl_de_018 = this.selectedBts.onl_de_018;
    this.onl_de_024 = this.selectedBts.onl_de_024;
    this.onl_de_027 = this.selectedBts.onl_de_027;
    this.onl_de_032 = this.selectedBts.onl_de_032;
    this.onl_de_039 = this.selectedBts.onl_de_039;
    this.onl_de_043 = this.selectedBts.onl_de_043;
    this.onl_de_048 = this.selectedBts.onl_de_048;
    this.onl_de_049 = this.selectedBts.onl_de_049;
    this.onl_de_057 = this.selectedBts.onl_de_057;
    this.onl_de_061 = this.selectedBts.onl_de_061;
    this.onl_de_100 = this.selectedBts.onl_de_100;
    this.user_create = this.selectedBts.user_create;
    this.user_modif = this.selectedBts.user_modif;
  }

  onInsertButtonClick(): void {
    if (this.selectedBts) {
      // Update the selectedBts object with the form field values
      this.selectedBts.wording = this.wording;
      this.selectedBts.message_type = this.selectedDescription1;
      this.selectedBts.onl_de_003 = this.selectedDescription;
      this.selectedBts.onl_de_004 = this.onl_de_004;
      this.selectedBts.onl_de_007 = this.onl_de_007;
      this.selectedBts.onl_de_011 = this.onl_de_011;
      this.selectedBts.onl_de_012 = this.onl_de_012;
      this.selectedBts.onl_de_013 = this.onl_de_013;
      this.selectedBts.onl_de_035 = this.onl_de_035;
      this.selectedBts.onl_de_037 = this.onl_de_037;
      this.selectedBts.onl_de_038 = this.onl_de_038;
      this.selectedBts.onl_de_041 = this.onl_de_041;
      this.selectedBts.onl_de_042 = this.onl_de_042;
      this.selectedBts.financial_constitution_id = this.financial_constitution_id;
      this.selectedBts.logical_network = this.logical_network;
      this.selectedBts.onl_de_125 = this.onl_de_125;
      this.selectedBts.onl_de_124 = this.onl_de_124;
      this.selectedBts.activity_flag = this.activity_flag;
      this.selectedBts.send_count = this.send_count;
      this.selectedBts.delay_time = this.delay_time;
      this.selectedBts.chunk_delay = this.chunk_delay;
      this.selectedBts.response_flag = this.response_flag;
      this.selectedBts.reversal_flag = this.reversal_flag;
      this.selectedBts.onl_de_018 = this.onl_de_018;
      this.selectedBts.onl_de_024 = this.onl_de_024;
      this.selectedBts.onl_de_027 = this.onl_de_027;
      this.selectedBts.onl_de_032 = this.onl_de_032;
      this.selectedBts.onl_de_039 = this.onl_de_039;
      this.selectedBts.onl_de_043 = this.onl_de_043;
      this.selectedBts.onl_de_048 = this.onl_de_048;
      this.selectedBts.onl_de_049 = this.onl_de_049;
      this.selectedBts.onl_de_057 = this.onl_de_057;
      this.selectedBts.onl_de_061 = this.onl_de_061;
      this.selectedBts.onl_de_100 = this.onl_de_100;
      this.selectedBts.user_create = this.user_create;
      this.selectedBts.user_modif = this.user_modif;

      // Call the updateBts method to update the selectedBts object on the server
      this.btsService.updateBts(this.selectedBts).subscribe(
        (updatedBts: Bts) => {
          // Success: Update the corresponding Bts object in the bts array
          const index = this.bts.findIndex(entry => entry.msg_seq === updatedBts.msg_seq);
          if (index !== -1) {
            this.bts[index] = updatedBts;
          }
          // Reset the form fields
          this.wording = '';
          this.selectedDescription1 = '';
          this.selectedDescription = '';
          this.onl_de_004 = '';
          this.onl_de_007 = '';
          this.onl_de_011 = '';
          this.onl_de_012 = '';
          this.onl_de_013 = '';
          this.onl_de_035 = '';
          this.onl_de_037 = '';
          this.onl_de_038 = '';
          this.onl_de_041 = '';
          this.onl_de_042 = '';
          this.financial_constitution_id = '';
          this.logical_network = '';
          this.onl_de_125 = '';
          this.onl_de_124 = '';
          this.activity_flag = '';
          this.activity_flag = '';
          this.send_count = null;
          this.delay_time = null;
          this.chunk_delay = null;
          this.response_flag = '';
          this.reversal_flag = '';
          this.onl_de_018 = '';
          this.onl_de_024 = '';
          this.onl_de_027 = '';
          this.onl_de_032 = '';
          this.onl_de_039 = '';
          this.onl_de_043 = '';
          this.onl_de_048 = '';
          this.onl_de_049 = '';
          this.onl_de_057 = '';
          this.onl_de_061 = '';
          this.onl_de_100 = '';
          this.user_create = '';
          this.user_modif = '';

          // Clear the selectedBts property
          this.selectedBts = null;
        },
        (error: any) => {
          // Handle the error
          console.error(error);
        }
      );
    }
  }

  dataBound() {
    if (this.refresh) {

      this.grid.groupColumn('onl_de_043');
      this.refresh = false;
    }
  }

  load() {
    this.refresh = (this.grid as any).refreshing;
  }




  selectedFiles: File[] = [];

  onFileChange(event: any) {
    // Get the selected files from the input element
    this.selectedFiles = Array.from(event.target.files);
  }

  parseFiles() {
    this.selectedFiles.forEach((file) => {
      if (file) {
        const fileReader = new FileReader();

        fileReader.onload = (e: any) => {
          const fileContent = e.target.result;
          this.parseContent(fileContent);
        };

        fileReader.readAsText(file);
      } else {
        alert('No file selected.');
      }
    });
  }

  parseContent(fileContent) {
    const lines = fileContent.split('\n');

    const mtiPattern = /- M.T.I\s+:\s+\[(\d{4})\]/;
    const keyValuePattern = /- FLD \((\d+)\)\s+\((\d+)\)\s+\[(.+)\]/;
    const fld057StartPattern = /- FLD \(057\)\s+\(\d+\)\s+\[/;
    const fld057EndPattern = /\]/;
    const flstest=/\b\d{4} \d{9} \d{8} \d{8}\|4\|\s+(.*)$/;
    const regextest = /\[(.*?)\]/;
    const fld003Pattern = /FLD \(003\).*?\[(\d+)\]/;

    let extractedData = [];
    let currentMTI = null;
    let currentFLD = null;
    let currentFLD057 = '';
    let uniqueResult1 = '';
    let insideFLD057 = false;
    let accumulatedFLD057 = '';
    var mtiFLD057Values = new Array();
    var onl003=new Array();
    let indexJson=0;
    let index057=0;

    lines.forEach((line, index, array) => {
      const mtiMatch = line.match(mtiPattern);
      const keyValueMatch = line.match(keyValuePattern);
      const fld057StartMatch = line.match(fld057StartPattern);
      const fld057EndMatch = line.match(fld057EndPattern);
      const fldtestMatch =line.match(flstest);
      const fldtestMatch003 =line.match(fld003Pattern);

      if (mtiMatch) {
        currentMTI = mtiMatch[1];
        currentFLD = null; // Reset currentFLD for new MTI block
        currentFLD057 = ''; // Reset currentFLD057 for new MTI block

        insideFLD057 = false;
        uniqueResult1 = '';
      } else
      if ((currentMTI === '0120' || currentMTI === '0220' || currentMTI === '0420' || currentMTI === '0520')) {
        if (fldtestMatch003){
          const fld003Value = fldtestMatch003[1]; // Extracted value from the pattern

          onl003.push(fld003Value);
        }
        if (fldtestMatch) {
          const field = fldtestMatch[1].trim();

          //console.log("filed  " + field);
          if (field.includes('057')) {
            //console.log('Found field 57');
            insideFLD057 = true; // Mark that we are inside fld057
            // Initialize currentFLD057 with the current line content
            currentFLD057 = line;
            // Check if the current line does not contain ']' and there are more lines
            while (!line.includes(']') && index + 1 < array.length) {
              // Move to the next line and concatenate it to currentFLD057
              index++;

              line = array[index];
              currentFLD057 += line;
            }
            // At this point, currentFLD057 contains the concatenated lines
            //console.log('Concatenated fld057:', currentFLD057);
            const filteredContentMatches = currentFLD057.match(regextest);
            if (filteredContentMatches) {
              const filteredContent = filteredContentMatches[1];
              //console.log('Filtered FLD 057 Content:', filteredContent);

              const pattern = /(\s*)\.\d{4} \d{9} \d{8} \d{8}\|4\|(\s)/g;
              uniqueResult1 = filteredContent.replace(pattern, '');
              mtiFLD057Values[currentMTI] = uniqueResult1; // Store FLD 057 value for current MTI

              currentFLD[`onl_de_057`] = uniqueResult1;
              //console.log('uniqueResult1 for MTI', currentMTI + ': ' + uniqueResult1);
              if (!mtiFLD057Values[currentMTI]) {
                mtiFLD057Values[currentMTI] = []; // Initialize array if it doesn't exist
              }
              mtiFLD057Values.push(uniqueResult1);
            }
          }
        }

        if (insideFLD057) {
          accumulatedFLD057 += line.trim(); // Accumulate lines without closing bracket
          if (fld057EndMatch) {
            insideFLD057 = false;
            //console.log('Accumulated FLD 057:', accumulatedFLD057);
            accumulatedFLD057 = ''; // Reset accumulatedFLD057 after processing
          }
        }
        if (keyValueMatch) {
          const field = keyValueMatch[1].trim();
         // console.log(field);
          const value = keyValueMatch[3].trim();
          if (parseInt(field) >= 3 && parseInt(field) <= 125) {
            if (!currentFLD) {
              currentFLD = {};
              extractedData.push(currentFLD);
              currentFLD['message_type'] = currentMTI; // Set message type
            }
            //console.log(field+" :  "+value)
            currentFLD[`onl_de_${field}`] = value;
            if (fldtestMatch && parseInt(field) == 57) {
              //console.log(field + " :  " + value)
            }
          }
        }
      }
      else if (currentFLD057 !== '' && line.trim() !== ']' && line.trim() !== '.') {
        currentFLD057 += line.trim(); // Concatenate multiline FLD 057 content
        //console.log(currentFLD057)

      }


    });

    extractedData.forEach((data,index) => {
      data['onl_de_057'] = mtiFLD057Values[index] || '';
      //console.log("mtiFLD057Values with index  "+mtiFLD057Values[index])
     // data['onl_de_003'] = onl003[index] || '';
      data['onl_de_003'] = data.onl_de_003.toString();
      // Add default values for missing keys
      const defaultValues: {

        wording:string;
        sim_env: string;
        response_flag: string;
        message_type: string;
        onl_de_017: null;
        onl_de_039: string;
        onl_de_018: string;
        onl_de_048: string;
        onl_de_125: string;
        chunk_delay: number;
        onl_de_027: string;
        onl_de_049: string;
        onl_de_024: string;
        onl_de_057: string;
        send_count: number;
        activity_flag: string;
        onl_de_100: string;
        onl_de_021: string;
        onl_de_032: string;
        onl_de_043: string;
        user_create: string;
        onl_de_061: string;
        onl_de_090: string;
        user_modif: string;
        reversal_flag: string;
        autho_code: string;
        delay_time: number
      } = {
        wording:'message'+Math.floor(Math.random() * 1000),
        sim_env:'Base24',
        activity_flag: 'N',
        send_count: 1,
        delay_time: 0,
        chunk_delay: 0,
        response_flag: '0',
        reversal_flag: '0',
        autho_code: '',
        message_type:'0120',
        onl_de_017: null,
        onl_de_018: '5411',
        onl_de_021: '',
        onl_de_024: '000',
        onl_de_027: '6',
        onl_de_032: '2',
        onl_de_039: '00',
        onl_de_043: 'FNBSA           Lesotho      LS',
        onl_de_048: '800000000000070    00010001',
        onl_de_049: '426',
        onl_de_057: '7FF90000800080248800752C964AC108ABD10000210000000000000000003C00017E89496723031000B95C173B000706010A03A0600200200020002000200020002000200020002000200020002000',
        onl_de_061: 'FNB INT100000000000',
        onl_de_090: '',
        onl_de_100: '55555555556',
        user_create: 'FNBROA_DV',
        user_modif: 'FNBROA_DV',
        onl_de_125: '',
      };

      for (const key in defaultValues) {
        if (!data.hasOwnProperty(key)) {
          data[key] = defaultValues[key];
        }
      }
    });
    const jsonData = JSON.stringify(extractedData, null, 2);
    const dataArray = JSON.parse(jsonData); // Parse jsonData into an array



    function escapeValue(value: string): string {
      return value.replace(/'/g, "''");
    }

// Generate and log the SQL INSERT statements
    dataArray.forEach((data) => {
      const columns = Object.keys(data).join(', ');
      const values = Object.values(data).map((value) => `'${escapeValue(value.toString())}'`).join(', ');

      const insertQuery = `INSERT INTO pwr_cert_messages (${columns}) VALUES (${values});`;

      //console.log(insertQuery);
    });
    const btsService = {
    addBts: (bts) => {
        // Assuming this.http.post returns an Observable
       return this.http.post(`${this.apiServerUrl}/bts/add`, bts);
      },
     };
    // Convert the extracted data to JSON
    // Log the JSON output

    //console.log(jsonData);
    dataArray.forEach((data) => {
      //console.log(data); // Print each object
      //console.log(data.onl_de_003)

      // Calling addBts method to add data to the database
       btsService.addBts(data).subscribe(
        response => {
          //console.log('onlde003'+data.onl_de_003)

        },
        error => {
          console.error('Error adding data to the database:', error);
        }
      );
    });
    return jsonData;
  }



  parseFilesConfig() {
    this.selectedFiles.forEach((file) => {
      if (file) {
        const fileReader = new FileReader();

        fileReader.onload = (e: any) => {
          const fileContent = e.target.result;
          try {
            this.parseContentConfig(fileContent);
          } catch (error) {
            console.error("Error parsing file content:", error);
          }
        };

        fileReader.onerror = (e: any) => {
          console.error("File reading error:", e.target.error);
        };

        fileReader.readAsText(file);
      } else {
        console.log('No file selected.');
      }
    });
  }

  parseContentConfig(fileContent: string) {
    const lines = fileContent.split('\n');
    const pattern3 = /token:(\w+)\s*uid:(\d+)/;
    const tokenToConfigMap: Record<string, Config[]> = {};

    let combinedLines = [];
    lines.forEach(line => {
      if (line.trim() !== '') {
        combinedLines.push(line);
      } else if (combinedLines.length > 0) {
        const combinedText = combinedLines.join(' ');
        const match3 = combinedText.match(pattern3);
        if (match3) {
          const tokenValue = match3[1].substr(0, 7);
          const uidValue = match3[2].padStart(5, '0');
          const uid = parseInt(uidValue);
          const concat = tokenValue.concat(uidValue);

          if (!tokenToConfigMap[tokenValue]) {
            tokenToConfigMap[tokenValue] = [];
          }

          for (let i = 0; i < this.btsSubsetArray.length; i++) {
            const inputText = this.btsSubsetArray[i].onl_de_057;

            const dynamicPattern = new RegExp(`${concat}(.{${uid - 1}})`);
            const substring = extractSubstring(inputText, dynamicPattern, uid + 8);
            const substring1 = substring.substring(8);

            const config: Config = {
              token: tokenValue,
              uid: uidValue,
              wording: this.btsSubsetArray[i].wording,
              substring: substring1
            };

            tokenToConfigMap[tokenValue].push(config);
          }
        }

        combinedLines = [];
      }
    });

    // Logging the result for each token
    for (const tokenValue in tokenToConfigMap) {
      console.log(`Table for token: ${tokenValue}`);
      console.table(tokenToConfigMap[tokenValue]);
    }
  }


}

