import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessCardService } from '../business-card.service';
import * as Papa from 'papaparse'; 
import { ParseResult } from 'papaparse'; 
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-business-card',
  templateUrl: './add-business-card.component.html',
})
export class AddBusinessCardComponent implements OnInit {
  cardForm: FormGroup;
  previewData: any = {};

  constructor(private fb: FormBuilder, private businessCardService: BusinessCardService) {
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      photoBase64: [''],
      file: [null]
    });
  }

  ngOnInit() { this.cardForm.valueChanges.subscribe((value) => {
    this.previewData = { ...value, photoBase64: this.previewData.photoBase64 }; 
  });}

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      if (type === 'file') {
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
            this.parseCsv(content,file); 
          } else if (file.type === 'application/xml' || file.type === 'text/xml') {
            this.parseXml(content); 
          } else {
            console.log('Unsupported file type:', file.type);
          }
        };
        reader.readAsText(file); 
      } else if (type === 'photoBase64') {
        reader.onload = (e) => {
          const photoBase64 = e.target?.result as string;
          this.previewData.photoBase64 = photoBase64; 
          this.cardForm.patchValue({ photoBase64 }); 

        };
        reader.readAsDataURL(file); 
        
      }
    }
  }
  
  
  parseCsv(content: string, file: File) {
    Papa.parse(content, {
      header: true,
      complete: (result: ParseResult<any>) => {
        if (result.data.length > 0) {
          console.log('Parsed CSV Data:', result.data);
  
          const validRows = result.data.filter(row => row.Name && row.Email);
  
          if (validRows.length > 0) {
            const firstRow = validRows[0];
  
            
            this.previewData = {
              name: firstRow.Name || '',
              gender: firstRow.Gender || '',
              dateOfBirth: firstRow.DateOfBirth || '',
              email: firstRow.Email || '',
              phone: firstRow.Phone || '',
              address: firstRow.Address || '', 
              photoBase64: firstRow.PhotoBase64 || '' 
            };
  
            this.cardForm.patchValue(this.previewData);
            console.log('Updated Preview Data:', this.previewData);
          } else {
            console.log('No valid rows found in CSV');
          }
        } else {
          console.log('No data found in CSV');
        }
      },
      error: (error: { message: string }) => {
        console.error('Error parsing CSV:', error.message);
      }
    });
  }
  
  
  parseXml(content: string) {
    console.log('Parsing XML content:', content);
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, "text/xml");
    
    const businessCards = xmlDoc.getElementsByTagName("BusinessCard");
    
    if (businessCards.length > 0) {
      
      const firstCard = businessCards[0];
  
      this.previewData = {
        name: firstCard.getElementsByTagName("Name")[0]?.textContent || '',
        gender: firstCard.getElementsByTagName("Gender")[0]?.textContent || '',
        dateOfBirth: firstCard.getElementsByTagName("DateOfBirth")[0]?.textContent || '',
        email: firstCard.getElementsByTagName("Email")[0]?.textContent || '',
        phone: firstCard.getElementsByTagName("Phone")[0]?.textContent || '',
        photoBase64: firstCard.getElementsByTagName("PhotoBase64")[0]?.textContent || '',
        address: firstCard.getElementsByTagName("Address")[0]?.textContent || ''
      };
  
      this.cardForm.patchValue(this.previewData); 
      console.log('Updated Preview Data:', this.previewData);
    } else {
      console.log('No BusinessCards found in XML');
    }
  }
  
  
  clearData() {
    
    this.cardForm.reset(); 
    this.previewData = { photoBase64: null }; 
  }
  

  submit() {
    console.log('Submitting form...');
    
    const hasValidData = this.previewData.name && this.previewData.email;
    
    if (this.cardForm.valid || hasValidData) {
      const formData: any = { ...this.cardForm.value, ...this.previewData };
      console.log('Form Data:', formData);
      
      this.businessCardService.createBusinessCard(formData).subscribe(
        (response: any) => {
          console.log('Card added successfully:', response);
          this.cardForm.reset();
          this.previewData = { photoBase64: null }; 
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding card:', error);
        }
      );
    } else {
      console.log('Form is invalid:', this.cardForm.errors);
    }
  }
  
  
  
}
