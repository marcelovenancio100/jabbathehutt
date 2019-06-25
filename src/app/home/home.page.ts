import { Component, OnInit } from '@angular/core';

import { ContactService } from '../contact/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  contacts: any;
  contactName: string;
  contactPhone: string;
  contactEmail: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getAll().subscribe(data => {
      this.contacts = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Phone: e.payload.doc.data()['Phone'],
          Email: e.payload.doc.data()['Email'],
        };
      })

      console.log(this.contacts);
    });
  }

  addContact() {
    let contact = {};
    contact['Name'] = this.contactName;
    contact['Phone'] = this.contactPhone;
    contact['Email'] = this.contactEmail;

    this.contactService.save(contact).then(resp => {
      this.contactName = "";
      this.contactPhone = "";
      this.contactEmail = "";
      console.log(resp);
    }).catch(error => {
      console.log(error);
    });
  }

  editContact(contact) {
    contact.isEdit = true;
    contact.EditName = contact.Name;
    contact.EditPhone = contact.Phone;
    contact.EditEmail = contact.Email;
  }

  UpdateContact(row) {
    let contact = {};
    contact['Name'] = row.EditName;
    contact['Phone'] = row.EditPhone;
    contact['Email'] = row.EditEmail;
    this.contactService.update(row.id, contact);
    row.isEdit = false;
  }

  removeContact(rowID) {
    this.contactService.delete(rowID);
  }
}
