import { Component, OnInit } from '@angular/core';
import { MapsService } from "./maps.service";
declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  inputText: string; // Property to store the input value

  constructor(private mapsService: MapsService) { }
  defaultValues: DefaultValues[] = [];


  private selectedFile: File;
  mtiCount: number = 0;
  onFileChange(event: any) {
    // Get the selected file from the input element
    this.selectedFile = event.target.files[0];
  }

  parseFile() {
    if (this.selectedFile) {
      // Create a new FileReader to read the file content
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        const fileContent = e.target.result; // The file content will be stored here
        // Now, you can parse the file content as needed
        this.parseContent(fileContent);
      };

      fileReader.readAsText(this.selectedFile); // Read the file as text
    } else {
      console.log('No file selected.');
    }
  }
  public fetchDefaultValues() {
    this.mapsService.getDefaultValuesUpload().subscribe(
      (data: DefaultValues[]) => {
        // Update the local variable with the fetched default values
        this.defaultValues = data;
        console.log(this.defaultValues)
      },
      (error) => {
        console.error('Error fetching default values:', error);
      }
    );
  }
  parseContent(fileContent) {
    const lines = fileContent.split('\n');

    const mtiPattern = /- M.T.I\s+:\s+\[(\d{4})\]/;
    const keyValuePattern = /- FLD \((\d+)\)\s+\((\d+)\)\s+\[(.+)\]/;

    let extractedData = [];
    let currentMTI = null;
    let currentFLD = null;

    lines.forEach((line) => {
      const mtiMatch = line.match(mtiPattern);
      const keyValueMatch = line.match(keyValuePattern);

      if (mtiMatch) {
        currentMTI = mtiMatch[1];
        if (currentMTI === '0120') {
          currentFLD = null; // Reset currentFLD for new MTI 0120 block
        }
      } else if (currentMTI === '0120' && keyValueMatch) {
        const field = keyValueMatch[1].trim();
        const value = keyValueMatch[3].trim();
        if (parseInt(field) >= 3 && parseInt(field) <= 125) {
          if (!currentFLD) {
            currentFLD = {};
            extractedData.push(currentFLD);
          }
          currentFLD[`onl_de_${field}`] = value;
        }
      }
    });

    extractedData.forEach((data) => {
      data['onl_de_002'] = '0120';


      // Add default values for missing keys
      const defaultValues: {
        sim_env: string;
        response_flag: string;
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
        sim_env:'Base24',
        activity_flag: 'N',
        send_count: 1,
        delay_time: 0,
        chunk_delay: 0,
        response_flag: '0',
        reversal_flag: '0',
        autho_code: '',
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

      console.log(insertQuery);
    });
    // Convert the extracted data to JSON

    // Log the JSON output
    console.log(jsonData);

    return jsonData;
  }

  ngOnInit() {
    this.fetchDefaultValues();
  }

  onInputChange(event: Event) {
    const message = (event.target as HTMLInputElement).value;
    const fieldRegex = /(\w+)\s+:\s+(.*)/; // Regular expression to match each field and its value

    const fields: { [key: string]: string } = {};

    const lines = message.split('\n');
    for (const line of lines) {
      const match = line.match(fieldRegex);
      if (match && match.length === 3) {
        const fieldName = match[1].trim();
        const fieldValue = match[2].trim();
        fields[fieldName] = fieldValue;
        console.log(fieldName + '=' + fieldValue);
      }
    }
    this.inputText = '';
    for (const fieldName in fields) {
      if (fields.hasOwnProperty(fieldName)) {
        this.inputText += `${fieldName}: ${fields[fieldName]}\n`;
      }
    }
  }
}
