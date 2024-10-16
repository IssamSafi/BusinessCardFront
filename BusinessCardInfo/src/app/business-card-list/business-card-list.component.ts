import { Component, OnInit } from '@angular/core';
import { BusinessCardService } from '../business-card.service';

@Component({
  selector: 'app-business-card-list',
  templateUrl: './business-card-list.component.html',
})
export class BusinessCardListComponent implements OnInit {
  businessCards: any[] = [];
  filter: string = '';

  constructor(private businessCardService: BusinessCardService) {}

  ngOnInit() {
    this.loadBusinessCards();
  }

  loadBusinessCards() {
    this.businessCardService.getBusinessCards().subscribe(data => {
      this.businessCards = data;
    });
  }

  filteredCards() {
    return this.businessCards.filter(card => {
      const lowerCaseFilter = this.filter.toLowerCase();
      return card.name.toLowerCase().includes(lowerCaseFilter) ||
             card.gender.toLowerCase().includes(lowerCaseFilter) ||
             card.dateOfBirth.includes(lowerCaseFilter) ||
             card.email.toLowerCase().includes(lowerCaseFilter) ||
             card.phone.includes(lowerCaseFilter) ||
             card.address.toLowerCase().includes(lowerCaseFilter);
    });
  }

  deleteCard(id: string) {
    this.businessCardService.deleteCard(id).subscribe(
      response => {
        console.log('Card deleted successfully:', response);
        this.loadBusinessCards(); 
      },
      error => {
        if (error.status === 200) {
          console.log('Ignored known error for successful delete.');
        } else {
          console.error('Error deleting card:', error);
        }
      }
    );
  }

  exportCard(id: string, format: 'xml' | 'csv') {
    const exportMethod = format === 'xml' 
      ? this.businessCardService.exportCardAsXml(id) 
      : this.businessCardService.exportCardAsCsv(id);
  
    exportMethod.subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `business_card_${id}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error exporting card:', error);
    });
  }

  confirmDelete(cardId: string) {
    const confirmation = confirm("Are you sure you want to delete this card?");
    if (confirmation) {
      this.deleteCard(cardId);
    }
  }
}